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
import {CustomersAccountService} from '../services/customers-account.service';
import {FileInterceptor} from '@nestjs/platform-express';
import {CustomerProfileDto, CustomerUpdateDto, UserPhotoUpdateResponseDto} from '../dtos';
import {AuthGuard} from '@nestjs/passport';
import {Roles} from '../../../shared/decorators/users-role.decorator';
import {RoleGuard} from '../guards/users-roles.guard';
import * as mongoose from 'mongoose';
import {UsersService} from '../services/users.service';
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse} from '@nestjs/swagger';
import {ApiImplicitFile} from '@nestjs/swagger/dist/decorators/api-implicit-file.decorator';

@ApiBearerAuth('jwt')
@ApiResponse({status: 401, description: 'User\'s jwt token is invalid'})
@ApiResponse({status: 403, description: 'User\'s role isn\'t \'customer\''})
@Controller('customer')
export class CustomerAccountController {
    constructor(
        private readonly customersAccountService: CustomersAccountService,
        private readonly usersService: UsersService,
    ) {
    }


    @ApiResponse({status: 404, type: 'User wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('customer')
    @Get()
    public async getProfile(@Req() req): Promise<CustomerProfileDto> {
        return this.customersAccountService.getProfile(req.user.id);
    }

    @ApiParam({name: 'id', description: 'User\'s objectId', type: mongoose.Types.ObjectId})
    @ApiResponse({status: 200, description: 'Customer\'s profile', type: CustomerProfileDto})
    @ApiResponse({status: 400, description: 'ObjectId is not 12 or 24 bit string'})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('customer')
    @Get('profile/:id')
    public async getProfileById(@Param('id') id: string): Promise<CustomerProfileDto> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Group id must be of type ObjectId');
        }
        return this.customersAccountService.getProfile(mongoose.Types.ObjectId(id));
    }

    @ApiBody({type: CustomerUpdateDto})
    @ApiResponse({status: 400, description: 'Not all required fields are available'})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('customer')
    @Patch()
    public async updateCustomer(@Req() req, @Body() dto: CustomerUpdateDto): Promise<CustomerProfileDto> {
        return this.customersAccountService.update(req.user.id, dto);
    }

    @ApiImplicitFile({name: 'image'})
    @ApiResponse({status: 200,
        description: 'Customer\'s photo was updated successfully',
        type: UserPhotoUpdateResponseDto})
    @ApiResponse({status: 400, description: 'Photo isn\'t specified'})
    @ApiResponse({status: 404, description: 'Customer wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('customer')
    @Patch('change-photo')
    @UseInterceptors(FileInterceptor('image'))
    public async changePhoto(@Req() req, @UploadedFile() file):
        Promise<UserPhotoUpdateResponseDto> {
        return this.usersService.updateUserPhoto(req.user.id, file);
    }

    @ApiResponse({status: 404, description: 'Customer wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('customer')
    @Delete()
    public async deleteCustomer(@Req() request): Promise<CustomerProfileDto> {
        return this.customersAccountService.setCustomerDeleteStatus(request.user.id, true);
    }
}
