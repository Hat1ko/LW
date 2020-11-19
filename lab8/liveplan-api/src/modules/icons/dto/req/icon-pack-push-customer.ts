import {IsArray, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class IconPackPushCustomer {
    @ApiProperty({name: 'iconPacksIds',
        description: 'Icon packs\' objectIds',
        isArray: true,
        type: mongoose.Types.ObjectId})
    @IsArray()
    @IsNotEmpty()
    iconPacksIds: string[];
}
