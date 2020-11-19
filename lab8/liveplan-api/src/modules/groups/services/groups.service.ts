import {forwardRef, Inject, Injectable, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {Group} from '../models/group.model';
import {UsersService} from '../../users/services/users.service';
import {MongoId} from '../../../shared/constants/constant';
import {UserDto} from '../../users/dtos';
import {IconsService} from '../../icons/services/icons.service';
import {Icon} from '../../icons/models/icon.model';
import {GroupCreateDto, GroupDto, GroupFilterDto, GroupUpdateDto} from '../dtos';
import {IconDto} from '../../icons/dto';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {paginate} from '../../../shared/paginator/paginator';

@Injectable()
export class GroupsService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private readonly userService: UsersService,
        @InjectModel('Group')
        private groupModel: Model<Group>,
        private readonly iconsService: IconsService,
    ) {
    }

    public async existsById(groupId: MongoId): Promise<boolean> {
        return await this.groupModel.exists({_id: groupId});
    }

    public async findGroupById(groupId: MongoId): Promise<GroupDto> {
        const group: Group = await this.groupModel.findById(groupId).populate('icon').exec();
        if (!group) {
            throw new NotFoundException('Group wasn\'t found');
        }

        const groupToReturn: any = group;
        return groupToReturn as GroupDto;
    }

    public async createGroup(userId: MongoId, newGroup: GroupCreateDto): Promise<Group> {
        const user: UserDto = await this.userService.findUserById(userId);
        if (!user) {
            throw new NotFoundException('User wasn\'t found');
        }

        const icon: Icon = await this.iconsService.findIconById(newGroup.icon);
        if (!icon) {
            throw new NotFoundException('Icon wasn\'t found');
        }

        const group: Group = new this.groupModel(newGroup as Group);
        group.user = userId;
        const savedGroup: Group = await group.save();
        return savedGroup as Group;
    }

    public async updateGroup(userId: MongoId, groupToUpdate: GroupUpdateDto): Promise<GroupDto> {
        if (userId) {
            const user: UserDto = await this.userService.findUserById(userId);
            if (!user) {
                throw new NotFoundException('User wasn\'t found');
            }
        }

        if (groupToUpdate.icon) {
            const icon: Icon = await this.iconsService.findIconById(groupToUpdate.icon);
            if (groupToUpdate.icon && !icon) {
                throw new NotFoundException('Icon wasn\'t found');
            }
        }

        const group: Group = await this.groupModel.findOneAndUpdate(
            {
                _id: groupToUpdate.groupId,
                user: userId,
            },
            groupToUpdate,
        ).exec();
        if (!group) {
            throw new NotFoundException('Group wasn\'t found');
        }

        const updatedGroup: any = await this.groupModel.findById(groupToUpdate.groupId).populate('icon').exec();
        return updatedGroup as GroupDto;
    }

    public async deleteGroupById(groupId: MongoId): Promise<GroupDto> {
        const groupToDelete: Group = await this.groupModel.findByIdAndDelete(groupId).exec();
        const groupToHaveBeenDeleted: Group = await this.groupModel.findById(groupId).exec();

        if (groupToHaveBeenDeleted) {
            throw new InternalServerErrorException('Group wasn\'t deleted');
        }

        const response: any = groupToDelete;
        response.icon = await this.iconsService.findIconById(groupToDelete.icon) as IconDto;
        return response as GroupDto;
    }

    public async findGroupWithFilter(userId: MongoId, options: PaginationInterface, projections?: string,
        filter?: GroupFilterDto): Promise<IPaginationResponse<Group[]>> {
        const query = this.groupModel.find().where('user').equals(userId).populate('icon');
        if (projections) {
            query.select(projections);
        }
        if (filter) {
            if (filter.id) {
                query.where('_id').equals(filter.id);
            }
            if (filter.name) {
                query.where('name').equals(filter.name);
            }
        }
        return await paginate(query, options);
    }
}
