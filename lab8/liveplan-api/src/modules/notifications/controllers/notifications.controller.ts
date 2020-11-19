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
import {NotificationsService} from '../services/notifications.service';
import {AuthGuard} from '@nestjs/passport';
import {
    NotificationCreateDto,
    NotificationDto,
    NotificationFilterDto,
    NotificationUpdateDto,
    SubTaskDeleteDto,
} from '../dtos';
import * as mongoose from 'mongoose';
import {Pagination} from '../../../shared/decorators/pagination.decorator';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {notificationProjections} from '../constants/constants';
import {ApiBearerAuth, ApiBody, ApiParam, ApiQuery, ApiResponse} from '@nestjs/swagger';
import {ApiPagination} from '../../../shared/decorators/api-pagination.decorator';

@ApiBearerAuth('jwt')
@ApiResponse({status: 401, description: 'User\'s jwt token is invalid'})
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationService: NotificationsService) {
    }

    @ApiBody({type: NotificationCreateDto})
    @ApiResponse({status: 201,
        description: 'Notification was created successfully. Created notification is to be returned',
        type: NotificationDto})
    @ApiResponse({status: 400, description: 'Not all required fields are available'})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @ApiResponse({status: 404, description: 'Group wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async createNotification(@Req() req, @Body() dto: NotificationCreateDto): Promise<NotificationDto> {
        return await this.notificationService.createNotification(req.user.id, dto);
    }

    @ApiBody({type: NotificationUpdateDto})
    @ApiResponse({status: 200,
        description: 'Notification was successfully updated. Updated notification is to be returned',
        type: NotificationDto})
    @ApiResponse({status: 400, description: 'Not all required fields are available'})
    @ApiResponse({status: 404, description: 'Notification wasn\'t found'})
    @ApiResponse({status: 404, description: 'User wasn\'t found'})
    @ApiResponse({status: 404, description: 'Group wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Patch()
    public async updateNotification(@Req() req, @Body() dto: NotificationUpdateDto): Promise<NotificationDto> {
        return await this.notificationService.update(req.user.id, dto);
    }

    @ApiPagination()
    @ApiQuery({name: 'id', description: 'Notification\'s objectId', type: mongoose.Types.ObjectId})
    @ApiQuery({name: 'name', description: 'Notification\'s name', type: String})
    @ApiQuery({name: 'fromDate',
        description: 'Notification\'s ISODate. Search is done from this date', type: Date})
    @ApiQuery({name: 'toDate',
        description: 'Notification\'s ISODate. Search is done up to this date', type: Date})
    @ApiQuery({name: 'group',
        description: 'Notification\'s group objectId', type: mongoose.Types.ObjectId})
    @ApiQuery({name: 'remind', description: 'Notification\'s remind status', type: Boolean})
    @ApiQuery({name: 'important', description: 'Notification\'s important status', type: Boolean})
    @ApiQuery({name: 'isFavorite', description: 'Notification\'s isFavorite status', type: Boolean})
    @ApiQuery({name: 'status', description: 'Notification\'s execution status', type: Boolean})
    @ApiResponse({status: 200, description: 'Found and paginated by filter successfully'})
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async findNotificationsWithFilter(@Req() req, @Query() filter: NotificationFilterDto,
                                             @Pagination() options: PaginationInterface):
        Promise<IPaginationResponse<NotificationDto[]>> {
        return this.notificationService.findNotificationsWithFilters(
            req.user.id, options, notificationProjections, filter);
    }

    @ApiBody({type: SubTaskDeleteDto})
    @ApiResponse({status: 200,
        description: 'Sub tasks were deleted successfully. Updated notification is to be returned',
        type: NotificationDto})
    @ApiResponse({status: 400, description: 'Not all required fields were inserted'})
    @ApiResponse({status: 404, description: 'Notification wasn\'t found'})
    @ApiResponse({status: 404, description: 'Sub task wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Delete('sub-tasks')
    public async deleteSubTasksById(@Req() req, @Body() dto: SubTaskDeleteDto): Promise<NotificationDto> {
        return this.notificationService.deleteSubTaskById(req.user.id, dto);
    }

    @ApiParam({name: 'notificationId', description: 'Notification\'s ObjectId that is to be deleted'})
    @ApiResponse({status: 200,
        description: 'Notification was deleted successfully. Deleted entity is to be returned'})
    @ApiResponse({status: 404, description: 'Notification wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Delete(':notificationId')
    public async deleteNotification(@Param('notificationId') notificationId: string): Promise<NotificationDto> {
        if (!mongoose.isValidObjectId(notificationId)) {
            throw new BadRequestException('Group id must be of type ObjectId');
        }
        return this.notificationService.deleteNotification(mongoose.Types.ObjectId(notificationId));
    }
}
