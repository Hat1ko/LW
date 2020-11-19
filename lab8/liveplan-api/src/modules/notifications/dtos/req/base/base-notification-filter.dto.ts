import {IsBoolean, IsBooleanString, IsDateString, IsMongoId, IsOptional, IsString} from 'class-validator';
import {MongoId} from '../../../../../shared/constants/constant';
import {ApiPropertyOptional} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class BaseNotificationFilterDto {
    @ApiPropertyOptional({name: 'id', description: 'Notification\'s objectId', type: mongoose.Types.ObjectId})
    @IsOptional()
    @IsMongoId()
    id?: MongoId;

    @ApiPropertyOptional({name: 'name', description: 'Notification\'s name', type: String})
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({name: 'fromDate',
        description: 'Notification\'s date. Search is done from it',
        type: Date})
    @IsOptional()
    @IsString()
    @IsDateString()
    fromDate?: Date;

    @ApiPropertyOptional({name: 'toDate',
        description: 'Notification\'s date. Search is done up to it',
        type: Date})
    @IsOptional()
    @IsString()
    @IsDateString()
    toDate?: Date;

    @ApiPropertyOptional({name: 'group',
        description: 'Notification\'s group\'s objectId',
        type: mongoose.Types.ObjectId})
    @IsOptional()
    @IsMongoId()
    group?: MongoId;

    @ApiPropertyOptional({name: 'remind', description: 'Notification\'s remind status', type: Boolean})
    @IsOptional()
    @IsBooleanString()
    remind?: string;

    @ApiPropertyOptional({name: 'isFavorite', description: 'Notification\'s isFavorite status', type: Boolean})
    @IsOptional()
    @IsBooleanString()
    isFavorite?: string;

    @ApiPropertyOptional({name: 'status', description: 'Notification\'s execution status', type: Boolean})
    @IsOptional()
    @IsBooleanString()
    status?: string;
}
