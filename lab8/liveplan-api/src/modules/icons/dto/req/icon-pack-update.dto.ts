import {IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {MongoId} from '../../../../shared/constants/constant';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class IconPackUpdateDto {
    @ApiProperty({name: 'iconPackId', description: 'Icon pack\'s objectId', type: mongoose.Types.ObjectId})
    @IsMongoId()
    @IsNotEmpty()
    iconPackId: MongoId;

    @ApiPropertyOptional({name: 'name', description: 'New icon pack\'s name', type: String})
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({name: 'key', description: 'New icon pack\'s key', type: String})
    @IsOptional()
    @IsString()
    key: string
}
