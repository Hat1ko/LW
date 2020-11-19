import {SubTaskUpdateDto} from './sub-task-update.dto';
import {IsArray, IsOptional, ValidateNested} from 'class-validator';
import {BaseNotificationUpdateDto} from '../..';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class NotificationUpdateDto extends BaseNotificationUpdateDto {
    @ApiPropertyOptional({name: 'subTasks',
        description: 'Notification\'s sub tasks',
        type: SubTaskUpdateDto,
        isArray: true})
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    subTasks: SubTaskUpdateDto[];
}
