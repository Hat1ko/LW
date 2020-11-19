import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {MongoId} from '../../../../shared/constants/constant';
import * as mongoose from 'mongoose';

export class IconPackDto {
    @ApiProperty({name: '_id', description: 'Icon pack\'s objectId', type: mongoose.Types.ObjectId})
    _id: string;
    @ApiProperty({name: 'name', description: 'Icon pack\'s name', type: String})
    name: string;
    @ApiPropertyOptional({isArray: true, type: () => mongoose.Types.ObjectId})
    icons?: MongoId[];
}
