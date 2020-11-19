import {PaginationInterface} from '../interfaces/pagination.interface';
import {Aggregate, Query} from 'mongoose';
import {IPaginationResponse} from '../interfaces/i-pagination.response';

async function getManyAndPaginate<E>(oldQuery: Query<any> | Aggregate<any>,
                                     pagination: PaginationInterface): Promise<[E, number]> {
    let query = oldQuery;
    if (pagination) {
        query = query
            .skip(pagination.skip)
            .limit(pagination.limit);

        if (pagination.sort) {
            query = query.sort(pagination.sort);
        }
    }

    const items = await query.exec();
    const count = items.length;
    return [items, count];
}

export const paginate = async <E>(query: Query<E> | Aggregate<E>, pagination: PaginationInterface):
    Promise<IPaginationResponse<E>> => {
    const [docs, totalDocs] = await getManyAndPaginate(query, pagination);
    return {
        docs,
        totalDocs,
    } as IPaginationResponse<E>;
};
