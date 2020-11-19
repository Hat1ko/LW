import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class RefreshTokenDto {
    @ApiProperty({name: 'token', type: String, description: 'Refresh token'})
    @IsNotEmpty()
    @IsString()
    token: string;
}
