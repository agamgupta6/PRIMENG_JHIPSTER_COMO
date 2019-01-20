import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Poc6ComoEntityDesignSharedModule } from 'app/shared';
import { Poc6ComoEntityDesignAdminModule } from 'app/admin/admin.module';
import {
    CommentComponent,
    CommentDetailComponent,
    CommentUpdateComponent,
    CommentDeletePopupComponent,
    CommentDeleteDialogComponent,
    commentRoute,
    commentPopupRoute
} from './';

const ENTITY_STATES = [...commentRoute, ...commentPopupRoute];

@NgModule({
    imports: [Poc6ComoEntityDesignSharedModule, Poc6ComoEntityDesignAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        CommentComponent,
        CommentDetailComponent,
        CommentUpdateComponent,
        CommentDeleteDialogComponent,
        CommentDeletePopupComponent
    ],
    entryComponents: [CommentComponent, CommentUpdateComponent, CommentDeleteDialogComponent, CommentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Poc6ComoEntityDesignCommentModule {}
