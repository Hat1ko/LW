import {Body, Controller, Post, UploadedFile, UseInterceptors} from '@nestjs/common';
import {CustomerCreateDto} from '../dtos';
import {UsersService} from '../services/users.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {TokenResponseDto} from '../../auth/dtos';
import {ApiResponse} from '@nestjs/swagger';

@Controller('customers/app')
export class CustomerApplicationController {
    constructor(
        private readonly usersService: UsersService,
    ) {
    }

    @ApiResponse({status: 201,
        description: 'Customer was registered. Access and refresh token are to be returned',
        type: TokenResponseDto})
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    registration(@Body() customerCreateDto: CustomerCreateDto, @UploadedFile() file?): Promise<TokenResponseDto> {
        return this.usersService.saveUser(customerCreateDto, 'customer', file);
    }
}
