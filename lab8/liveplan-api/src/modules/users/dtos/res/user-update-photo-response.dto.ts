import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class UserPhotoUpdateResponseDto {
    @ApiProperty({name: 'userId', description: 'User\'s objectId', type: mongoose.Types.ObjectId})
    userId: number;

    @ApiProperty({name: 'photoUrl', type: String})
    photoUrl: string;
}
