/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { Poc6ComoEntityDesignTestModule } from '../../../test.module';
import { ComoUpdateComponent } from 'app/entities/como/como-update.component';
import { ComoService } from 'app/entities/como/como.service';
import { Como } from 'app/shared/model/como.model';

describe('Component Tests', () => {
    describe('Como Management Update Component', () => {
        let comp: ComoUpdateComponent;
        let fixture: ComponentFixture<ComoUpdateComponent>;
        let service: ComoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Poc6ComoEntityDesignTestModule],
                declarations: [ComoUpdateComponent]
            })
                .overrideTemplate(ComoUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ComoUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComoService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Como(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.como = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Como();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.como = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
