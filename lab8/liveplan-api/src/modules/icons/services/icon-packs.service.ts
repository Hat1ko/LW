import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Model} from 'mongoose';
import {IconPackCreateDto, IconPackDto} from '../dto';
import {IconPack} from '../models/icon-pack.model';
import {IconPackFilterDto} from '../dto/req/icon-pack-filter.dto';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {paginate} from '../../../shared/paginator/paginator';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {Connections, MongoId} from '../../../shared/constants/constant';
import {Icon} from '../models/icon.model';
import {IconPackUpdateDto} from '../dto/req/icon-pack-update.dto';
import {CustomersService} from "../../users/services/customers.service";
import {IconsService} from "./icons.service";

const randomString = require('randomstring');


@Injectable()
export class IconPacksService {
    constructor(
        @InjectModel('IconPack')
        private iconPackModel: Model<IconPack>,
        @InjectModel('Icon')
        private iconModel: Model<Icon>,
        private readonly iconsService: IconsService,
        private readonly customersService: CustomersService
    ) {
    }

    async saveIconPack(iconPackCreateDto: IconPackCreateDto): Promise<IconPackDto> {
        if (await this.findIconPackByKey(iconPackCreateDto.key)) {
            throw new ConflictException('Icon pack with such key already exist');
        }
        const iconPack = new this.iconPackModel(iconPackCreateDto);
        return await iconPack.save();
    }

    async pushIconPackToCustomer(customerId: MongoId, iconPacksIds: string[]) {
        const session = await Connections[1].startSession();
        await session.startTransaction();

        const iconPacks = await this.iconPackModel.find()
            .where({_id: {$in: iconPacksIds}})
            .exec();
        if (!iconPacks || iconPacks.length < 1) {
            throw new NotFoundException('Icon packs not found');
        }
        for (const iconPack of iconPacks) {
            for (const id of iconPack.users) {
                if (String(id) == String(customerId)) {
                    await session.abortTransaction();
                    await session.endSession();
                    throw new BadRequestException(`Pack already has ${customerId} user`)
                }
            }
        }
        for (const iconPack of iconPacks) {
            iconPack.users.push(String(customerId));
            await iconPack.save({session});
        }
        await this.customersService.pushIconPackToUsers(
            iconPacks.map(iconPack => iconPack._id), customerId, session);
        await session.commitTransaction();
        await session.endSession();
        return iconPacks;
    }

    async findIconPackByKey(key: string): Promise<IconPackDto> {
        return this.iconPackModel.findOne({key});
    }

    async findIconPacksByKeys(keys: string[], session?): Promise<IconPackDto[]> {
        return this.iconPackModel.find({
            key: {$in: keys},
        }, {}, {session});
    }

    async findAllIconPacksBy(iconPackFilterDto: IconPackFilterDto, paginationOptions: PaginationInterface):
        Promise<IPaginationResponse<IconPackDto[]>> {
        let match = {
            $match: {},
        };
        if (iconPackFilterDto) {
            if (iconPackFilterDto.key) {
                match.$match['key'] = iconPackFilterDto.key;
            }
            if (iconPackFilterDto.name) {
                match.$match['name'] = iconPackFilterDto.name;
            }
            if (iconPackFilterDto.userId) {
                match.$match['users'] = {
                    $elemMatch: {
                        $eq: mongoose.Types.ObjectId(iconPackFilterDto.userId)
                    }
                }
            }
        }
        const aggregate = this.iconPackModel.aggregate(
            [
                match,
                {
                    $project: {
                        users: 0,
                        __v: 0,
                    },
                },
                {
                    $lookup: {
                        from: 'icons',
                        localField: '_id',
                        foreignField: 'iconPackId',
                        as: 'icons',
                    },
                },
            ],
        );
        return await paginate(aggregate, paginationOptions);
    }

    async findIconPackById(id: MongoId): Promise<IconPackDto> {
        const iconPack = await this.iconPackModel.findById(id);
        if (!iconPack) {
            throw new NotFoundException('Icon pack not found');
        }
        return iconPack;
    }

    async updateIconPack(iconPackUpdateDto: IconPackUpdateDto): Promise<IconPackDto> {
        const iconPack = await this.iconPackModel
            .findByIdAndUpdate(iconPackUpdateDto.iconPackId, iconPackUpdateDto);
        if (!iconPack) {
            throw new NotFoundException('Icon pack not found');
        }
        return this.iconPackModel.findById(iconPack._id);
    }

    async updateIconPacksByKeys(keys: string[], updateOperation: object, session?) {
        return this.iconPackModel.updateMany({
                key: {$in: keys},
            },
            updateOperation,
            {session},
        );
    }

    async deleteIconPack(id: MongoId): Promise<IconPackDto> {
        const session = await Connections[1].startSession();
        await session.startTransaction();

        const iconPack: IconPackDto = await this.iconPackModel
            .findByIdAndDelete(id, {session}).exec() as IconPackDto;
        if (!iconPack) {
            await session.abortTransaction();
            await session.endSession();
            throw new NotFoundException('Icon pack not found');
        }
        const icons = await this.iconsService
            .findAllIconsBy({iconPackId: iconPack._id});
        for (const iconDto of icons.docs) {
            await this.iconsService
                .deleteIcon(mongoose.Types.ObjectId(iconDto._id), session);
        }
        await this.customersService
            .deleteIconPacksFromCustomers(mongoose.Types.ObjectId(iconPack._id), session);
        await session.commitTransaction();
        await session.endSession();
        return iconPack;
    }

    async deleteUserFromIconPack(customerId: MongoId, session?): Promise<void> {
        await this.iconPackModel.updateMany(
            {users: {$in: [String(customerId)]}},
            {$pull: {users: {$in: [String(customerId)]}}},
            {session}
        );
        return;
    }
}
