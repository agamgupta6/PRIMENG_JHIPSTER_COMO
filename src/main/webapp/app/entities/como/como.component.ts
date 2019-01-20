import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IComo } from 'app/shared/model/como.model';
import { AccountService } from 'app/core';
import { ComoService } from './como.service';

@Component({
    selector: 'jhi-como',
    templateUrl: './como.component.html'
})
export class ComoComponent implements OnInit, OnDestroy {
    comos: IComo[];
    currentAccount: any;
    eventSubscriber: Subscription;
    currentSearch: string;

    constructor(
        protected comoService: ComoService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected activatedRoute: ActivatedRoute,
        protected accountService: AccountService
    ) {
        this.currentSearch =
            this.activatedRoute.snapshot && this.activatedRoute.snapshot.params['search']
                ? this.activatedRoute.snapshot.params['search']
                : '';
    }

    loadAll() {
        if (this.currentSearch) {
            this.comoService
                .search({
                    query: this.currentSearch
                })
                .subscribe((res: HttpResponse<IComo[]>) => (this.comos = res.body), (res: HttpErrorResponse) => this.onError(res.message));
            return;
        }
        this.comoService.query().subscribe(
            (res: HttpResponse<IComo[]>) => {
                this.comos = res.body;
                this.currentSearch = '';
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    search(query) {
        if (!query) {
            return this.clear();
        }
        this.currentSearch = query;
        this.loadAll();
    }

    clear() {
        this.currentSearch = '';
        this.loadAll();
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInComos();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IComo) {
        return item.id;
    }

    registerChangeInComos() {
        this.eventSubscriber = this.eventManager.subscribe('comoListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
