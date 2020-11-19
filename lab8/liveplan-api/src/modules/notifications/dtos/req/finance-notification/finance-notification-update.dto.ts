import {IsNumber, IsOptional, ValidateNested} from 'class-validator';
import {PeriodicityUpdateDto} from './periodicity-update.dto';
import {BaseNotificationUpdateDto} from '../..';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class FinanceNotificationUpdateDto extends BaseNotificationUpdateDto {
    @ApiPropertyOptional({name: 'amount', description: 'New finance notification\'s amount', type: Number})
    @IsOptional()
    @IsNumber()
    amount: number;

    @ApiPropertyOptional({name: 'periodicity',
        description: 'New finance notification\'s periodicity', type: PeriodicityUpdateDto})
    @IsOptional()
    @ValidateNested({each: true})
    periodicity: PeriodicityUpdateDto;
}
