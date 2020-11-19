import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class IconDto {
    @ApiProperty({name: '_id', description: 'Icon\'s objectId', type: mongoose.Types.ObjectId})
    _id: string;
    @ApiProperty({name: 'name', description: 'Icon\'s name', type: String})
    name: string;
    @ApiProperty({name: 'pictureUrl', description: 'Icon\'s picture url', type: String})
    pictureUrl: string;
    @ApiProperty({name: 'iconPackId', description: 'Icon pack\'s objectId', type: mongoose.Types.ObjectId})
    iconPackId: string;
}
