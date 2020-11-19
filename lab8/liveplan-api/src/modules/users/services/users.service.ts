import {BadRequestException, ConflictException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import {Model} from 'mongoose';
import {User} from '../models/user';
import {FileStorageService} from '../../../shared/file-storage/file-storage.service';
import {UserCreateDto, UserDeleteDto, UserDto, UserPhotoUpdateResponseDto} from '../dtos';
import {AuthService} from '../../auth/services/auth.service';
import {TokenResponseDto} from '../../auth/dtos';
import {CustomerInfo} from '../models/customer-info.model';
import {AdminInfo} from '../models/admin-info.model';
import {FileInterface} from '../../../shared/file-storage/file.interface';
import {Connections, defaultPacks, MongoId} from '../../../shared/constants/constant';
import {IconPacksService} from '../../icons/services/icon-packs.service';
import {GroupsService} from '../../groups/services/groups.service';
import {FinanceNotificationsService} from '../../notifications/services/finance-notifications.service';
import {NotificationsService} from '../../notifications/services/notifications.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel('CustomerInfo')
        private customerModel: Model<CustomerInfo>,
        @InjectModel('AdminInfo')
        private adminModel: Model<AdminInfo>,
        @InjectModel('User')
        private userModel: Model<User>,
        private readonly iconPacksService: IconPacksService,
        private readonly fileStorageService: FileStorageService,
        private readonly authService: AuthService,
        private readonly groupsService: GroupsService,
        private readonly notificationsService: NotificationsService,
        private readonly financeNotificationsService: FinanceNotificationsService,
    ) {
    }

    async saveUser(userCreateDto: UserCreateDto, role?: string, file?: FileInterface): Promise<TokenResponseDto> {
        if (userCreateDto.password !== userCreateDto.confirmPassword) {
            throw new BadRequestException('Passwords must match');
        }
        if (await this.findUserByEmail(userCreateDto.email)) {
            throw new ConflictException('User with such email already exist');
        }
        userCreateDto.role = role;
        let savedUser: UserDto;
        try {
            if (file) {
                userCreateDto.photoUrl = await this.fileStorageService.saveImage(file);
            }
            let user;

            const session = await Connections[1].startSession();
            await session.startTransaction();

            if (role === 'admin') {
                user = new this.adminModel(userCreateDto);
            } else if (role === 'customer') {
                user = new this.customerModel(userCreateDto);
                const iconPacks = await this.iconPacksService.findIconPacksByKeys(defaultPacks, session);
                for (const iconPack of iconPacks) {
                    user.iconPacks.push(mongoose.Types.ObjectId(iconPack._id));
                }
            }

            await user.hashPassword(user.password);
            savedUser = await user.save({session});
            await this.iconPacksService.updateIconPacksByKeys(defaultPacks, {
                $push: {users: String(savedUser._id)},
            }, session);
            await session.commitTransaction();
            await session.endSession();
        } catch (e) {
            if (userCreateDto.photoUrl) {
                await this.fileStorageService.removeObject(userCreateDto.photoUrl);
            }
            throw e;
        }
        return await this.authService.login(savedUser._id, savedUser.email);
    }

    public async findUserById(userId: MongoId): Promise<UserDto> {
        const user = await this.userModel
            .findOne({_id: userId, isDeleted: false}).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    public async updateUserPhoto(userId: MongoId, file: FileInterface)
        : Promise<UserPhotoUpdateResponseDto> {
        const user = await this.findUserById(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        if (!file) {
            throw new NotFoundException('File not found');
        }
        let filePath;
        let savedUser;
        try {
            filePath = await this.fileStorageService.saveImage(file);
            if (user.photoUrl) {
                await this.fileStorageService.removeObject(user.photoUrl);
            }
            user.photoUrl = filePath;
            savedUser = await this.userModel.create(user);
            await savedUser.save();
        } catch (e) {
            if (filePath) {
                await this.fileStorageService.removeObject(filePath);
            }
            throw e;
        }
        return {userId: savedUser.id, photoUrl: savedUser.photoUrl} as UserPhotoUpdateResponseDto;
    }

    async deleteUser(userId: MongoId): Promise<UserDeleteDto> {
        const session = await Connections[1].startSession();
        await session.startTransaction();

        const user = await this.userModel.findOne({_id: userId, isDeleted: false}, {}, {session}).exec();
        if (!user) {
            throw new NotFoundException('User not found');
        }
        user.isDeleted = true;
        await user.save({session});
        await this.iconPacksService.deleteUserFromIconPack(user._id, session);
        await this.financeNotificationsService.deleteAllFinanceNotifications(user._id, session);
        await this.notificationsService.deleteAllNotifications(user._id, session);
        await session.commitTransaction();
        await session.endSession();
        return {userId: user.id, isDeleted: user.isDeleted} as UserDeleteDto;
    }

    async findUserByEmail(email: string): Promise<UserDto> {
        return this.userModel.findOne({email, isDeleted: false});
    }
}
