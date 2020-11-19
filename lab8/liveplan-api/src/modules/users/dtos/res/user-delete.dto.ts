import {ApiProperty} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

export class UserDeleteDto {
    @ApiProperty({name: 'userId', description: 'User\'s objectId', type: mongoose.Types.ObjectId})
    userId: number;
    @ApiProperty({name: 'isDeleted', description: 'User\'s isDeleted status', type: Boolean})
    isDeleted: boolean;
}
