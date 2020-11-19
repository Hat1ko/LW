import {PaginationInterface} from '../interfaces/pagination.interface';
import {KeyValueStorageService} from './key-value-storage.service';
import {Injectable} from '@nestjs/common';

@Injectable()
export class CacheService {
    constructor(
        private readonly keyValueStorageService: KeyValueStorageService,
    ) {
    }

    public static makeRedisKey(prefix: string, dto?,
                               options?: PaginationInterface): string {
        if (options) {
            prefix = options.page ? prefix + '/page-' + options.page : prefix;
            prefix = options.limit ? prefix + '/limit-' + options.limit : prefix;
            prefix = options.sort ? prefix + '/sort-' + options.sort : prefix;
        }
        let key = prefix + '/';
        if (dto) {
            for (const prop in dto) {
                if (dto.hasOwnProperty(prop)) {
                    key += `${prop}-${dto[prop]}/`;
                }
            }
        }
        return key;
    }

    public async setCash(prefix: string, dtoData: object, dtoFilter?,
                         options?: PaginationInterface)
        : Promise<void> {
        await this.keyValueStorageService.set(
            CacheService.makeRedisKey(prefix, dtoFilter, options),
            dtoData,
        );
    }

    public async getCash(prefix: string, dto?,
                         options?: PaginationInterface) {
        const cashedData = await this.keyValueStorageService.get(CacheService.makeRedisKey(prefix, dto, options));
        return cashedData ? cashedData : null;
    }
}
