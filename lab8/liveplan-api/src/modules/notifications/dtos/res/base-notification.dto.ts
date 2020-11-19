import {MongoId} from '../../../../shared/constants/constant';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class BaseNotificationDto {
    @ApiProperty({name: '_id', description: 'Notification\'s objectId', type: mongoose.Types.ObjectId})
    _id: MongoId;
    @ApiProperty({name: 'name', description: 'Notification\'s name', type: String})
    name: string;
    @ApiProperty({name: 'description', description: 'Notification\'s description', type: String})
    description: string;
    @ApiProperty({name: 'date', description: 'Notification\'s date', type: Date})
    date: Date;
    @ApiProperty({name: 'group', description: 'Notification\'s group\'s objectId', type: mongoose.Types.ObjectId})
    group: MongoId;
    @ApiProperty({name: 'remind', description: 'Notification\'s remind status', type: Boolean})
    remind: boolean;
    @ApiProperty({name: 'isFavorite', description: 'Notification\'s isFavorite status', type: Boolean})
    isFavorite: boolean;
    @ApiProperty({name: 'status', description: 'Notification\'s status', type: Boolean})
    status: boolean;
    @ApiProperty({name: 'user', description: 'User\'s objectId', type: mongoose.Types.ObjectId})
    user: MongoId;
}
