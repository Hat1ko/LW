import {Injectable} from "@nestjs/common";
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Icon} from "../../icons/models/icon.model";
import {PaginationInterface} from "../../../shared/interfaces/pagination.interface";
import {IPaginationResponse} from "../../../shared/interfaces/i-pagination.response";
import {IconDto, IconPackDto} from "../../icons/dto";
import {paginate} from "../../../shared/paginator/paginator";
import {CacheService} from "../../../shared/key-value-storage/cache.service";
import {keys} from "../../../shared/config/config.statistic";

@Injectable()
export class IconsStatisticsService {
    constructor(
        @InjectModel('Icon')
        private iconModel: Model<Icon>,
        private readonly cacheService: CacheService,
    ) {
    }

    async getTheMostUsedIcons(paginationOptions: PaginationInterface):
        Promise<IPaginationResponse<IconDto[]>> {
        const key = keys.getTheMostUsedIcons;
        const cache = await this.cacheService.getCash(key, {}, paginationOptions);
        if (cache) {
            return cache;
        } else {
            paginationOptions.sort = !paginationOptions.sort ? '-countOfGroups' : paginationOptions.sort;
            const aggregate = this.iconModel.aggregate(
                [
                    {
                        $lookup: {
                            from: 'groups',
                            localField: '_id',
                            foreignField: 'icon',
                            as: 'groups',
                        },
                    },
                    {
                        $project: {
                            countOfGroups: {$size: "$groups"}
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