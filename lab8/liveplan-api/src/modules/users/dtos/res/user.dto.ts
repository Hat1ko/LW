import {MongoId} from '../../../../shared/constants/constant';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class UserDto {
    @ApiProperty({name: '_id', description: 'User\'s objectId', type: mongoose.Types.ObjectId})
    _id: MongoId;

    @ApiProperty({name: 'email', description: 'User\'s email', type: String})
    email: string;

    @ApiProperty({name: 'password', description: 'User\'s password', type: String})
    password: string;

    @ApiProperty({name: 'name', description: 'First and Last name of admin', type: String})
    name: { first: string, last: string };

    @ApiProperty({name: 'photoUrl', type: String})
    photoUrl: string;

    @ApiProperty({name: 'role', type: String, enum: ['admin', 'customer']})
    role: string;

    @ApiProperty({name: 'isDeleted', description: 'User\'s isDeleted status', type: Boolean})
    isDeleted: boolean;
}
