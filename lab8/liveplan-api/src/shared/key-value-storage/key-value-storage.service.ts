import {Injectable} from '@nestjs/common';
import {ConfigService} from '../config/config.service';

@Injectable()
export class KeyValueStorageService {
    private readonly expiresTime;
    private storage: { [key: string]: string } = {};

    constructor(private readonly configService: ConfigService) {
        this.expiresTime = configService.get('STATISTIC_CACHE_TIME');
    }

    async set(key: string, value): Promise<void> {
        // this.expiresTime...
        this.storage[key] = this.stringifyJSON(value);
    }

    async get(key: string) {
        const value = this.storage[key];
        if (value) {
            return this.parseJSON(value);
        } else {
            return null;
        }
    }

    async delete(key: string): Promise<void> {
        this.storage[key] = null;
    }

    private parseJSON(value) {
        return JSON.parse(value);
    }

    private stringifyJSON(value) {
        return JSON.stringify(value);
    }
}
