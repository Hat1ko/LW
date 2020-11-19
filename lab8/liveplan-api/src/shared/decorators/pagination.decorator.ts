import {createParamDecorator} from '@nestjs/common';
import {Request} from 'express';
import {PaginationInterface} from '../interfaces/pagination.interface';

export const Pagination = createParamDecorator((data, req: Request): PaginationInterface => {
    const query = {
        ...req.query,
        sort: req.query.sort,
        page: Number(req.query.page ? req.query.page : 1),
        limit: Number(req.query.limit ? req.query.limit : 20),
    };
    return {
        sort: query.sort,
        page: query.page,
        limit: query.limit,
        skip: query.limit * (query.page - 1),
    } as PaginationInterface;
});
