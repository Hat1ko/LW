import {IsNotEmpty, IsNumber, IsOptional, ValidateNested} from 'class-validator';
import {PeriodicityCreateDto} from './periodicity-create.dto';
import {BaseNotificationCreateDto} from '../..';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class FinanceNotificationCreateDto extends BaseNotificationCreateDto {
    @ApiProperty({name: 'amount', description: 'Finance notification\'s amount', type: Number})
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @ApiPropertyOptional({name: 'periodicity',
        description: 'Finance notification\'s periodicity',
        type: PeriodicityCreateDto})
    @IsOptional()
    @ValidateNested({each: true})
    periodicity: PeriodicityCreateDto;
}
