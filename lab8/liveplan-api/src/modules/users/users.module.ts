import {forwardRef, Module} from '@nestjs/common';
import {UsersService} from './services/users.service';
import {MongooseModule} from '@nestjs/mongoose';
import {UserSchema} from './schemas/user.schema';
import {CustomerApplicationController} from './controllers/customer-application.controller';
import {FileStorageModule} from '../../shared/file-storage/file-storage.module';
import {ConfigModule} from '../../shared/config/config.module';
import {AuthModule} from '../auth/auth.module';
import {AdminApplicationController} from './controllers/admin-application.controller';
import {CustomersAccountService} from './services/customers-account.service';
import {CustomerInfoSchema} from './schemas/customer-info.schema';
import {CustomerAccountController} from './controllers/customer-account.controller';
import {AdminInfoSchema} from './schemas/admin-info.schema';
import {JwtStrategy} from '../auth/strategies/jwt.strategy';
import {AdminAccountService} from './services/admin-account.service';
import {AdminAccountController} from './controllers/admin-account.controller';
import {IconPackSchema} from '../icons/schemas/icon-pack.schema';
import {CustomersService} from './services/customers.service';
import {IconPacksService} from '../icons/services/icon-packs.service';
import {IconSchema} from '../icons/schemas/icon.schema';
import {IconsService} from '../icons/services/icons.service';
import {NotificationsModule} from '../notifications/notifications.module';
import {NotificationsService} from '../notifications/services/notifications.service';
import {FinanceNotificationsService} from '../notifications/services/finance-notifications.service';
import {GroupsModule} from '../groups/groups.module';
import {GroupsService} from '../groups/services/groups.service';


@Module({
    imports: [MongooseModule.forFeature([
        {name: 'AdminInfo', schema: AdminInfoSchema},
        {name: 'CustomerInfo', schema: CustomerInfoSchema},
        {name: 'User', schema: UserSchema},
        {name: 'IconPack', schema: IconPackSchema},
        {name: 'Icon', schema: IconSchema},
    ]),
    FileStorageModule,
    ConfigModule,
    AuthModule,
    forwardRef(() => GroupsModule),
    forwardRef(() => NotificationsModule),
    ],
    providers: [
        UsersService,
        JwtStrategy,
        AdminAccountService,
        CustomersAccountService,
        IconPacksService,
        CustomersService,
        IconsService,
        NotificationsService,
        FinanceNotificationsService,
        GroupsService,
    ],
    controllers: [
        AdminApplicationController,
        AdminAccountController,
        CustomerApplicationController,
        CustomerAccountController,
    ],
    exports: [
        UsersService,
        MongooseModule,
        CustomersAccountService,
        CustomersService,
    ],
})
export class UsersModule {
}
