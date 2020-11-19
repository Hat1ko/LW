import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

export class TokenResponseDto {
    @ApiProperty({name: 'accessToken', type: String})
    accessToken: string;
    @ApiPropertyOptional({name: 'refreshToken', type: String})
    refreshToken?: string;
}
