import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {IconPacksService} from '../services/icon-packs.service';
import {AuthGuard} from '@nestjs/passport';
import {IconPackFilterDto} from '../dto/req/icon-pack-filter.dto';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {IconPackDto} from '../dto';
import {Pagination} from '../../../shared/decorators/pagination.decorator';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {MongoId} from '../../../shared/constants/constant';
import {ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Controller('icons-pack/app')
export class IconsPackAppController {
    constructor(private readonly iconPacksService: IconPacksService) {
    }

    @ApiBearerAuth('jwt')
    @ApiBody({type: IconPackFilterDto})
    @ApiResponse({status: 200,
        description: 'Icon packs were filtered and paginated'})
    @ApiResponse({status: 401, description: 'User\'s access token is invalid'})
    @UseGuards(AuthGuard('jwt'))
    @Get('getAllBy')
    getAllIconsBy(@Query() iconPackFilterDto: IconPackFilterDto,
                  @Pagination() paginationOptions: PaginationInterface):
        Promise<IPaginationResponse<IconPackDto[]>> {
        return this.iconPacksService.findAllIconPacksBy(iconPackFilterDto, paginationOptions);
    }

    @ApiBearerAuth('jwt')
    @ApiQuery({name: 'id', description: 'Icon\'s objectId', type: mongoose.Types.ObjectId})
    @ApiResponse({status: 200,
        description: 'Icon pack was found',
        type: IconPackDto})
    @ApiResponse({status: 401, description: 'User\'s access token is invalid'})
    @ApiResponse({status: 404, description: 'Icon pack wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getIconById(@Param('id') id: MongoId): Promise<IconPackDto> {
        return this.iconPacksService.findIconPackById(id);
    }
}
