import {Module} from '@nestjs/common';
import {IconPacksService} from './services/icon-packs.service';
import {IconsAdminController} from './controllers/icons-admin.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {IconSchema} from './schemas/icon.schema';
import {IconPackSchema} from './schemas/icon-pack.schema';
import {IconsService} from './services/icons.service';
import {ConfigModule} from '../../shared/config/config.module';
import {FileStorageModule} from '../../shared/file-storage/file-storage.module';
import {UsersModule} from '../users/users.module';
import {IconsAppController} from './controllers/icons-app.controller';
import {IconsPackAdminController} from './controllers/icons-pack-admin.controller';
import {IconsPackAppController} from './controllers/icons-pack-app.controller';
import {IconsPackCustomerController} from './controllers/icons-pack-customer.controller';

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Icon', schema: IconSchema},
        {name: 'IconPack', schema: IconPackSchema},
    ]),
        ConfigModule, FileStorageModule, UsersModule],
    providers: [IconPacksService, IconsService],
    controllers: [IconsAdminController, IconsAppController,
        IconsPackAdminController, IconsPackAppController, IconsPackCustomerController],
    exports: [MongooseModule, IconPacksService, IconsService],
})
export class IconsModule {
}
