import {ApiProperty} from '@nestjs/swagger';

export class TokenPayload {
    @ApiProperty({name: 'email', type: String})
    email: string;
    @ApiProperty({name: 'sub', type: String})
    sub: string;
}
