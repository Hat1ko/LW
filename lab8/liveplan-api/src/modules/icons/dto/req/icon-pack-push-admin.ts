import {IsArray, IsMongoId, IsNotEmpty} from 'class-validator';
import {MongoId} from '../../../../shared/constants/constant';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class IconPackPushAdmin {
    @ApiProperty({name: 'customerId', description: 'Customer\'s objectId', type: mongoose.Types.ObjectId})
    @IsMongoId()
    @IsNotEmpty()
    customerId: MongoId;
    @ApiProperty({name: 'iconPacksIds',
        description: 'Array of iconPacks\' objectIds',
        isArray: true,
        type: mongoose.Types.ObjectId})
    @IsArray()
    @IsNotEmpty()
    iconPacksIds: string[];
}
