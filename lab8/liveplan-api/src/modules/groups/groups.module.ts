import {forwardRef, Module} from '@nestjs/common';
import {GroupsService} from './services/groups.service';
import {GroupsController} from './controllers/groups.controller';
import {MongooseModule} from '@nestjs/mongoose';
import {GroupSchema} from './schemas/group.schema';
import {UsersModule} from '../users/users.module';
import {IconsModule} from '../icons/icons.module';
import {AuthModule} from '../auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature(
            [
                {name: 'Group', schema: GroupSchema},
            ],
        ),
        AuthModule,
        forwardRef(() => UsersModule),
        forwardRef(() => IconsModule),
    ],
    providers: [
        GroupsService,
    ],
    controllers: [
        GroupsController,
    ],
    exports: [
        MongooseModule,
        GroupsService,
    ],
})
export class GroupsModule {
}
