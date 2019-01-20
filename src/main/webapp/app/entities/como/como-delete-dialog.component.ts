import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IComo } from 'app/shared/model/como.model';
import { ComoService } from './como.service';

@Component({
    selector: 'jhi-como-delete-dialog',
    templateUrl: './como-delete-dialog.component.html'
})
export class ComoDeleteDialogComponent {
    como: IComo;

    constructor(protected comoService: ComoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.comoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'comoListModification',
                content: 'Deleted an como'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-como-delete-popup',
    template: ''
})
export class ComoDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ como }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ComoDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.como = como;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
