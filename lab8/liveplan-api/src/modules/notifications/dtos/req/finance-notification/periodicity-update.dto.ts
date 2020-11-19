import {IsIn, IsInt, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class PeriodicityUpdateDto {
    @ApiProperty({name: 'interval',
        description: 'New finance notification\'s interval', type: Number})
    @IsNotEmpty()
    @IsInt()
    interval: number;

    @ApiProperty({name: 'unit',
        description: 'New finance notification\'s interval unit',
        type: String,
        enum: ['day', 'week', 'month', 'year']})
    @IsNotEmpty()
    @IsString()
    @IsIn(['day', 'week', 'month', 'year'])
    unit: string;
}
