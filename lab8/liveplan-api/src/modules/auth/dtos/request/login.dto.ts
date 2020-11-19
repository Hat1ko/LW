import {IsEmail, IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({name: 'email', description: 'User\'s email', type: String})
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    email: string;

    @ApiProperty({name: 'password', description: 'User\'s password', type: String})
    @IsNotEmpty()
    @IsString()
    password: string;
}
