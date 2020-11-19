import {Body, Controller, Delete, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {IconPacksService} from '../services/icon-packs.service';
import {AuthGuard} from '@nestjs/passport';
import {Roles} from '../../../shared/decorators/users-role.decorator';
import {IconDto, IconPackCreateDto, IconPackDto} from '../dto';
import {RoleGuard} from '../../users/guards/users-roles.guard';
import {IconPackUpdateDto} from '../dto/req/icon-pack-update.dto';
import {MongoId} from '../../../shared/constants/constant';
import {IconPackPushAdmin} from '../dto/req/icon-pack-push-admin';
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse} from '@nestjs/swagger';

@ApiBearerAuth('jwt')
@ApiResponse({status: 401, description: 'User\'s access token is invalid'})
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('icons-pack/admin')
export class IconsPackAdminController {
    constructor(private readonly iconPacksService: IconPacksService) {
    }

    @ApiBody({type: IconPackCreateDto})
    @ApiResponse({status: 200,
        description: 'All icons where found by filters and paginated',
        type: IconPackDto})
    @ApiResponse({status: 403, description: 'User doesn\'t have \'admin\' role'})
    @ApiResponse({status: 404, description: 'Icon pack wasn\'t found'})
    @Roles('admin')
    @Post()
    saveIconPack(@Body() iconPackCreateDto: IconPackCreateDto): Promise<IconPackDto> {
        return this.iconPacksService.saveIconPack(iconPackCreateDto);
    }

    @ApiBody({type: IconPackPushAdmin})
    @ApiResponse({status: 200,
        description: 'Icon pack was successfully added. Saved entity is to be returned',
        type: IconPackDto})
    @ApiResponse({status: 403, description: 'User doesn\'t have \'admin\' role'})
    @ApiResponse({status: 404, description: 'Icon pack wasn\'t found'})
    @Roles('admin')
    @Post('pushPack')
    pushIconPackToCustomer(@Body() iconPackPushAdmin: IconPackPushAdmin) {
        return this.iconPacksService
            .pushIconPackToCustomer(iconPackPushAdmin.customerId, iconPackPushAdmin.iconPacksIds);
    }

    @ApiBody({type: IconPackUpdateDto})
    @ApiResponse({status: 200,
        description: 'Icon pack was successfully updated. Saved entity is to be returned',
        type: IconPackDto})
    @ApiResponse({status: 403, description: 'User doesn\'t have \'admin\' role'})
    @ApiResponse({status: 404, description: 'Icon pack wasn\'t found'})
    @Roles('admin')
    @Patch()
    updateIconPack(@Body() iconPackUpdateDto: IconPackUpdateDto): Promise<IconPackDto> {
        return this.iconPacksService.updateIconPack(iconPackUpdateDto);
    }

    @ApiParam({name: 'id', description: 'IconPack\'s objectId'})
    @ApiResponse({status: 200,
        description: 'Icon pack was successfully deleted. Deleted entity is to be returned',
        type: IconPackDto})
    @ApiResponse({status: 403, description: 'User doesn\'t have \'admin\' role'})
    @ApiResponse({status: 404, description: 'Icon pack wasn\'t found'})
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles('admin')
    @Delete(':id')
    deleteIconPack(@Param('id') id: MongoId): Promise<IconPackDto> {
        return this.iconPacksService.deleteIconPack(id);
    }
}
