import {InjectModel} from '@nestjs/mongoose';
import {AdminInfo} from '../models/admin-info.model';
import {Model} from 'mongoose';
import {Injectable, NotFoundException} from '@nestjs/common';
import {AdminProfileDto, AdminUpdateDto} from '../dtos';
import {MongoId} from '../../../shared/constants/constant';

@Injectable()
export class AdminAccountService {
    constructor(
        @InjectModel('AdminInfo')
        private readonly adminModel: Model<AdminInfo>,
    ) {
    }

    public async update(userId: MongoId, adminUpdateDto: AdminUpdateDto): Promise<AdminProfileDto> {
        const adminToUpdate: AdminInfo = await this.adminModel.findOne(
            {
                _id: userId,
                isDeleted: false,
            }).exec();
        if (!adminToUpdate) {
            throw new NotFoundException('Admin wasn\'t found');
        }

        if (adminUpdateDto.firstName) {
            adminToUpdate.name.first = adminUpdateDto.firstName;
        }
        if (adminUpdateDto.lastName) {
            adminToUpdate.name.last = adminUpdateDto.lastName;
        }

        adminToUpdate.markModified('name');
        await adminToUpdate.save();

        const updatedAdmin: AdminInfo = await this.adminModel.findById(userId)
            .select('_id email name photoUrl')
            .exec();
        return updatedAdmin as AdminProfileDto;
    }

    public async getProfile(objectId: MongoId): Promise<AdminProfileDto> {
        const adminToReturn: AdminInfo = await this.adminModel.findOne(
            {
                _id: objectId,
                isDeleted: false,
            },
        ).select('_id email name photoUrl')
            .exec();
        if (!adminToReturn) {
            throw new NotFoundException('Admin wasn\'t found');
        }
        return adminToReturn as AdminProfileDto;
    }

    public async setAdminDeleteStatus(objectId: MongoId, status: boolean): Promise<AdminProfileDto> {
        const adminToUpdate: AdminInfo = await this.adminModel.findOneAndUpdate(
            {
                _id: objectId,
                isDeleted: !status,
            },
            {
                isDeleted: status,
            },
        ).select('_id email name photoUrl')
            .exec();

        if (!adminToUpdate) {
            throw new NotFoundException('Admin wasn\'t found');
        }
        return adminToUpdate as AdminProfileDto;
    }
}
