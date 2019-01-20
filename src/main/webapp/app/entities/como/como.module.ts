import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Poc6ComoEntityDesignSharedModule } from 'app/shared';
import { Poc6ComoEntityDesignAdminModule } from 'app/admin/admin.module';
import {
    ComoComponent,
    ComoDetailComponent,
    ComoUpdateComponent,
    ComoDeletePopupComponent,
    ComoDeleteDialogComponent,
    comoRoute,
    comoPopupRoute
} from './';

const ENTITY_STATES = [...comoRoute, ...comoPopupRoute];

@NgModule({
    imports: [Poc6ComoEntityDesignSharedModule, Poc6ComoEntityDesignAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ComoComponent, ComoDetailComponent, ComoUpdateComponent, ComoDeleteDialogComponent, ComoDeletePopupComponent],
    entryComponents: [ComoComponent, ComoUpdateComponent, ComoDeleteDialogComponent, ComoDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Poc6ComoEntityDesignComoModule {}
