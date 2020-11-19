import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class VerifyResetPasswordCodeDto {
    @ApiProperty({name: 'code', type: String, description: 'Secret code'})
    @IsNotEmpty()
    @IsString()
    code: string; // reset code -> to be sent on email
}
