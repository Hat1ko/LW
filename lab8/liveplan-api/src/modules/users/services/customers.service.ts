import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CustomerInfo} from '../models/customer-info.model';
import {MongoId} from '../../../shared/constants/constant';
import {CustomerInfoDto} from '../dtos';

@Injectable()
export class CustomersService {
    constructor(
        @InjectModel('CustomerInfo')
        private customerModel: Model<CustomerInfo>,
    ) {
    }

    public async findCustomerById(customerId: MongoId): Promise<CustomerInfoDto> {
        const customer = await this.customerModel.findOne({
            _id: customerId, role: 'customer', isDeleted: false,
        }).exec();
        if (!customer) {
            throw new NotFoundException('Customer not found');
        }
        return customer;
    }

    public async deleteIconPacksFromCustomers(iconPackId: MongoId, session?): Promise<void> {
        await this.customerModel.updateMany(
            {iconPacks: {$in: [String(iconPackId)]}, isDeleted: false},
            {$pull: {iconPacks: {$in: [String(iconPackId)]}}},
            {session},
        );
        return;
    }

    async pushIconPackToUsers(iconPacksIds: string[], customerId: MongoId, session?): Promise<void> {
        const customer = await this.customerModel.findOneAndUpdate({_id: customerId, isDeleted: false},
            {
                $push: {iconPacks: {$each: iconPacksIds}},
            }, {session});

        for (const idPack of customer.iconPacks) {
            for (const id of iconPacksIds) {
                if (String(id) == String(idPack)) {
                    await session.abortTransaction();
                    await session.endSession();
                    throw new BadRequestException(`Customer already have ${idPack} pack`);
                }
            }
        }

        if (!customer) {
            await session.abortTransaction();
            await session.endSession();
            throw new NotFoundException('Customer not found');
        }
    }
}
