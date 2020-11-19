import {Injectable} from '@nestjs/common';
import {PassportStrategy} from '@nestjs/passport';
import {ExtractJwt, Strategy} from 'passport-jwt';
import {ConfigService} from '../../../shared/config/config.service';
import * as aes256 from 'aes256';
import {TokenPayload} from '../dtos';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly configService: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get('JWT_KEY'),
        });
    }

    async validate(payload: TokenPayload): Promise<any> {
        return {
            id: String(aes256.decrypt(this.configService.get('AES256_KEY'), payload.sub)),
            email: payload.email,
        };
    }
}
