import {MongoId} from '../../../../../shared/constants/constant';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class SubTaskDeleteDto {
    @ApiProperty({name: 'notificationId',
        description: 'Notification\'s objectId',
        type: mongoose.Types.ObjectId})
    notificationId: MongoId;

    @ApiProperty({name: 'subTaskIds',
        description: 'Sub task\'s ids of ones to delete',
        isArray: true,
        type: mongoose.Types.ObjectId})
    subTaskIds: MongoId[];
}
