import {Module} from '@nestjs/common';
import {AuthController} from './controllers/auth.controller';
import {ConfigModule} from '../../shared/config/config.module';
import {PassportModule} from '@nestjs/passport';
import {KeyValueStorageModule} from '../../shared/key-value-storage/key-value-storage.module';
import {JwtModule} from '@nestjs/jwt';
import {ConfigService} from '../../shared/config/config.service';
import {TokenService} from './services/token.service';
import {MongooseModule} from '@nestjs/mongoose';
import {KeyValueStorageService} from '../../shared/key-value-storage/key-value-storage.service';
import {EmailModule} from '../../shared/email/email.module';
import {AuthService} from './services/auth.service';
import {LocalStrategy} from './strategies/local.strategy';
import {UserSchema} from '../users/schemas/user.schema';
import {JwtStrategy} from './strategies/jwt.strategy';

@Module({
    imports: [
        ConfigModule,
        PassportModule,
        EmailModule,
        KeyValueStorageModule,
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: async (config: ConfigService) => ({
                secret: config.get('JWT_KEY'),
            }),
        }),
        MongooseModule.forFeature([
            {name: 'User', schema: UserSchema},
        ]),
    ],
    providers: [
        AuthService,
        TokenService,
        KeyValueStorageService,
        LocalStrategy,
        JwtStrategy,
    ],
    controllers: [AuthController],
    exports: [AuthService],
})
export class AuthModule {
}
