import {IconDto} from './icon.dto';
import {ApiProperty} from '@nestjs/swagger';

export class IconPackWithIconsDto {
    @ApiProperty({name: 'name', description: 'Icon pack\'s name', type: String})
    name: string;
    @ApiProperty({name: 'key', description: 'Icon pack\'s key', type: String})
    key: string;
    @ApiProperty({name: 'icons', description: 'Icons icon pack consists of', isArray: true, type: IconDto})
    icons: IconDto[];
}
