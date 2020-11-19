import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Param,
    Patch,
    Post,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {IconsService} from '../services/icons.service';
import {IconCreateDto, IconDto} from '../dto';
import {FileInterceptor} from '@nestjs/platform-express';
import {AuthGuard} from '@nestjs/passport';
import {Roles} from '../../../shared/decorators/users-role.decorator';
import {plainToClass} from 'class-transformer';
import {validateOrReject} from 'class-validator';
import {RoleGuard} from '../../users/guards/users-roles.guard';
import {MongoId} from '../../../shared/constants/constant';
import {IconUpdateDto} from '../dto/req/icon-update.dto';
import {ApiBearerAuth, ApiBody, ApiParam, ApiProperty, ApiResponse} from '@nestjs/swagger';
import {ApiImplicitFile} from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';
import * as mongoose from 'mongoose';

@Controller('icons/admin')
export class IconsAdminController {
    constructor(private readonly iconsService: IconsService) {
    }

    @ApiBearerAuth('jwt')
    @ApiBody({type: IconCreateDto})
    @ApiImplicitFile({name: 'image'})
    @ApiResponse({status: 201,
        description: 'Icon has been saved. Saved entity is to be returned',
        type: IconDto})
    @ApiResponse({status: 400,
        description: 'Fields are incorrect or not all of required are inserted'})
    @ApiResponse({status: 401, description: 'User\'s access token is invalid'})
    @ApiResponse({status: 403, description: 'User doesn\'t have \'admin\' role'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Post('')
    @UseInterceptors(FileInterceptor('image'))
    async saveIcon(@Body() iconCreateDto, @UploadedFile() file?): Promise<IconDto> {
        let createIconDto: IconCreateDto;
        try {
            createIconDto = plainToClass(IconCreateDto, JSON.parse(iconCreateDto['iconCreateDto']));
            await validateOrReject(createIconDto);
        } catch (e) {
            throw new BadRequestException(`Post values incorrect: ${JSON.stringify(e)}`);
        }
        return this.iconsService.saveIcon(createIconDto, file);
    }

    @ApiBearerAuth('jwt')
    @ApiBody({type: IconUpdateDto})
    @ApiResponse({status: 200,
        description: 'Icon has been updated. Saved entity is to be returned',
        type: IconDto})
    @ApiResponse({status: 400, description: 'Not all required fields are available'})
    @ApiResponse({status: 401, description: 'User\'s access token is invalid'})
    @ApiResponse({status: 403, description: 'User doesn\'t have \'admin\' role'})
    @ApiResponse({status: 404, description: 'Icon wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Patch()
    async updateIcon(@Body() iconUpdateDto: IconUpdateDto): Promise<IconDto> {
        return this.iconsService.updateIcon(iconUpdateDto);
    }

    @ApiBearerAuth('jwt')
    @ApiParam({name: 'id',
        type: mongoose.Types.ObjectId,
        description: 'Icon\'s objectId'})
    @ApiImplicitFile({name: 'image'})
    @ApiResponse({status: 200,
        description: 'Icon photo has been updated. Saved entity is to be returned',
        type: IconDto})
    @ApiResponse({status: 400, description: 'Not all required fields are available'})
    @ApiResponse({status: 401, description: 'User\'s access token is invalid'})
    @ApiResponse({status: 403, description: 'User doesn\'t have \'admin\' role'})
    @ApiResponse({status: 404, description: 'Icon wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @UseInterceptors(FileInterceptor('image'))
    @Patch('photo/:id')
    async updateIconPhoto(@Param('id') id: MongoId, @UploadedFile() file): Promise<IconDto> {
        return this.iconsService.updateIconPhoto(id, file);
    }

    @ApiBearerAuth('jwt')
    @ApiParam({name: 'id',
        type: mongoose.Types.ObjectId,
        description: 'Icon\'s id'})
    @ApiResponse({status: 200,
        description: 'Icon photo has been deleted. Deleted entity is to be returned',
        type: IconDto})
    @ApiResponse({status: 400, description: 'Not all required fields are available'})
    @ApiResponse({status: 401, description: 'User\'s access token is invalid'})
    @ApiResponse({status: 403, description: 'User doesn\'t have \'admin\' role'})
    @ApiResponse({status: 404, description: 'Icon wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Delete(':id')
    async deleteIcon(@Param('id') id: MongoId): Promise<IconDto> {
        return this.iconsService.deleteIcon(id);
    }
}
