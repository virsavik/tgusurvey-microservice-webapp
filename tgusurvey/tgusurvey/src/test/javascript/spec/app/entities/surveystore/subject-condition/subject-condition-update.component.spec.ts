import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TgusurveyTestModule } from '../../../../test.module';
import { SubjectConditionUpdateComponent } from 'app/entities/surveystore/subject-condition/subject-condition-update.component';
import { SubjectConditionService } from 'app/entities/surveystore/subject-condition/subject-condition.service';
import { SubjectCondition } from 'app/shared/model/surveystore/subject-condition.model';

describe('Component Tests', () => {
  describe('SubjectCondition Management Update Component', () => {
    let comp: SubjectConditionUpdateComponent;
    let fixture: ComponentFixture<SubjectConditionUpdateComponent>;
    let service: SubjectConditionService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TgusurveyTestModule],
        declarations: [SubjectConditionUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(SubjectConditionUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SubjectConditionUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SubjectConditionService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubjectCondition(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new SubjectCondition();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
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
