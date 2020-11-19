import {IsEmail, IsNotEmpty} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class ResetPasswordStartDto {
    @ApiProperty({name: 'email', description: 'User\'s email', type: String})
    @IsEmail()
    @IsNotEmpty()
    email: string;
}
