export interface PaginationInterface {
    sort?: object | string[] | string;
    page: number;
    limit: number;
    skip: number
}

