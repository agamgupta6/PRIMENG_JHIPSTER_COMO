import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { Poc6ComoEntityDesignSharedModule } from 'app/shared';
import { Poc6ComoEntityDesignAdminModule } from 'app/admin/admin.module';
import {
    AnswerComponent,
    AnswerDetailComponent,
    AnswerUpdateComponent,
    AnswerDeletePopupComponent,
    AnswerDeleteDialogComponent,
    answerRoute,
    answerPopupRoute
} from './';

const ENTITY_STATES = [...answerRoute, ...answerPopupRoute];

@NgModule({
    imports: [Poc6ComoEntityDesignSharedModule, Poc6ComoEntityDesignAdminModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AnswerComponent, AnswerDetailComponent, AnswerUpdateComponent, AnswerDeleteDialogComponent, AnswerDeletePopupComponent],
    entryComponents: [AnswerComponent, AnswerUpdateComponent, AnswerDeleteDialogComponent, AnswerDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Poc6ComoEntityDesignAnswerModule {}
