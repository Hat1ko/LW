import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {ResetPasswordStartDto, TokenResponseDto, VerifyResetPasswordCodeDto, VerifyResetPasswordDto} from '../dtos';
import {TokenService} from './token.service';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {randomStringGenerator} from '@nestjs/common/utils/random-string-generator.util';
import {KeyValueStorageService} from '../../../shared/key-value-storage/key-value-storage.service';
import {MailService} from '../../../shared/email/email.service';
import {User} from '../../users/models/user';
import {MongoId} from '../../../shared/constants/constant';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        private readonly tokenService: TokenService,
        private readonly keyValueStorageStorage: KeyValueStorageService,
        private readonly mailService: MailService,
    ) {
    }

    public async validateUser(email: string, inputPassword: string): Promise<any> {
        const user: User = await this.userModel.findOne({email, isDeleted: false}).exec();

        if (!user) {
            return false;
        }

        if (!await user.comparePasswords(inputPassword)) {
            return false;
        }

        return user;
    }

    public async login(id: MongoId, email: string): Promise<TokenResponseDto> {
        const accessToken: string = this.tokenService.createJwtToken(id.toHexString(), email);
        const refreshToken: string = this.tokenService.createJwtToken(id.toHexString(), email);

        await this.tokenService.saveRefreshToken(refreshToken, id);

        return {accessToken, refreshToken} as TokenResponseDto;
    }

    public async getAccessToken(refreshToken: string): Promise<TokenResponseDto> {
        const user: User = await this.userModel.findOne({
            refreshTokens: refreshToken,
            isDeleted: false,
        });

        if (!user) {
            throw new NotFoundException('No user was found');
        }

        const newAccessToken: string = this.tokenService.createJwtToken(
            user._id.toHexString(),
            user.email);

        return {accessToken: newAccessToken} as TokenResponseDto;
    }

    public async resetPasswordStart(credentials: ResetPasswordStartDto): Promise<void> {
        const user: User = await this.userModel.findOne({
            email: credentials.email,
            isDeleted: false,
        }).exec();

        if (!user) {
            throw new NotFoundException('No user was found');
        }

        const resetCode: string = randomStringGenerator().toString().substring(4, 12).toUpperCase();

        await this.keyValueStorageStorage.set(resetCode, user.email);
        await this.mailService.send({
            to: user.email,
            subject: 'Password reset',
            text: 'Your code to reset password: ' + resetCode,
        });
        return;
    }

    public async checkCodeForReset(credentials: VerifyResetPasswordCodeDto): Promise<boolean> {
        const resetCode: string = await this.keyValueStorageStorage.get(credentials.code);
        return !!resetCode;
    }

    public async resetPassword(credentials: VerifyResetPasswordDto): Promise<TokenResponseDto> {
        if (credentials.newPassword != credentials.confirmPassword) {
            throw new BadRequestException('Passwords don\'t match');
        }

        const email: string = await this.keyValueStorageStorage.get(credentials.code);
        if (!email) {
            throw new BadRequestException('Secret code is invalid');
        }

        const user: User = await this.userModel.findOne({email, isDeleted: false}).exec();
        if (!user) {
            throw new NotFoundException('No user was found');
        }

        await user.hashPassword(credentials.newPassword);
        await this.userModel.updateOne({_id: user._id}, user).exec();

        return this.login(user._id, user.email);
    }
}
