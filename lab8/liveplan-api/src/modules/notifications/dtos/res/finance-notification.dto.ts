import {BaseNotificationDto} from './base-notification.dto';
import {ApiProperty} from '@nestjs/swagger';

export class FinanceNotificationDto extends BaseNotificationDto {
    @ApiProperty({name: 'amount', description: 'Finance notification\'s amount', type: Number})
    amount: number;
    @ApiProperty({name: 'periodicity', description: 'Finance notification\'s periodicity'})
    periodicity: {
        interval: number;
        unit: string;
    };
}
