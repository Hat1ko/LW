import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {IconPack} from "../../icons/models/icon-pack.model";
import {IPaginationResponse} from "../../../shared/interfaces/i-pagination.response";
import {IconPackDto} from "../../icons/dto";
import {paginate} from "../../../shared/paginator/paginator";
import {PaginationInterface} from "../../../shared/interfaces/pagination.interface";
import {keys} from "../../../shared/config/config.statistic";
import {CacheService} from "../../../shared/key-value-storage/cache.service";

@Injectable()
export class IconPackStatisticsService {
    constructor(
        @InjectModel('IconPack')
        private iconPackModel: Model<IconPack>,
        private readonly cacheService: CacheService
    ) {
    }

    async getTheMostUsedIconPacks(paginationOptions: PaginationInterface):
        Promise<IPaginationResponse<IconPackDto[]>> {
        const key = keys.getTheMostUsedIconPacks;
        const cache = await this.cacheService.getCash(key, {}, paginationOptions);
        if (cache) {
            return cache;
        } else {
            paginationOptions.sort = !paginationOptions.sort ? '-countOfUsers' : paginationOptions.sort;
            const aggregate = this.iconPackModel.aggregate(
                [
                    {
                        $project: {
                            countOfUsers: {$size: "$users"}
                        }
                    }
                ]
            );
            const response = await paginate(aggregate, paginationOptions);
            await this.cacheService.setCash(key, response, {}, paginationOptions)
            return response;
        }
    }
}