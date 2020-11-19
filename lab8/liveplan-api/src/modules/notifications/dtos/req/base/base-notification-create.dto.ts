import {IsBoolean, IsDateString, IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {MongoId} from '../../../../../shared/constants/constant';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class BaseNotificationCreateDto {
    @ApiProperty({name: 'name', description: 'Notification\'s name', type: String})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({name: 'description', description: 'Notification\'s description', type: String})
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({name: 'date', description: 'Notification\'s date', type: Date})
    @IsNotEmpty()
    @IsDateString()
    date: Date;

    @ApiProperty({name: 'group', description: 'Notification\'s group\'s objectId', type: mongoose.Types.ObjectId})
    @IsNotEmpty()
    @IsMongoId()
    group: MongoId;

    @ApiProperty({name: 'remind', description: 'Notification\'s remind status', type: Boolean})
    @IsNotEmpty()
    @IsBoolean()
    remind: boolean;

    @ApiPropertyOptional({name: 'isFavorite', description: 'Notification\'s isFavorite status', type: Boolean})
    @IsOptional()
    @IsBoolean()
    isFavorite: boolean;
}
