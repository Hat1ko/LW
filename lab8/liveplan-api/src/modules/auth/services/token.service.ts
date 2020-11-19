import {Injectable} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {ConfigService} from '../../../shared/config/config.service';
import {JwtService} from '@nestjs/jwt';
import {TokenPayload} from '../dtos';
import * as aes256 from 'aes256';
import {User} from '../../users/models/user';
import {MongoId} from '../../../shared/constants/constant';

@Injectable()
export class TokenService {
    constructor(
        @InjectModel('User')
        private readonly userModel: Model<User>,
        private readonly configService: ConfigService,
        private readonly jwtService: JwtService,
    ) {
    }

    public createJwtToken(userId: string, email: string, expiresIn?: string | number): string {
        const sub: string = aes256.encrypt(this.configService.get('AES256_KEY'), userId);
        const tokenPayload: TokenPayload = {email, sub};
        return this.jwtService.sign(tokenPayload, {expiresIn: '360s'});
    }

    public async saveRefreshToken(token: string, userId: MongoId): Promise<void> {
        await this.userModel.updateOne(
            {_id: userId},
            {
                $push: {
                    refreshTokens: token,
                },
            }).exec();
    }
}
