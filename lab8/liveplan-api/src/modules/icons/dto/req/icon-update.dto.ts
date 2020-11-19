import {IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class IconUpdateDto {
    @ApiProperty({name: 'iconId', description: 'Icon\'s objectId', type: mongoose.Types.ObjectId})
    @IsMongoId()
    @IsNotEmpty()
    iconId: string;

    @ApiPropertyOptional({name: 'key', description: 'Icon\'s new key', type: String})
    @IsOptional()
    @IsString()
    key: string;

    @ApiPropertyOptional({name: 'name', description: 'Icon\'s new name', type: String})
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({name: 'iconPackId',
        description: 'Icon pack\'s new objectId', type: mongoose.Types.ObjectId})
    @IsOptional()
    @IsMongoId()
    iconPackId: string;
}
