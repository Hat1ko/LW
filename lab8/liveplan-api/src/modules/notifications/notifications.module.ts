import {forwardRef, Module} from '@nestjs/common';
import {NotificationsService} from './services/notifications.service';
import {MongooseModule} from '@nestjs/mongoose';
import {NotificationsController} from './controllers/notifications.controller';
import {GroupsModule} from '../groups/groups.module';
import {UsersModule} from '../users/users.module';
import {FinanceNotificationsController} from './controllers/finance-notifications.controller';
import {FinanceNotificationsService} from './services/finance-notifications.service';
import {BaseNotificationSchema} from './schemas/base-notification.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            {name: 'BaseNotification', schema: BaseNotificationSchema, collection: 'notifications'},
        ]),
        forwardRef(() => UsersModule),
        forwardRef(() => GroupsModule),
    ],
    providers: [
        FinanceNotificationsService,
        NotificationsService,
    ],
    controllers: [
        NotificationsController,
        FinanceNotificationsController,
    ],
    exports: [
        MongooseModule,
        NotificationsService,
        FinanceNotificationsService,
    ],
})
export class NotificationsModule {}
