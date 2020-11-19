import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CustomerInfo} from '../models/customer-info.model';
import {CustomerProfileDto, CustomerUpdateDto} from '../dtos';
import {MongoId} from '../../../shared/constants/constant';

@Injectable()
export class CustomersAccountService {
    constructor(
        @InjectModel('CustomerInfo')
        private customerInfoModel: Model<CustomerInfo>,
    ) {
    }

    public async update(userId: MongoId, customerUpdateDto: CustomerUpdateDto): Promise<CustomerProfileDto> {
        const customerToUpdate: CustomerInfo = await this.customerInfoModel.findOne(
            {
                _id: userId,
                isDeleted: false,
            },
        ).exec();
        if (!customerToUpdate) {
            throw new NotFoundException('Customer wasn\'t found');
        }

        if (customerUpdateDto.firstName) {
            customerToUpdate.name.first = customerUpdateDto.firstName;
        }
        if (customerUpdateDto.lastName) {
            customerToUpdate.name.last = customerUpdateDto.lastName;
        }

        customerToUpdate.markModified('name');
        await customerToUpdate.save();

        const updatedCustomer: CustomerInfo = await this.customerInfoModel.findById(userId)
            .select('_id email name photoUrl')
            .exec();
        return updatedCustomer as CustomerProfileDto;
    }

    public async getProfile(objectId: MongoId): Promise<CustomerProfileDto> {
        const customerToReturn: CustomerInfo = await this.customerInfoModel.findOne(
            {
                _id: objectId,
                isDeleted: false,
            },
        ).select('_id email name photoUrl')
            .exec();

        if (!customerToReturn) {
            throw new NotFoundException('Customer wasn\'t found');
        }
        return customerToReturn as CustomerProfileDto;
    }

    public async setCustomerDeleteStatus(objectId: MongoId, status: boolean): Promise<CustomerProfileDto> {
        const customerToUpdate: CustomerInfo = await this.customerInfoModel.findOneAndUpdate(
            {
                _id: objectId,
                isDeleted: !status,
            },
            {
                isDeleted: status,
            },
        ).select('_id email name photoUrl')
            .exec();

        if (!customerToUpdate) {
            throw new NotFoundException('Customer wasn\'t found');
        }
        return customerToUpdate;
    }
}
