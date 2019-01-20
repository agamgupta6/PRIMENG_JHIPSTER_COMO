import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Como } from 'app/shared/model/como.model';
import { ComoService } from './como.service';
import { ComoComponent } from './como.component';
import { ComoDetailComponent } from './como-detail.component';
import { ComoUpdateComponent } from './como-update.component';
import { ComoDeletePopupComponent } from './como-delete-dialog.component';
import { IComo } from 'app/shared/model/como.model';

@Injectable({ providedIn: 'root' })
export class ComoResolve implements Resolve<IComo> {
    constructor(private service: ComoService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Como> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Como>) => response.ok),
                map((como: HttpResponse<Como>) => como.body)
            );
        }
        return of(new Como());
    }
}

export const comoRoute: Routes = [
    {
        path: 'como',
        component: ComoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'como/:id/view',
        component: ComoDetailComponent,
        resolve: {
            como: ComoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'como/new',
        component: ComoUpdateComponent,
        resolve: {
            como: ComoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comos'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'como/:id/edit',
        component: ComoUpdateComponent,
        resolve: {
            como: ComoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const comoPopupRoute: Routes = [
    {
        path: 'como/:id/delete',
        component: ComoDeletePopupComponent,
        resolve: {
            como: ComoResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Comos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
