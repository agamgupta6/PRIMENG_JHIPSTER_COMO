/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { Poc6ComoEntityDesignTestModule } from '../../../test.module';
import { ComoDetailComponent } from 'app/entities/como/como-detail.component';
import { Como } from 'app/shared/model/como.model';

describe('Component Tests', () => {
    describe('Como Management Detail Component', () => {
        let comp: ComoDetailComponent;
        let fixture: ComponentFixture<ComoDetailComponent>;
        const route = ({ data: of({ como: new Como(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [Poc6ComoEntityDesignTestModule],
                declarations: [ComoDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ComoDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ComoDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.como).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
