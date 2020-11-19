import {BadRequestException, forwardRef, Inject, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {FinanceNotification} from '../models/finance-notification.model';
import * as mongoose from 'mongoose';
import {Model} from 'mongoose';
import {MongoId} from '../../../shared/constants/constant';
import {
    FinanceNotificationCreateDto,
    FinanceNotificationDto,
    FinanceNotificationFilterDto,
    FinanceNotificationUpdateDto,
} from '../dtos';
import {UsersService} from '../../users/services/users.service';
import {UserDto} from '../../users/dtos';
import {GroupsService} from '../../groups/services/groups.service';
import {GroupDto} from '../../groups/dtos';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {paginate} from '../../../shared/paginator/paginator';
import {financeNotificationProjections} from '../constants/constants';
import {BaseNotification} from '../models/base-notification.model';
import {FinanceNotificationDefinition} from '../schemas/finance-notification.schema';

@Injectable()
export class FinanceNotificationsService {
    private readonly financeNotificationModel: Model<FinanceNotification>;

    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly usersService: UsersService,
        @InjectModel('BaseNotification')
        private readonly baseNotificationModel: Model<BaseNotification>,
        private readonly groupsService: GroupsService,
    ) {
        try {
            this.financeNotificationModel = this.baseNotificationModel.discriminator('FinanceNotification',
                new mongoose.Schema(FinanceNotificationDefinition));
        } catch (err) {
            this.financeNotificationModel = this.baseNotificationModel.discriminators['FinanceNotification'];
        }
    }

    public async existsById(notificationId: MongoId): Promise<boolean> {
        return this.financeNotificationModel.exists({_id: notificationId});
    }

    public async createFinanceNotification(userId: MongoId, dto: FinanceNotificationCreateDto):
        Promise<FinanceNotificationDto> {
        const user: UserDto = await this.usersService.findUserById(userId);
        if (!user) {
            throw new NotFoundException('User wasn\'t found');
        }

        const group: GroupDto = await this.groupsService.findGroupById(dto.group);
        if (!group) {
            throw new NotFoundException('Group wasn\'t found');
        }
        const notification: FinanceNotification = new this.financeNotificationModel(dto);
        notification.user = userId;
        await notification.save();

        return notification as FinanceNotificationDto;
    }

    public async findFinanceNotificationById(notificationId: MongoId): Promise<FinanceNotificationDto> {
        const notification: FinanceNotification =
            await this.financeNotificationModel.findById(notificationId)
                .select(financeNotificationProjections)
                .exec();
        if (!notification) {
            throw new NotFoundException('Finance notification wasn\'t found');
        }

        return notification as FinanceNotificationDto;
    }

    public async findFinanceNotificationByUserId(userId: MongoId): Promise<FinanceNotificationDto> {
        const notification: FinanceNotification =
            await this.financeNotificationModel.findOne({user: userId})
                .select(financeNotificationProjections)
                .exec();
        if (!notification) {
            throw new NotFoundException('Finance notification wasn\'t found');
        }

        return notification as FinanceNotificationDto;
    }

    public async deleteFinanceNotification(notificationId: MongoId): Promise<FinanceNotificationDto> {
        const notification: FinanceNotification =
            await this.financeNotificationModel.findByIdAndDelete(notificationId)
                .select(financeNotificationProjections).exec();

        if (!notification) {
            throw new NotFoundException('Finance notification wasn\'t found');
        }

        return notification as FinanceNotificationDto;
    }

    public async update(userId: MongoId, dto: FinanceNotificationUpdateDto): Promise<FinanceNotificationDto> {
        const notification: FinanceNotification =
            await this.financeNotificationModel.findOneAndUpdate(
                {
                    _id: dto.notificationId,
                    user: userId,
                },
                dto,
            ).exec();

        if (!notification) {
            throw new NotFoundException('Finance notification wasn\'t found');
        }

        const updatedNotification: FinanceNotification =
            await this.financeNotificationModel.findById(dto.notificationId)
                .select(financeNotificationProjections).exec();

        if (!notification.status && updatedNotification.status && updatedNotification.periodicity) {
            const newNotification: FinanceNotification | FinanceNotificationDto =
                await this.iterateFinanceNotification(updatedNotification);

            const notificationToCreate: FinanceNotificationCreateDto = {
                name: newNotification.name,
                description: newNotification.description,
                date: newNotification.date,
                group: newNotification.group,
                remind: newNotification.remind,
                isFavorite: newNotification.isFavorite,
                amount: newNotification.amount,
                periodicity: {
                    interval: newNotification.periodicity.interval,
                    unit: newNotification.periodicity.unit,
                },
            };
            await this.createFinanceNotification(newNotification.user, notificationToCreate);
        }

        return updatedNotification as FinanceNotificationDto;
    }

    public async findWithFilters(
        userId: MongoId,
        dto?: FinanceNotificationFilterDto,
        options?: PaginationInterface):
        Promise<IPaginationResponse<FinanceNotificationDto[]>> {
        const query = this.financeNotificationModel.find({user: userId}).select(financeNotificationProjections);
        if (dto) {
            if (dto.id) {
                query.where('_id').equals(dto.id);
            }
            if (dto.name) {
                query.where('name').equals(dto.name);
            }
            if (dto.fromDate) {
                query.where('date').gte(dto.fromDate);
            }
            if (dto.toDate) {
                query.where('date').lte(dto.toDate);
            }
            if (dto.group) {
                query.where('group').equals(dto.group);
            }
            if (dto.remind != undefined || dto.remind != null) {
                query.where('remind').equals(dto.remind.toLowerCase() == 'true');
            }
            if (dto.isFavorite != undefined || dto.isFavorite != null) {
                query.where('isFavorite').equals(dto.isFavorite.toLowerCase() == 'true');
            }
            if (dto.status != undefined || dto.status != null) {
                query.where('status').equals(dto.status.toLowerCase() == 'true');
            }
            if (dto.fromAmount) {
                query.where('amount').gte(dto.fromAmount);
            }
            if (dto.toAmount) {
                query.where('amount').lte(dto.toAmount);
            }
        }
        query.sort({date: 1});
        return await paginate(query, options);
    }

    public async deletePeriodicityById(notificationId: MongoId):
        Promise<FinanceNotificationDto> {
        const notification: FinanceNotification = await this.financeNotificationModel.findOneAndUpdate(
            {
                _id: notificationId,
            },
            {
                $unset: {
                    periodicity: '',
                },
            },
        ).exec();

        if (!notification) {
            throw new NotFoundException('Finance notification wasn\'t found');
        }
        if (!notification.periodicity) {
            throw new NotFoundException('Finance notification\'s periodicity wasn\'t found');
        }

        const updatedNotification: FinanceNotification = await this.financeNotificationModel
            .findById(notificationId)
            .select(financeNotificationProjections)
            .exec();
        return updatedNotification as FinanceNotificationDto;
    }

    public async iterateFinanceNotification(notification: FinanceNotificationDto | FinanceNotification):
        Promise<FinanceNotificationDto | FinanceNotification> {
        const periodicity = notification.periodicity;
        const date: Date = null;
        if (!periodicity) {
            throw new BadRequestException('Periodicity required for iterating');
        }
        switch (periodicity.unit) {
        case 'day':
            date.setDate(notification.date.getDate() + periodicity.interval);
            break;
        case 'week':
            date.setDate(notification.date.getDate() + 7 * periodicity.interval);
            break;
        case 'month':
            date.setMonth(notification.date.getMonth() + periodicity.interval);
            break;
        case 'year':
            date.setFullYear(notification.date.getFullYear() + periodicity.interval);
            break;
        default:
            throw new BadRequestException('Periodicity unit is not in the enum');
        }
        const newNotification = Object.assign({}, notification);
        newNotification.date = date;
        return newNotification;
    }

    public async deleteAllFinanceNotifications(userId: MongoId, session?): Promise<void> {
        await this.financeNotificationModel.deleteMany({user: userId}, {session}).exec();
    }
}
