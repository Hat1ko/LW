import {Controller, Get, Query, UseGuards} from '@nestjs/common';
import {UsersStatisticsService} from '../services/users-statistics.service';
import {AuthGuard} from '@nestjs/passport';
import {RoleGuard} from '../../users/guards/users-roles.guard';
import {Roles} from '../../../shared/decorators/users-role.decorator';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {CustomerInfoDto} from '../../users/dtos';
import {TimePeriodDto} from '../dtos/req/time-period.dto';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {Pagination} from '../../../shared/decorators/pagination.decorator';
import {IconDto, IconPackDto} from '../../icons/dto';
import {IconPackStatisticsService} from '../services/icon-pack-statistics.service';
import {IconsStatisticsService} from '../services/icons-statistics.service';
import {ApiBearerAuth, ApiProperty, ApiQuery, ApiResponse} from '@nestjs/swagger';
import {ApiPagination} from '../../../shared/decorators/api-pagination.decorator';

@ApiBearerAuth('jwt')
@ApiResponse({status: 401, description: 'User\'s jwt token is invalid'})
@ApiResponse({status: 403, description: 'User\'s role is not \'admin\''})
@UseGuards(AuthGuard('jwt'), RoleGuard)
@Controller('statistics')
export class StatisticsController {
    constructor(
        private readonly userStatisticsService: UsersStatisticsService,
        private readonly iconPackStatisticsService: IconPackStatisticsService,
        private readonly iconsStatisticsService: IconsStatisticsService,
    ) {
    }

    @ApiResponse({status: 200, description: 'Amount of active users', type: Number})
    @Roles('admin')
    @Get('amOfActUsrs')
    getAmountOfActiveUsers(): Promise<number> {
        return this.userStatisticsService.getAmountOfActiveUsers();
    }

    @ApiPagination()
    @ApiQuery({name: 'dateAfter', description: 'New users after inserted date', type: Date})
    @ApiQuery({name: 'dateBefore', description: 'New users before inserted date', type: Date})
    @ApiResponse({status: 200, description: 'Found and paginated new users by time period successfully'})
    @Roles('admin')
    @Get('newUsrsFromPeriod')
    getNewUsersByTimePeriod(@Query() timePeriodDto: TimePeriodDto,
                            @Pagination() paginationOptions: PaginationInterface):
        Promise<IPaginationResponse<CustomerInfoDto[]>> {
        return this.userStatisticsService.getNewUsersByTimePeriod(timePeriodDto, paginationOptions);
    }

    @ApiPagination()
    @ApiResponse({status: 200, description: 'Found and paginated the most popular icon pack'})
    // to see unpopular packs add to params 'sort': '-countOfUsers' (add this to documentation)
    @Roles('admin')
    @Get('popularPacks')
    getTheMostPopularPack(@Pagination() paginationOptions: PaginationInterface)
        : Promise<IPaginationResponse<IconPackDto[]>> {
        return this.iconPackStatisticsService.getTheMostUsedIconPacks(paginationOptions);
    }

    @ApiPagination()
    @ApiResponse({status: 200, description: 'Found and paginated the most popular icons'})
    // to see unpopular icons add to params 'sort': '-countOfGroups' (add this to documentation)
    @Roles('admin')
    @Get('popularIcons')
    getTheMostPopularIcons(@Pagination() paginationOptions: PaginationInterface)
        : Promise<IPaginationResponse<IconDto[]>> {
        return this.iconsStatisticsService.getTheMostUsedIcons(paginationOptions);
    }
}
