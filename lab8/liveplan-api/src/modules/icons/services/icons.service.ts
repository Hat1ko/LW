import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {IconCreateDto, IconDto} from '../dto';
import {Icon} from '../models/icon.model';
import {FileInterface} from '../../../shared/file-storage/file.interface';
import {IconPack} from '../models/icon-pack.model';
import {IconFilterDto} from '../dto/req/icon-filter.dto';
import {PaginationInterface} from '../../../shared/interfaces/pagination.interface';
import {paginate} from '../../../shared/paginator/paginator';
import {IPaginationResponse} from '../../../shared/interfaces/i-pagination.response';
import {MongoId} from '../../../shared/constants/constant';
import {IconUpdateDto} from '../dto/req/icon-update.dto';
import {FileStorageService} from '../../../shared/file-storage/file-storage.service';

const randomString = require('randomstring');

@Injectable()
export class IconsService {
    constructor(
        @InjectModel('Icon')
        private iconModel: Model<Icon>,
        @InjectModel('IconPack')
        private iconPackModel: Model<IconPack>,
        private readonly fileStorageService: FileStorageService,
    ) {
    }

    async saveIcon(iconCreateDto: IconCreateDto, file: FileInterface): Promise<IconDto> {
        if (!file) {
            throw new BadRequestException('Incorrect file. File must be not empty');
        }

        if (await this.findIconByKey(iconCreateDto.key)) {
            throw new ConflictException('Icon with such key already exist');
        }

        const iconPack = await this.iconPackModel.findById(iconCreateDto.iconPackId);
        if (!iconPack) {
            throw new NotFoundException('Icon pack was not found');
        }

        let iconPictureUrl: string;
        try {
            iconPictureUrl = await this.fileStorageService.saveImage(file);
            iconCreateDto.pictureUrl = iconPictureUrl;
            const iconPack = new this.iconModel(iconCreateDto);
            return await iconPack.save();
        } catch (e) {
            if (iconPictureUrl) {
                await this.fileStorageService.removeObject(iconPictureUrl);
            }
            throw e;
        }
    }

    async findIconByKey(key: string): Promise<IconDto> {
        return this.iconModel.findOne({key});
    }

    async findAllIconsBy(iconFilterDto: IconFilterDto, paginationOptions?: PaginationInterface):
        Promise<IPaginationResponse<IconDto[]>> {
        let query = this.iconModel.find();
        if (iconFilterDto) {
            if (iconFilterDto.iconPackId) {
                query = query.where('iconPackId').equals(iconFilterDto.iconPackId);
            }
            if (iconFilterDto.key) {
                query = query.where('key').equals(iconFilterDto.key)
            }
            if (iconFilterDto.name) {
                query = query.where('name').equals(iconFilterDto.name)
            }
        }
        const icon = await paginate(query, paginationOptions);
        if (!icon) {
            throw new NotFoundException('Icons not found');
        }
        return icon;
    }

    async findIconById(id: MongoId | string): Promise<Icon> {
        const icon = await this.iconModel.findById(id);
        if (!icon) {
            throw new NotFoundException('Icon not found');
        }
        return icon;
    }

    async updateIcon(iconUpdateDto: IconUpdateDto): Promise<IconDto> {
        if (iconUpdateDto.iconPackId) {
            if (!await this.iconPackModel.findById(iconUpdateDto.iconPackId)) {
                throw new NotFoundException('Icon pack not found');
            }
        }
        const icon = await this.iconModel.findOneAndUpdate({_id: iconUpdateDto.iconId}, iconUpdateDto);
        if (!icon) {
            throw new NotFoundException('Icon not found');
        }
        return this.iconModel.findById(icon._id);
    }

    async updateIconPhoto(id: MongoId, file: FileInterface): Promise<IconDto> {
        const icon = await this.findIconById(id);
        if (!file) {
            throw new NotFoundException('File is empty');
        }
        let filePath;
        try {
            const oldFilePath = icon.pictureUrl;
            filePath = await this.fileStorageService.saveImage(file);
            icon.pictureUrl = filePath;
            await this.fileStorageService.removeObject(oldFilePath);
            return await icon.save();
        } catch (e) {
            if (filePath) {
                await this.fileStorageService.removeObject(filePath);
            }
            throw e;
        }
    }

    async deleteIcon(id: MongoId, session?): Promise<IconDto> {
        const icon = await this.iconModel.findByIdAndDelete(id, {session})
            .exec() as IconDto;
        if (!icon) {
            throw new NotFoundException('Icon not found');
        }
        await this.fileStorageService.removeObject(icon.pictureUrl);
        return icon;
    }
}
