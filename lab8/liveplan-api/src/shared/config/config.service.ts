import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as path from 'path';

import {MailerOptions, PugAdapter} from '@nest-modules/mailer';
import {RedisModuleOptions} from 'nestjs-redis';

export class ConfigService {
    private readonly envConfig: Record<string, string>;

    constructor(filePath: string) {
        if (path.basename(__dirname) === 'config') {
            filePath = '../' + filePath;
        }
        this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    }

    get(key: string): string {
        return this.envConfig[key];
    }

    getOrDef(key: string, def: any): any {
        if (this.get(key)) {
            return this.get(key);
        } else {
            return def;
        }
    }

    getMongoDbConfig(): string {
        // mongo standalone
        // return 'mongodb://' +
        //     this.getOrDef('MONGODB_USER', '') + ':' +
        //     this.getOrDef('MONGODB_PASSWORD', '') + '@' +
        //     this.getOrDef('MONGODB_HOST', 'liveplan-mongo') + ':' +
        //     this.getOrDef('MONGODB_PORT', '27017') + '/' +
        //     this.getOrDef('MONGODB_NAME', 'liveplan') + '?authSource=admin';

        return 'mongodb://' +
            this.getOrDef('MONGO_FIRST_HOST', 'mongo1') + ':' +
            this.getOrDef('MONGO_FIRST_PORT', '27017') + ',' +
            this.getOrDef('MONGO_SECOND_HOST', 'mongo2') + ':' +
            this.getOrDef('MONGO_SECOND_PORT', '27018') + ',' +
            this.getOrDef('MONGO_THIRD_HOST', 'mongo3') + ':' +
            this.getOrDef('MONGO_THIRD_PORT', '27019') + '/' +
            this.getOrDef('MONGODB_NAME', 'liveplan') +
            '?replicaSet=' + this.getOrDef('MONGO_REPLICA_NAME', 'rs');

    }

    async getMailerConfig(): Promise<MailerOptions> {
        return {
            transport: {
                host: 'smtp.mailgun.org',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: 'postmaster@sandboxd303e43eee544e25a53a5c6af98bc4ce.mailgun.org', // generated ethereal users
                    pass: '5cfd229f4f63fc3abed6b2aabf9e64ea-1df6ec32-c821ba92', // generated ethereal password
                },
            },
            defaults: {},
            template: {
                dir: __dirname + '/../resourses/templates',
                adapter: new PugAdapter(), // or new PugAdapter()
                options: {
                    strict: true,
                },
            },
        } as MailerOptions;
    }

    getRedisConfig(): RedisModuleOptions {
        return {
            host: this.get('REDIS_HOST'),
            port: parseInt(this.get('REDIS_PORT')),
            // db: parseInt(this.get('REDIS_DB')),
            password: this.get('REDIS_PASSWORD'),
            keyPrefix: this.get('REDIS_PREFIX'),
        } as RedisModuleOptions;
    }

    getErrorCode(key: string): number {
        switch (key) {
        case 'unique_violation':
            return 23505;
        default:
            return null;
        }
    }
}
