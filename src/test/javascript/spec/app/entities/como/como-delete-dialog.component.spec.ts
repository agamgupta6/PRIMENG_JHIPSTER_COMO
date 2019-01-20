/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { Poc6ComoEntityDesignTestModule } from '../../../test.module';
import { ComoDeleteDialogComponent } from 'app/entities/como/como-delete-dialog.component';
import { ComoService } from 'app/entities/como/como.service';

describe('Component Tests', () => {
    describe('Como Management Delete Component', () => {
        let comp: ComoDeleteDialogComponent;
        let fixture: ComponentFixture<ComoDeleteDialogComponent>;
        let service: ComoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Poc6ComoEntityDesignTestModule],
                declarations: [ComoDeleteDialogComponent]
            })
                .overrideTemplate(ComoDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ComoDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
