import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IComo } from 'app/shared/model/como.model';

@Component({
    selector: 'jhi-como-detail',
    templateUrl: './como-detail.component.html'
})
export class ComoDetailComponent implements OnInit {
    como: IComo;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ como }) => {
            this.como = como;
        });
    }

    previousState() {
        window.history.back();
    }
}
