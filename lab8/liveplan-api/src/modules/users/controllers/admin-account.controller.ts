import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors,
} from '@nestjs/common';
import {AdminAccountService} from '../services/admin-account.service';
import {AuthGuard} from '@nestjs/passport';
import {RoleGuard} from '../guards/users-roles.guard';
import {Roles} from '../../../shared/decorators/users-role.decorator';
import {AdminProfileDto, AdminUpdateDto, UserDeleteDto, UserPhotoUpdateResponseDto} from '../dtos';
import {FileInterceptor} from '@nestjs/platform-express';
import * as mongoose from 'mongoose';
import {UsersService} from '../services/users.service';
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse} from '@nestjs/swagger';
import {ApiImplicitFile} from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiBearerAuth('jwt')
@ApiResponse({status: 401, description: 'User\'s jwt token is invalid'})
@ApiResponse({status: 403, description: 'User\'s role is not \'admin\''})
@Controller('admin')
export class AdminAccountController {
    constructor(
        private readonly adminAccountService: AdminAccountService,
        private readonly usersService: UsersService,
    ) {
    }

    @ApiResponse({status: 200, description: 'Admin\'s profile', type: AdminProfileDto})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Get()
    public async getProfile(@Req() req): Promise<AdminProfileDto> {
        return this.adminAccountService.getProfile(req.user.id);
    }

    @ApiParam({name: 'id', description: 'User\'s object id', type: mongoose.Types.ObjectId})
    @ApiResponse({status: 200, description: 'Admin\'s profile', type: AdminProfileDto})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Get('profile/:id')
    public async getProfileById(@Param('id') id: string): Promise<AdminProfileDto> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Group id must be of type ObjectId');
        }
        return this.adminAccountService.getProfile(mongoose.Types.ObjectId(id));
    }


    @ApiBody({type: AdminUpdateDto})
    @ApiResponse({status: 200,
        description: 'Admin\'s profile was successfully updated. Updated entity is to be sent', type: AdminProfileDto})
    @ApiResponse({status: 400, description: 'Not all required fields are available'})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Patch()
    public async updateAdmin(@Req() req, @Body() dto: AdminUpdateDto): Promise<AdminProfileDto> {
        return this.adminAccountService.update(req.user.id, dto);
    }

    @ApiImplicitFile({name: 'image'})
    @ApiResponse({status: 200, description: 'User\'s photo was successfully updated', type: AdminProfileDto})
    @ApiResponse({status: 400, description: 'Photo is not specified'})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Patch('change-photo')
    @UseInterceptors(FileInterceptor('image'))
    public async changePhoto(@Req() req, @UploadedFile() file: any):
        Promise<UserPhotoUpdateResponseDto> {
        return this.usersService.updateUserPhoto(req.user.id, file);
    }

    @ApiResponse({status: 200,
        description: 'User\'s isDeleted was set to true. Updated entity is to be sent', type: AdminProfileDto})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Delete()
    public async deleteAdmin(@Req() req): Promise<AdminProfileDto> {
        return this.adminAccountService.setAdminDeleteStatus(req.user.id, true);
    }

    @ApiResponse({status: 200,
        description: 'User was successfully deleted. Deleted entity is to be sent', type: UserDeleteDto})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Delete('user/:userId')
    public async deleteUser(@Param('userId') userId: string): Promise<UserDeleteDto> {
        if (!mongoose.isValidObjectId(userId)) {
            throw new BadRequestException('Insert user\'s objectId');
        }
        return this.usersService.deleteUser(mongoose.Types.ObjectId(userId));
    }
}
