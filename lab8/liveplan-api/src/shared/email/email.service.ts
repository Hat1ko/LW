import {Injectable} from '@nestjs/common';
import * as mailgun from 'mailgun-js';
import {ISendOptions} from './interfaces/send-options.interface';
import {ConfigService} from '../config/config.service';

@Injectable()
export class MailService {

    from: string;
    private client: mailgun.Mailgun;

    constructor(
        configService: ConfigService,
    ) {
        this.client = mailgun({
            apiKey: configService.get('MAILGUN_API_KEY'),
            domain: configService.get('MAILGUN_DOMEN'),
        });
        this.from = configService.get('EMAIL_FROM');
    }

    async send(options: ISendOptions) {
        options.from = this.from;
        return new Promise((resolve, reject) => {
            this.client.messages().send(options, (error, body) => {
                if (error) {
                    console.log(error);
                    resolve();
                } else {
                    resolve(body);
                }
            });
        });
    }

}
