import {IsDateString, IsNotEmpty} from 'class-validator';

export class TimePeriodDto {
    @IsNotEmpty()
    @IsDateString()
    dateAfter: Date;

    @IsNotEmpty()
    @IsDateString()
    dateBefore: Date;
}
