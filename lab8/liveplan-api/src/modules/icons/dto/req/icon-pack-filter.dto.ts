import {IsMongoId, IsOptional, IsString} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class IconPackFilterDto {
    @ApiPropertyOptional({name: 'key', description: 'Icon pack\'s key', type: String})
    @IsOptional()
    @IsString()
    key?: string;

    @ApiPropertyOptional({name: 'name', description: 'Icon pack\'s name', type: String})
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({name: 'userId', description: 'User\'s objectId', type: mongoose.Types.ObjectId})
    @IsOptional()
    @IsMongoId()
    userId: string;
}
