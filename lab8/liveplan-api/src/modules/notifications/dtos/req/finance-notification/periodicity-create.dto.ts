import {IsIn, IsInt, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class PeriodicityCreateDto {
    @ApiProperty({name: 'interval', description: 'Finance notification\'s interval', type: Number})
    @IsNotEmpty()
    @IsInt()
    interval: number;

    @ApiProperty({name: 'unit',
        description: 'Finance notification\'s interval unit',
        type: String,
        enum: ['day', 'week', 'month', 'year']})
    @IsNotEmpty()
    @IsString()
    @IsIn(['day', 'week', 'month', 'year'])
    unit: string;
}
