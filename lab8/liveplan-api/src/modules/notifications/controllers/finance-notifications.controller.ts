import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UseGuards,
} from '@nestjs/common';
import {FinanceNotificationsService} from '../services/finance-notifications.service';
import {AuthGuard} from '@nestjs/passport';
import {
    FinanceNotificationCreateDto,
    FinanceNotificationDto,
    FinanceNotificationFilterDto,
    FinanceNotificationUpdateDto,
} from '../dtos';
import {Pagination} from '../../../shared/decorators/pagination.decorator';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import * as mongoose from 'mongoose';
import {ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse} from '@nestjs/swagger';
import {ApiPagination} from '../../../shared/decorators/api-pagination.decorator';

@ApiBearerAuth('jwt')
@ApiResponse({status: 401, description: 'User\'s jwt token is invalid'})
@Controller('finance-notifications')
export class FinanceNotificationsController {
    constructor(
        private readonly financeNotificationsService: FinanceNotificationsService,
    ) {
    }

    @ApiBody({type: FinanceNotificationCreateDto})
    @ApiResponse({status: 201, description: 'Finance notification was created', type: FinanceNotificationDto})
    @ApiResponse({status: 400, description: 'Not all required fields are available.'})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @ApiResponse({status: 404, description: 'Group wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async createFinanceNotification(@Req() req, @Body() dto: FinanceNotificationCreateDto):
        Promise<FinanceNotificationDto> {
        return this.financeNotificationsService.createFinanceNotification(req.user.id, dto);
    }

    @ApiBody({type: FinanceNotificationUpdateDto})
    @ApiResponse({status: 201, description: 'Finance notification was updated'})
    @ApiResponse({status: 400, description: 'Not all required fields are available'})
    @ApiResponse({status: 404, description: 'Finance notification wasn\'t found by objectId'})
    @UseGuards(AuthGuard('jwt'))
    @Patch()
    public async updateFinanceNotification(@Req() req, @Body() dto: FinanceNotificationUpdateDto):
        Promise<FinanceNotificationDto> {
        return this.financeNotificationsService.update(req.user.id, dto);
    }

    @ApiPagination()
    @ApiQuery({name: 'id', description: 'Finance notification\'s objectId', type: mongoose.Types.ObjectId})
    @ApiQuery({name: 'name', description: 'Finance notification\'s name', type: String})
    @ApiQuery({name: 'fromDate',
        description: 'Finance notification\'s ISODate. Search is done from this date', type: Date})
    @ApiQuery({name: 'toDate',
        description: 'Finance notification\'s ISODate. Search is done up to this date', type: Date})
    @ApiQuery({name: 'group',
        description: 'Finance Notification\'s group objectId', type: mongoose.Types.ObjectId})
    @ApiQuery({name: 'remind', description: 'Finance notification\'s remind status', type: Boolean})
    @ApiQuery({name: 'important', description: 'Finance notification\'s important status', type: Boolean})
    @ApiQuery({name: 'isFavorite', description: 'Finance notification\'s isFavorite status', type: Boolean})
    @ApiQuery({name: 'status', description: 'Finance notification\'s execution status', type: Boolean})
    @ApiQuery({name: 'fromAmount',
        description: 'Finance notification\'s amount. Search is done from this amount', type: Number})
    @ApiQuery({name: 'toAmount',
        description: 'Finance notification\'s amount. Search is done up to this date', type: Number})
    @ApiResponse({status: 200, description: 'Found and paginated by filter successfully'})
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async findFinanceNotificationsWithFilter(@Req() req,
                                                    @Query() filter: FinanceNotificationFilterDto,
                                                    @Pagination() options: PaginationInterface):
        Promise<IPaginationResponse<FinanceNotificationDto[]>> {
        return this.financeNotificationsService.findWithFilters(req.user.id, filter, options);
    }

    @ApiParam({name: 'notificationId',
        description: 'ObjectId of finance notification whose periodicity is to be deleted',
        type: mongoose.Types.ObjectId})
    @ApiResponse({status: 200,
        description: 'Periodicity is deleted successfully. Updated finance notification is to return',
        type: FinanceNotificationDto})
    @ApiResponse({status: 404, description: 'Finance notification is not found'})
    @UseGuards(AuthGuard('jwt'))
    @Delete('periodicity/:notificationId')
    public async deletePeriodicityById(@Param('notificationId') id: string):
        Promise<FinanceNotificationDto> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Group id must be of type ObjectId');
        }
        return this.financeNotificationsService.deletePeriodicityById(mongoose.Types.ObjectId(id));
    }

    @ApiParam({name: 'id',
        description: 'ObjectId of finance notification that is to be deleted',
        type: mongoose.Types.ObjectId})
    @ApiResponse({status: 200,
        description: 'FinanceNotification is deleted successfully. Deleted financeNotification is to be returned',
        type: FinanceNotificationDto})
    @ApiResponse({status: 404, description: 'Finance notification wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Delete(':id')
    public async deleteFinanceNotification(@Param('id') id: string):
        Promise<FinanceNotificationDto> {
        if (!mongoose.isValidObjectId(id)) {
            throw new BadRequestException('Group id must be of type ObjectId');
        }
        return this.financeNotificationsService.deleteFinanceNotification(mongoose.Types.ObjectId(id));
    }
}
