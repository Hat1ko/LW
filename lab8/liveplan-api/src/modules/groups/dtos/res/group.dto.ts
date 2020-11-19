import {MongoId} from '../../../../shared/constants/constant';
import {IconDto} from '../../../icons/dto';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class GroupDto {
    @ApiProperty({name: '_id', type: mongoose.Types.ObjectId})
    _id: MongoId;

    @ApiProperty({name: 'name', type: String})
    name: string;

    @ApiProperty({name: 'description', type: String})
    description: string;

    @ApiProperty({name: 'messageText', type: String})
    messageText: string;

    @ApiProperty({name: 'user', type: mongoose.Types.ObjectId})
    user: MongoId;

    @ApiProperty({name: 'icon', type: IconDto})
    icon: IconDto;
}
