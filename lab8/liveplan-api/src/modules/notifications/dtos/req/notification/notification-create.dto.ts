import {IsArray, IsOptional, ValidateNested} from 'class-validator';
import {BaseNotificationCreateDto} from '../..';
import {ApiPropertyOptional} from '@nestjs/swagger';
import {SubTaskCreateDto} from './sub-task-create.dto';

export class NotificationCreateDto extends BaseNotificationCreateDto {
    @ApiPropertyOptional({name: 'subTasks',
        description: 'Notification\'s sub tasks',
        type: SubTaskCreateDto,
        isArray: true})
    @IsOptional()
    @IsArray()
    @ValidateNested({each: true})
    subTasks: SubTaskCreateDto[];
}
