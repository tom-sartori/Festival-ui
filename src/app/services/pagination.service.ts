import {Injectable} from '@angular/core';
import {Paginator} from "../models/shared/paginator.model";

@Injectable({
    providedIn: 'root'
})
export class PaginationService {

    constructor() { }

    public paginator(items: any[], page?: number, countPerPage?: number): Paginator {
        page = page || 1;
        countPerPage = countPerPage || 4;
        const totalPages = Math.ceil(items.length / countPerPage);
        const prePage = page - 1 ? page - 1 : null;
        const nextPage = totalPages > page ? page + 1 : null;
        const offset = (page - 1) * countPerPage;
        const paginatedItems = items.slice(offset).slice(0, countPerPage);
        const total = items.length;

        return new Paginator(paginatedItems, page, countPerPage, prePage, nextPage, total, totalPages);
    }
}
