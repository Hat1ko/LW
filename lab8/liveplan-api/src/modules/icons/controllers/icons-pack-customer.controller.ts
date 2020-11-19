import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {IconPacksService} from '../services/icon-packs.service';
import {AuthGuard} from '@nestjs/passport';
import {RoleGuard} from '../../users/guards/users-roles.guard';
import {Roles} from '../../../shared/decorators/users-role.decorator';
import {Pagination} from '../../../shared/decorators/pagination.decorator';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {IconPackPushCustomer} from '../dto/req/icon-pack-push-customer';
import {ApiBearerAuth, ApiBody, ApiResponse} from '@nestjs/swagger';
import {ApiPagination} from '../../../shared/decorators/api-pagination.decorator';

@Controller('icons-pack/customer')
export class IconsPackCustomerController {
    constructor(private readonly iconPacksService: IconPacksService) {
    }

    @ApiBearerAuth('jwt')
    @ApiBody({type: IconPackPushCustomer})
    @ApiResponse({status: 201, description: 'Icon\'s were pushed to customer successfully'})
    @ApiResponse({status: 400,
        description: 'Not all required fields are inserted correctly / User already has this icon pack'})
    @ApiResponse({status: 401, description: 'User\'s jwt token is invalid'})
    @ApiResponse({status: 403, description: 'User\'s role isn\'t \'customer\''})
    @ApiResponse({status: 404, description: 'Icon pack wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('customer')
    @Post()
    pushIconPackToCustomer(@Req() req, @Body() iconPackPushCustomer: IconPackPushCustomer) {
        return this.iconPacksService.pushIconPackToCustomer(req.user.id, iconPackPushCustomer.iconPacksIds);
    }

    @ApiBearerAuth('jwt')
    @ApiPagination()
    @ApiResponse({status: 200,
        description: 'Found and paginated all user\'s icon packs successfully'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('customer')
    @Get()
    getIconPacksWithIcons(@Req() req, @Pagination() paginationOptions: PaginationInterface) {
        return this.iconPacksService.findAllIconPacksBy({userId: req.user.id}, paginationOptions);
    }
}
