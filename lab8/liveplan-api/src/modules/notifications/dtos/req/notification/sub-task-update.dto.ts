import {IsBoolean, IsMongoId, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {MongoId} from '../../../../../shared/constants/constant';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class SubTaskUpdateDto {
    @ApiProperty({name: '_id', description: 'Sub task\'s  objectId'})
    @IsNotEmpty()
    @IsMongoId()
    _id: MongoId;

    @ApiPropertyOptional(/**/{name: '_id', description: 'Sub task name', type: String})
    @IsOptional()
    @IsString()
    task: string;

    @ApiPropertyOptional({name: 'status', description: 'Sub task execution status', type: Boolean})
    @IsOptional()
    @IsBoolean()
    status: boolean;
}
