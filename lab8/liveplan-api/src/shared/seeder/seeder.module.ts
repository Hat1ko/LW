import {Logger, Module} from '@nestjs/common';
import {SeederService} from './seeder.service';
import {IconSeederService} from './icons/services/icon-seeder.service';
import {IconsModule} from '../../modules/icons/icons.module';
import {ConfigModule} from '../config/config.module';
import {FileStorageModule} from '../file-storage/file-storage.module';
import {IconPackSeederService} from './icon-packs/services/icon-pack-seeder.service';

@Module({
    imports: [IconsModule, ConfigModule, FileStorageModule],
    providers: [SeederService, Logger, IconSeederService, IconPackSeederService],
})
export class SeederModule {
}
