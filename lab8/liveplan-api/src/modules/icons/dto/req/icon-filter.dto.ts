import {IsMongoId, IsOptional, IsString} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class IconFilterDto {
    @ApiPropertyOptional({name: 'key', description: 'Icon\'s key', type: String})
    @IsOptional()
    @IsString()
    key?: string;

    @ApiPropertyOptional({name: 'name', description: 'Icon\'s name', type: String})
    @IsOptional()
    @IsString()
    name?: string;

    @ApiPropertyOptional({name: 'iconPackId',
        description: 'Icon pack\'s objectId', type: mongoose.Types.ObjectId})
    @IsOptional()
    @IsMongoId()
    iconPackId?: string;
}
