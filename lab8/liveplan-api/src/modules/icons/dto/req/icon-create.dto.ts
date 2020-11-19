import {IsMongoId, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class IconCreateDto {
    @ApiProperty({name: 'name', description: 'Icon\'s name', type: String})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({name: 'key', description: 'Icon\'s key', type: String})
    @IsNotEmpty()
    @IsString()
    key: string;

    @ApiProperty({name: 'iconPackId', description: 'Icon pack\'s objectId', type: mongoose.Types.ObjectId})
    @IsNotEmpty()
    @IsMongoId()
    iconPackId?: string;

    @ApiProperty({name: 'pictureUrl', description: 'Icon\'s picture\'s url', type: String})
    pictureUrl?: string;
}
