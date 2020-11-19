import {IsOptional, IsString} from 'class-validator';
import {ApiPropertyOptional} from '@nestjs/swagger';

export class CustomerUpdateDto {
    @ApiPropertyOptional({name: 'firstName', description: 'Customer\'s first name to update', type: String})
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiPropertyOptional({name: 'lastName', description: 'Customer\'s last name to update', type: String})
    @IsOptional()
    @IsString()
    lastName: string;
}
