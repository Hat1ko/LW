import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class VerifyResetPasswordDto {
    @ApiProperty({name: 'code', type: String, description: 'Secret code'})
    @IsNotEmpty()
    @IsString()
    code: string; // reset code -> to be sent on email

    @ApiProperty({name: 'newPassword', type: String})
    @IsNotEmpty()
    @IsString()
    newPassword: string;

    @ApiProperty({name: 'confirmPassword', type: String})
    @IsNotEmpty()
    @IsString()
    confirmPassword: string;
}
