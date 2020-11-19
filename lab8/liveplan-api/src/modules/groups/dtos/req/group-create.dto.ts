import {IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {MongoId} from '../../../../shared/constants/constant';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class GroupCreateDto {
    @ApiProperty({name: 'name', type: String})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({name: 'description', type: String})
    @IsOptional()
    @IsString()
    description: string;

    @ApiProperty({name: 'messageText', type: String})
    @IsOptional()
    @IsString()
    messageText: string;

    @ApiProperty({name: 'icon', type: mongoose.Types.ObjectId})
    @IsNotEmpty()
    @IsMongoId()
    icon: MongoId;
}
