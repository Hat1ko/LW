import {MongoId} from '../../../../shared/constants/constant';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CustomerProfileDto {
    @ApiProperty({name: '_id', description: 'Customer\'s objectId', type: mongoose.Types.ObjectId})
    _id: MongoId;

    @ApiProperty({name: 'email', description: 'Customer\'s email', type: String})
    email: string;

    @ApiProperty({name: 'name', description: 'First and Last name of customer', type: String})
    name: { first: string, last: string };

    @ApiProperty({name: 'photoUrl', type: String})
    photoUrl: string;

    @ApiProperty({name: 'iconPacks', isArray: true, type: mongoose.Types.ObjectId})
    iconPacks: string[];
}
