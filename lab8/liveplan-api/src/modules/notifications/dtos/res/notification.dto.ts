import {MongoId} from '../../../../shared/constants/constant';
import {BaseNotificationDto} from './base-notification.dto';
import {ApiProperty} from '@nestjs/swagger';

export class NotificationDto extends BaseNotificationDto {
    @ApiProperty({name: 'subTasks', description: 'Notification\'s sub tasks'})
    subTasks: {
        _id: MongoId,
        status: boolean,
        task: string,
    }[];
}
