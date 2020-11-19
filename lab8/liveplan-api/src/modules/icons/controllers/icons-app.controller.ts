import {Controller, Get, Param, Query, UseGuards} from '@nestjs/common';
import {IconsService} from '../services/icons.service';
import {AuthGuard} from '@nestjs/passport';
import {IconFilterDto} from '../dto/req/icon-filter.dto';
import {Pagination} from '../../../shared/decorators/pagination.decorator';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {IconDto} from '../dto';
import {MongoId} from '../../../shared/constants/constant';
import {ApiBearerAuth, ApiParam, ApiProperty, ApiQuery, ApiResponse} from '@nestjs/swagger';
import * as mongoose from 'mongoose';

@Controller('icons/app')
export class IconsAppController {
    constructor(private readonly iconsService: IconsService) {
    }

    @ApiBearerAuth('jwt')
    @ApiQuery({name: 'key', description: 'Icon\'s key', type: String})
    @ApiQuery({name: 'name', description: 'Icon\'s name', type: String})
    @ApiQuery({name: 'iconPackId', description: 'Icon pack\'s objectId', type: mongoose.Types.ObjectId})
    @ApiResponse({status: 200,
        description: 'All icons where found by filters and paginated'})
    @ApiResponse({status: 401, description: 'User\'s access token is invalid'})
    @ApiResponse({status: 404, description: 'Icon wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Get('getAllBy')
    getAllIconsBy(@Query() iconFilterDto: IconFilterDto,
                  @Pagination() options: PaginationInterface): Promise<IPaginationResponse<IconDto[]>> {
        return this.iconsService.findAllIconsBy(iconFilterDto, options);
    }

    @ApiBearerAuth('jwt')
    @ApiParam({name: 'id', description: 'Icon\'s id', type: mongoose.Types.ObjectId})
    @ApiResponse({status: 200,
        description: 'Icon was found by id',
        type: IconDto})
    @ApiResponse({status: 401, description: 'User\'s access token is invalid'})
    @ApiResponse({status: 404, description: 'Icon wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Get(':id')
    getIconById(@Param('id') id: MongoId): Promise<IconDto> {
        return this.iconsService.findIconById(id);
    }
}
