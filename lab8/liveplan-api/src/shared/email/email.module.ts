import {Module} from '@nestjs/common';
import {MailService} from './email.service';
import {ConfigModule} from '../config/config.module';

@Module({
    imports: [
        ConfigModule,
    ],
    providers: [MailService],
    exports: [MailService],
})
export class EmailModule {
}
