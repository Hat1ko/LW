import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {CustomerInfo} from "../../users/models/customer-info.model";
import {TimePeriodDto} from "../dtos/req/time-period.dto";
import {IPaginationResponse} from "../../../shared/interfaces/i-pagination.response";
import {CustomerInfoDto} from "../../users/dtos";
import {paginate} from "../../../shared/paginator/paginator";
import {PaginationInterface} from "../../../shared/interfaces/pagination.interface";
import {keys} from "../../../shared/config/config.statistic";
import {CacheService} from "../../../shared/key-value-storage/cache.service";

@Injectable()
export class UsersStatisticsService {
    constructor(
        @InjectModel('CustomerInfo')
        private customerModel: Model<CustomerInfo>,
        private readonly cacheService: CacheService,
    ) {
    }

    async getAmountOfActiveUsers(): Promise<number> {
        const key = keys.getAmountOfActiveUsers;
        const cache = await this.cacheService.getCash(key, {});
        if (cache) {
            return cache;
        } else {
            const response = await this.customerModel
                .countDocuments({isDeleted: false, role: 'customer'});
            await this.cacheService.setCash(key, {response});
            return response;
        }
    }

    async getNewUsersByTimePeriod(timePeriodDto: TimePeriodDto,
                                  paginationOptions: PaginationInterface):
        Promise<IPaginationResponse<CustomerInfoDto[]>> {
        const key = keys.getNewUsersByTimePeriod;
        const cache = await this.cacheService.getCash(key, timePeriodDto, paginationOptions);
        if (cache) {
            return cache;
        } else {
            let query = this.customerModel.find();
            query = query
                .where('createdAt').equals(
                    {$gte: timePeriodDto.dateAfter, $lte: timePeriodDto.dateBefore}
                )
                .where('isDeleted').equals(false)
                .where('role').equals('customer')
                .select({password: 0, iconPacks: 0, refreshTokens: 0, __v: 0})
            const response = await paginate(query, paginationOptions);
            await this.cacheService.setCash(key, response, timePeriodDto, paginationOptions)
            return response;
        }
    }
}
