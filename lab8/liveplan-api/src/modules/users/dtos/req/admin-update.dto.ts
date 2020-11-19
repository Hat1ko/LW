import {IsOptional, IsString} from 'class-validator';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class AdminUpdateDto {
    @ApiPropertyOptional({name: 'firstName', description: 'Admins first name to update', type: String})
    @IsOptional()
    @IsString()
    firstName: string;

    @ApiPropertyOptional({name: 'lastName', description: 'Admins last name to update', type: String})
    @IsOptional()
    @IsString()
    lastName: string;
}
