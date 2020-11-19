import {UserDto} from './user.dto';
import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class CustomerInfoDto extends UserDto {
    @ApiProperty({name: 'iconPacks', type: mongoose.Types.ObjectId, isArray: true})
    iconPacks: string[];
}
