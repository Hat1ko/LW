import {IsEmail, IsNotEmpty, IsObject, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UserCreateDto {
    @ApiProperty({name: 'email', type: String})
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({name: 'password', type: String})
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({name: 'confirmPassword', type: String})
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;

    @ApiProperty({name: 'name'})
    @IsNotEmpty()
    @IsObject()
    name: {
        first: string,
        last: string,
    };

    @ApiProperty({name: 'role', type: String, enum: ['admin', 'customer']})
    role: string;

    @ApiProperty({name: 'photoUrl', type: String})
    photoUrl?: string;
}
