import {MongoId} from '../../../../shared/constants/constant';
import {IsMongoId, IsOptional, IsString} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class GroupFilterDto {
    @ApiPropertyOptional({name: 'id', type: mongoose.Types.ObjectId})
    @IsOptional()
    @IsMongoId()
    id?: MongoId;

    @ApiPropertyOptional({name: 'name', type: String})
    @IsOptional()
    @IsString()
    name?: string;
}
