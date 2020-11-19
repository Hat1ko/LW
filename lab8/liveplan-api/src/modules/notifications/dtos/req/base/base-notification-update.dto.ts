import {IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {MongoId} from '../../../../../shared/constants/constant';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class BaseNotificationUpdateDto {
    @ApiProperty({name: 'notificationId', description: 'Notification\'s objectId', type: mongoose.Types.ObjectId})
    @IsNotEmpty()
    @IsMongoId()
    notificationId: MongoId;

    @ApiPropertyOptional({name: 'name', description: 'Notification\'s name', type: String})
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({name: 'description', description: 'Notification\'s description', type: String})
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional({name: 'date', description: 'Notification\'s date', type: Date})
    @IsOptional()
    @IsDateString()
    date: Date;

    @ApiPropertyOptional({name: 'group',
        description: 'Notification\'s group\' objectId',
        type: mongoose.Types.ObjectId})
    @IsOptional()
    @IsMongoId()
    group: MongoId;

    @ApiPropertyOptional({name: 'remind', description: 'Notification\'s remind status', type: Boolean})
    @IsOptional()
    @IsBoolean()
    remind: boolean;

    @ApiPropertyOptional({name: 'isFavorite', description: 'Notification\'s isFavorite status', type: Boolean})
    @IsOptional()
    @IsBoolean()
    isFavorite: boolean;

    @ApiPropertyOptional({name: 'status', description: 'Notification\'s execution status'})
    @IsOptional()
    @IsBoolean()
    status: boolean;
}
