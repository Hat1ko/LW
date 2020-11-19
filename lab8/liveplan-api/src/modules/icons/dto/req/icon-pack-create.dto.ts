import {IsNotEmpty, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class IconPackCreateDto {
    @ApiProperty({name: 'name', description: 'Name of new Icon pack', type: String})
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({name: 'key', description: 'Key of new Icon pack', type: String})
    @IsNotEmpty()
    @IsString()
    key: string;
}
