import {Module} from '@nestjs/common';
import {ConfigModule} from '../../config/config.module';
import {ConfigService} from '../../config/config.service';
import {MongooseModule} from '@nestjs/mongoose';

@Module({

    imports: [
        ConfigModule,
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                uri: configService.getMongoDbConfig(),
            }),
            inject: [ConfigService],
        }),
    ],

})
export class ConnectModule {
}
