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
import {GroupsService} from '../services/groups.service';
import {GroupCreateDto, GroupDto, GroupFilterDto, GroupUpdateDto} from '../dtos';
import {AuthGuard} from '@nestjs/passport';
import * as mongoose from 'mongoose';
import {Pagination} from '../../../shared/decorators/pagination.decorator';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {Group} from '../models/group.model';
import {groupProjections} from '../constants/constants';
import {ApiBearerAuth, ApiBody, ApiParam, ApiResponse} from '@nestjs/swagger';
import {ApiPagination} from '../../../shared/decorators/api-pagination.decorator';

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) {
    }

    @ApiBearerAuth('jwt')
    @ApiBody({type: GroupCreateDto})
    @ApiResponse({status: 201,
        description: 'Group was successfully created. Created entity is to be returned',
        type: GroupDto})
    @ApiResponse({status: 401, description: 'User credentials are invalid'})
    @ApiResponse({status: 404, description: 'User or icon weren\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Post()
    public async createGroup(@Req() req, @Body() dto: GroupCreateDto): Promise<Group> {
        return this.groupsService.createGroup(req.user.id, dto);
    }

    @ApiBearerAuth('jwt')
    @ApiBody({type: GroupUpdateDto})
    @ApiResponse({status: 201,
        description: 'Group was successfully updated. Updated entity is to be returned',
        type: GroupDto,
    })
    @ApiResponse({status: 401, description: 'User credentials are invalid'})
    @ApiResponse({status: 404, description: 'User or icon weren\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Patch()
    public async updateGroup(@Req() req, @Body() dto: GroupUpdateDto): Promise<GroupDto> {
        return this.groupsService.updateGroup(req.user.id, dto);
    }

    @ApiBearerAuth('jwt')
    @ApiParam({name: 'groupId', description: 'Group\'s objectId', type: mongoose.Types.ObjectId})
    @ApiResponse({status: 200,
        description: 'Group was successfully deleted. Deleted entity is to be returned',
        type: GroupDto})
    @ApiResponse({status: 401, description: 'User credentials are invalid'})
    @ApiResponse({status: 404, description: 'Group wasn\'t found'})
    @UseGuards(AuthGuard('jwt'))
    @Delete(':groupId')
    public async deleteGroup(@Param('groupId') groupId: string): Promise<GroupDto> {
        if (!mongoose.isValidObjectId(groupId)) {
            throw new BadRequestException('Group id must be of type ObjectId');
        }
        return this.groupsService.deleteGroupById(mongoose.Types.ObjectId(groupId));
    }

    @ApiBearerAuth('jwt')
    @ApiParam({name: 'id', description: 'Group\'s objectId', type: mongoose.Types.ObjectId})
    @ApiParam({name: 'name', description: 'Group\'s name', type: mongoose.Types.ObjectId})
    @ApiPagination()
    @ApiResponse({status: 200,
        description: 'Found groups by filters, paginated',
        type: GroupDto})
    @ApiResponse({status: 401, description: 'User credentials are invalid'})
    @UseGuards(AuthGuard('jwt'))
    @Get()
    public async findGroupWithFilter(@Req() req, @Query() filter: GroupFilterDto,
                                     @Pagination() options: PaginationInterface):
        Promise<IPaginationResponse<Group[]>> {
        return this.groupsService.findGroupWithFilter(req.user.id, options, groupProjections, filter);
    }
}
