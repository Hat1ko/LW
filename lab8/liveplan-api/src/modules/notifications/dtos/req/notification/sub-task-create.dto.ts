import {IsBoolean, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class SubTaskCreateDto {
    @ApiProperty({name: '_id', description: 'Sub task name', type: String})
    @IsNotEmpty()
    @IsString()
    task: string;

    @ApiProperty({name: 'status', description: 'Sub task execution status', type: Boolean})
    @IsOptional()
    @IsBoolean()
    status: boolean;
}
