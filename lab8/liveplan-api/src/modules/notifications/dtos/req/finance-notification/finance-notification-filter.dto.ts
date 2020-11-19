import {BaseNotificationFilterDto} from '../..';
import {IsNumber, IsOptional} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class FinanceNotificationFilterDto extends BaseNotificationFilterDto {
    @ApiPropertyOptional({name: 'fromAmount',
        description: 'Finance notification\'s amount. Search is done from this amount', type: Number})
    @IsOptional()
    @IsNumber()
    fromAmount: number;
    @ApiPropertyOptional({name: 'toAmount',
        description: 'Finance notification\'s amount. Search is done up to this amount', type: Number})
    @IsOptional()
    @IsNumber()
    toAmount: number;
}
