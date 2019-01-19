import { NgModule } from '@angular/core';

import { Poc6ComoEntityDesignSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [Poc6ComoEntityDesignSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [Poc6ComoEntityDesignSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class Poc6ComoEntityDesignSharedCommonModule {}
