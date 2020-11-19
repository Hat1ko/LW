import {Module} from '@nestjs/common';
import {KeyValueStorageModule} from './shared/key-value-storage/key-value-storage.module';
import {ConfigModule} from './shared/config/config.module';
import {ConnectModule} from './shared/database/connect/connect.module';
import {HelpersModule} from './shared/helpers/helpers.module';
import {SeederModule} from './shared/seeder/seeder.module';
import {GroupsModule} from './modules/groups/groups.module';
import {IconsModule} from './modules/icons/icons.module';
import {FileStorageModule} from './shared/file-storage/file-storage.module';
import {AuthModule} from './modules/auth/auth.module';
import {UsersModule} from './modules/users/users.module';
import {StatisticsModule} from './modules/statistics/statistics.module';
import {NotificationsModule} from "./modules/notifications/notifications.module";

@Module({
    imports: [
        ConfigModule,
        ConnectModule,
        KeyValueStorageModule,
        HelpersModule,
        SeederModule,
        GroupsModule,
        IconsModule,
        FileStorageModule,
        AuthModule,
        UsersModule,
        StatisticsModule,
        NotificationsModule,
    ]
})
export class AppModule {
}
