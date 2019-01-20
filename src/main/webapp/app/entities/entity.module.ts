import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { Poc6ComoEntityDesignTagModule } from './tag/tag.module';
import { Poc6ComoEntityDesignCommentModule } from './comment/comment.module';
import { Poc6ComoEntityDesignAnswerModule } from './answer/answer.module';
import { Poc6ComoEntityDesignComoModule } from './como/como.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        Poc6ComoEntityDesignTagModule,
        Poc6ComoEntityDesignCommentModule,
        Poc6ComoEntityDesignAnswerModule,
        Poc6ComoEntityDesignComoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Poc6ComoEntityDesignEntityModule {}
