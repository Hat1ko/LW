import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {UsersService} from '../services/users.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {AdminCreateDto} from '../dtos';
import {TokenResponseDto} from '../../auth/dtos';
import {ApiBody, ApiProperty, ApiResponse} from '@nestjs/swagger';
import {ApiImplicitFile} from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@Controller('admins/app')
export class AdminApplicationController {
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @ApiBody({type: AdminCreateDto})
    @ApiImplicitFile({name: 'image', required: false})
    @ApiResponse({status: 201,
        description: 'User was registered. Access and refresh tokens are to be sent', type: TokenResponseDto})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    registration(@Body() adminCreateDto: AdminCreateDto, @UploadedFile() file?): Promise<TokenResponseDto> {
        return this.usersService.saveUser(adminCreateDto, 'admin', file);
    }
}
