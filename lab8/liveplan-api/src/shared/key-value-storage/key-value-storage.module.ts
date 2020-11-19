import {Module} from '@nestjs/common';
import {KeyValueStorageService} from './key-value-storage.service';
import {ConfigModule} from '../config/config.module';
import {CacheService} from './cache.service';

@Module({
    imports: [
        // for prod version
        // RedisModule.forRootAsync({
        //     imports: [ConfigModule],
        //     useFactory: (config: ConfigService) => config.getRedisConfig(),
        //     inject: [ConfigService],
        // }),
        ConfigModule,
    ],
    providers: [KeyValueStorageService, CacheService],
    exports: [CacheService],
})
export class KeyValueStorageModule {
}
