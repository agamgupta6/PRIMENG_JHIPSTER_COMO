import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';

import { NgbDateMomentAdapter } from './util/datepicker-adapter';
import { Poc6ComoEntityDesignSharedLibsModule, Poc6ComoEntityDesignSharedCommonModule, HasAnyAuthorityDirective } from './';

@NgModule({
    imports: [Poc6ComoEntityDesignSharedLibsModule, Poc6ComoEntityDesignSharedCommonModule],
    declarations: [HasAnyAuthorityDirective],
    providers: [{ provide: NgbDateAdapter, useClass: NgbDateMomentAdapter }],
    exports: [Poc6ComoEntityDesignSharedCommonModule, HasAnyAuthorityDirective],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Poc6ComoEntityDesignSharedModule {
    static forRoot() {
        return {
            ngModule: Poc6ComoEntityDesignSharedModule
        };
    }
}
