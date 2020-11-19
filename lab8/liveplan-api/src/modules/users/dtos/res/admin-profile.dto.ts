import {MongoId} from '../../../../shared/constants/constant';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class AdminProfileDto {
    @ApiProperty({name: '_id', description: 'Admin\'s objectId', type: mongoose.Types.ObjectId})
    _id: MongoId;

    @ApiProperty({name: 'email', description: 'Admin\'s email', type: String})
    email: string;

    @ApiProperty({name: 'name', description: 'First and Last name of admin', type: String})
    name: { first: string, last: string };

    @ApiProperty({name: 'photoUrl', type: String})
    photoUrl: string;
}
