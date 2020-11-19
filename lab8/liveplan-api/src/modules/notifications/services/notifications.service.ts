import {forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Notification} from '../models/notification.model';
import * as mongoose from 'mongoose';
import {Model} from 'mongoose';
import {Connections, MongoId} from '../../../shared/constants/constant';
import {
    NotificationCreateDto,
    NotificationDto,
    NotificationFilterDto,
    NotificationUpdateDto,
    SubTaskDeleteDto,
    SubTaskUpdateDto,
} from '../dtos';
import {UsersService} from '../../users/services/users.service';
import {UserDto} from '../../users/dtos';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {paginate} from '../../../shared/paginator/paginator';
import {GroupsService} from '../../groups/services/groups.service';
import {GroupDto} from '../../groups/dtos';
import {BaseNotification} from '../models/base-notification.model';
import {NotificationDefinition} from '../schemas/notification.schema';
import {notificationProjections} from '../constants/constants';

@Injectable()
export class NotificationsService {
    private readonly notificationModel: Model<Notification>;

    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        @InjectModel('BaseNotification')
        private readonly baseNotificationModel: Model<BaseNotification>,
        private readonly groupsService: GroupsService,

    ) {
        try {
            this.notificationModel = this.baseNotificationModel.discriminator('Notification',
                new mongoose.Schema(NotificationDefinition));
        } catch (err) {
            this.notificationModel = this.baseNotificationModel.discriminators['Notification'];
        }
    }

    public async existsById(notificationId: MongoId): Promise<boolean> {
        return this.notificationModel.exists({_id: notificationId});
    }

    public async createNotification(userId: MongoId,
        notificationCreateDto: NotificationCreateDto): Promise<NotificationDto> {
        const user: UserDto = await this.usersService.findUserById(userId);
        if (!user) {
            throw new NotFoundException('User wasn\'t found');
        }

        const group: GroupDto = await this.groupsService.findGroupById(notificationCreateDto.group);
        if (!group) {
            throw new NotFoundException('Group wasn\'t found');
        }

        const notification: Notification = new this.notificationModel(notificationCreateDto as Notification);
        notification.user = userId;
        await notification.save();

        return notification as NotificationDto;
    }

    public async deleteNotification(notificationId: MongoId): Promise<NotificationDto> {
        const deletedNotification: Notification =
            await this.notificationModel.findByIdAndDelete(notificationId).select(notificationProjections).exec();
        if (!deletedNotification) {
            throw new NotFoundException('Notification wasn\'t found');
        }
        return deletedNotification as NotificationDto;
    }

    public async findNotificationById(notificationId: MongoId): Promise<any> {
        const notification: Notification = await this.notificationModel.findById(notificationId)
            .select(notificationProjections).exec();
        if (!notification) {
            throw new NotFoundException('Notification wasn\'t found');
        }
        return notification as NotificationDto;
    }

    public async findNotificationsByUserId(userId: MongoId): Promise<NotificationDto[]> {
        const notifications: Notification[] = await this.notificationModel
            .find({user: userId})
            .select(notificationProjections)
            .sort({'date': 1})
            .exec();
        if (!notifications) {
            throw new NotFoundException('Notifications weren\'t found');
        }
        return notifications as NotificationDto[];
    }

    public async update(userId: MongoId, notificationToUpdate: NotificationUpdateDto): Promise<NotificationDto> {
        if (notificationToUpdate.group) {
            const group: GroupDto = await this.groupsService.findGroupById(notificationToUpdate.group);
            if (!group) {
                throw new NotFoundException('Group wasn\'t found');
            }
        }
        const notification: Notification = await this.notificationModel.findOne(
            {
                _id: notificationToUpdate.notificationId,
                user: userId,
            },
        ).exec();

        if (!notification) {
            throw new NotFoundException('Notification wasn\'t found');
        }
        notificationToUpdate.subTasks.forEach((subTask: SubTaskUpdateDto) => {
            if (subTask._id) {
                const subTaskToUpdate: SubTaskUpdateDto = notification.subTasks.find(
                    (element) => element._id == subTask._id);
                if (subTask.status) {
                    subTaskToUpdate.status = subTask.status;
                }
                if (subTask.task) {
                    subTaskToUpdate.task = subTask.task;
                }
            } else {
                notification.subTasks.push(subTask);
            }
        });

        notification.markModified('subTasks');
        await notification.save();

        const updatedNotification: Notification =
            await this.notificationModel.findById(notificationToUpdate.notificationId)
                .select(notificationProjections).exec();
        return updatedNotification as NotificationDto;
    }

    public async findNotificationsWithFilters(userId: MongoId, options: PaginationInterface, projections?: string,
        filterDto?: NotificationFilterDto):
        Promise<IPaginationResponse<NotificationDto[]>> {
        const query = this.notificationModel.find()
            .where('user').equals(userId);
        if (projections) {
            query.select(projections);
        }
        if (filterDto) {
            if (filterDto.id) {
                query.where('_id').equals(filterDto.id);
            }
            if (filterDto.name) {
                query.where('name').equals(filterDto.name);
            }
            if (filterDto.fromDate) {
                query.where('date').gte(filterDto.fromDate);
            }
            if (filterDto.toDate) {
                query.where('date').lte(filterDto.toDate);
            }
            if (filterDto.group) {
                query.where('group').equals(filterDto.group);
            }
            if (filterDto.remind != null) {
                query.where('remind').equals(filterDto.remind.toLowerCase() == 'true');
            }
            if (filterDto.isFavorite != null) {
                query.where('isFavorite').equals(filterDto.isFavorite.toLowerCase() == 'true');
            }
            if (filterDto.status != null) {
                query.where('status').equals(filterDto.status.toLowerCase() == 'true');
            }
        }
        query.sort({'date': 1});
        return await paginate(query, options);
    }

    public async deleteSubTaskById(userId: MongoId, dto: SubTaskDeleteDto): Promise<NotificationDto> {
        const session = await Connections[1].startSession();
        await session.startTransaction();

        const notificationToUpdate: Notification = await this.notificationModel.update(
            {
                _id: dto.notificationId,
                user: userId,
            },
            {
                $pull: {
                    subTasks: {
                        _id: {
                            $in: dto.subTaskIds,
                        },
                    },
                },
            },
            {
                session,
            },
        ).select(notificationProjections)
            .exec((err, res) => {
                if (err) {
                    throw new InternalServerErrorException(err);
                }
            });

        dto.subTaskIds.forEach((id) => {
            const subTask = notificationToUpdate.subTasks.find((subTask) => subTask._id == id);
            if (!subTask) {
                session.abortTransaction();
                throw new NotFoundException('Sub task wasn\'t found');
            }
        });
        await session.commitTransaction();
        await session.endSession();
        return await this.notificationModel.findById(dto.notificationId).select(notificationProjections).exec();
    }

    public async deleteAllNotifications(userId: MongoId, session?): Promise<void> {
        await this.notificationModel.deleteMany({user: userId}, {session}).exec();
    }
}
