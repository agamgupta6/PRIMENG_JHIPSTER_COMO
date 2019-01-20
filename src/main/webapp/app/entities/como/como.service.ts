import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IComo } from 'app/shared/model/como.model';

type EntityResponseType = HttpResponse<IComo>;
type EntityArrayResponseType = HttpResponse<IComo[]>;

@Injectable({ providedIn: 'root' })
export class ComoService {
    public resourceUrl = SERVER_API_URL + 'api/comos';
    public resourceSearchUrl = SERVER_API_URL + 'api/_search/comos';

    constructor(protected http: HttpClient) {}

    create(como: IComo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(como);
        return this.http
            .post<IComo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(como: IComo): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(como);
        return this.http
            .put<IComo>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IComo>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IComo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    search(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IComo[]>(this.resourceSearchUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    protected convertDateFromClient(como: IComo): IComo {
        const copy: IComo = Object.assign({}, como, {
            createdAt: como.createdAt != null && como.createdAt.isValid() ? como.createdAt.format(DATE_FORMAT) : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdAt = res.body.createdAt != null ? moment(res.body.createdAt) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((como: IComo) => {
                como.createdAt = como.createdAt != null ? moment(como.createdAt) : null;
            });
        }
        return res;
    }
}
