import {Module} from '@nestjs/common';
import {UsersStatisticsService} from './services/users-statistics.service';
import {StatisticsController} from './controllers/statistics.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {IconSchema} from "../icons/schemas/icon.schema";
import {IconPackSchema} from "../icons/schemas/icon-pack.schema";
import {UserSchema} from "../users/schemas/user.schema";
import {CustomerInfoSchema} from "../users/schemas/customer-info.schema";
import {IconPackStatisticsService} from "./services/icon-pack-statistics.service";
import {IconsStatisticsService} from "./services/icons-statistics.service";
import {KeyValueStorageModule} from "../../shared/key-value-storage/key-value-storage.module";

@Module({
    imports: [MongooseModule.forFeature([
        {name: 'Icon', schema: IconSchema},
        {name: 'IconPack', schema: IconPackSchema},
        {name: 'CustomerInfo', schema: CustomerInfoSchema},
        {name: 'User', schema: UserSchema},
    ]),
        KeyValueStorageModule],
    providers: [UsersStatisticsService, IconPackStatisticsService,
        IconsStatisticsService],
    controllers: [StatisticsController]
})
export class StatisticsModule {
}
