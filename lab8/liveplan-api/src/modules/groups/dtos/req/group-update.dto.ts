import {MongoId} from '../../../../shared/constants/constant';
import {IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class GroupUpdateDto {
    @ApiProperty({name: 'groupId', type: mongoose.Types.ObjectId})
    @IsNotEmpty()
    @IsMongoId()
    groupId: MongoId

    @ApiPropertyOptional({name: 'name', type: String})
    @IsOptional()
    @IsString()
    name: string;

    @ApiPropertyOptional({name: 'description', type: String})
    @IsOptional()
    @IsString()
    description: string;

    @ApiPropertyOptional({name: 'messageText', type: String})
    @IsOptional()
    @IsString()
    messageText: string;

    @ApiPropertyOptional({name: 'icon', type: mongoose.Types.ObjectId})
    @IsOptional()
    @IsMongoId()
    icon: MongoId;
}
