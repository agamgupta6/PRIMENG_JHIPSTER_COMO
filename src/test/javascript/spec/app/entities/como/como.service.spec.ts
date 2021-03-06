/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { ComoService } from 'app/entities/como/como.service';
import { IComo, Como, Type } from 'app/shared/model/como.model';

describe('Service Tests', () => {
    describe('Como Service', () => {
        let injector: TestBed;
        let service: ComoService;
        let httpMock: HttpTestingController;
        let elemDefault: IComo;
        let currentDate: moment.Moment;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ComoService);
            httpMock = injector.get(HttpTestingController);
            currentDate = moment();

            elemDefault = new Como(0, 'AAAAAAA', 'AAAAAAA', 0, currentDate, Type.Como);
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign(
                    {
                        createdAt: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Como', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0,
                        createdAt: currentDate.format(DATE_FORMAT)
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createdAt: currentDate
                    },
                    returnedFromService
                );
                service
                    .create(new Como(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Como', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        text: 'BBBBBB',
                        claps: 1,
                        createdAt: currentDate.format(DATE_FORMAT),
                        type: 'BBBBBB'
                    },
                    elemDefault
                );

                const expected = Object.assign(
                    {
                        createdAt: currentDate
                    },
                    returnedFromService
                );
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Como', async () => {
                const returnedFromService = Object.assign(
                    {
                        title: 'BBBBBB',
                        text: 'BBBBBB',
                        claps: 1,
                        createdAt: currentDate.format(DATE_FORMAT),
                        type: 'BBBBBB'
                    },
                    elemDefault
                );
                const expected = Object.assign(
                    {
                        createdAt: currentDate
                    },
                    returnedFromService
                );
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Como', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
