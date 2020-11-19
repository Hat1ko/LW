import {HttpModule, Module} from '@nestjs/common';
import {FileStorageService} from './file-storage.service';
import {ConfigModule} from '../config/config.module';

@Module({
    imports: [ConfigModule, HttpModule.registerAsync({
        useFactory: () => ({
            timeout: 5000,
            maxRedirects: 5,
        }),
    })],
    providers: [FileStorageService],
    exports: [FileStorageService, HttpModule],
})
export class FileStorageModule {
}
