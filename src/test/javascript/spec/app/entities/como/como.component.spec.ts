/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { Poc6ComoEntityDesignTestModule } from '../../../test.module';
import { ComoComponent } from 'app/entities/como/como.component';
import { ComoService } from 'app/entities/como/como.service';
import { Como } from 'app/shared/model/como.model';

describe('Component Tests', () => {
    describe('Como Management Component', () => {
        let comp: ComoComponent;
        let fixture: ComponentFixture<ComoComponent>;
        let service: ComoService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Poc6ComoEntityDesignTestModule],
                declarations: [ComoComponent],
                providers: []
            })
                .overrideTemplate(ComoComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ComoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ComoService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Como(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.comos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
