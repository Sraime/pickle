import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GherkinGeneratorComponent } from './gherkin-generator.component';
import { configureTestSuite } from 'ng-bullet';
import { SectionServiceService } from '../../services/section-service/section-service.service';
import { Section } from '../../interfaces/section';
import { of, Subject } from 'rxjs';
import { By } from '@angular/platform-browser';
import { Step } from '../../interfaces/step';

describe('GherkinGeneratorComponent', () => {
  let component: GherkinGeneratorComponent;
  let fixture: ComponentFixture<GherkinGeneratorComponent>;
  let sectionService;
  let defaultSectionValue: Section = {isValid: true, name:'', steps: [{name: 'step'}]};
  let sectionsDispatcher = {
    Given: new Subject<Section>(),
    When: new Subject<Section>(),
    Then: new Subject<Section>()
  }
  let sectionsName = ['Given', 'When', 'Then'];

  configureTestSuite(() => {
    sectionService = {
      getSectionObservable: jest.fn()
    }
    TestBed.configureTestingModule({
      declarations: [ GherkinGeneratorComponent ],
      providers: [
        {provide: SectionServiceService, useValue: sectionService}
      ]
    });
  });

  beforeEach(() => {
    sectionService.getSectionObservable.mockImplementation((sn) => {
      return sectionsDispatcher[sn];
    });
    fixture = TestBed.createComponent(GherkinGeneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not display then code by default', () => {
    let sectionCode = fixture.debugElement
            .query(By.css('.section-code'));
    expect(sectionCode).toBeFalsy();
  });

  it('should update the generation state when sections are updated', () => {
    let spyUpdate = jest.spyOn(component, 'updateGenerationState');
    sectionsDispatcher.Given.next(defaultSectionValue);
    expect(spyUpdate).toHaveBeenCalled();
  });

  it('should not display the section code while all sections are not registered', async(() => {
    sectionsName.forEach((sn, i) => {
      if(i == sectionsName.length-1) return;
      sectionsDispatcher[sn].next(defaultSectionValue);
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        let sectionCode = fixture.debugElement
            .query(By.css('.section-code'));
        expect(sectionCode).toBeFalsy();
      });
    });
  }));

  sectionsName.forEach((sectionName, index) => {
    describe('section code ' + sectionName, () => {

      it('should display the gherkin code in the '+index+' position', async(() => {
        sectionService.getSectionObservable
          .mockReturnValue(of(defaultSectionValue));
        component.ngOnInit();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let sectionCode = fixture.debugElement
            .queryAll(By.css('.section-code'));
          expect(sectionCode[index].nativeElement.textContent
            .includes(sectionName + ' step')).toBeTruthy();
        });
      }));

      

      it('should not generate the code and display an error if the section is not valid', async(() => {
        sectionService.getSectionObservable.mockImplementation((sn) => {
          if(sn == sectionName)
            return of({isValid: false, name:'', steps: []});
          return of(defaultSectionValue);
        });
        component.ngOnInit();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let code = fixture.debugElement
            .query(By.css('.section-code'));
          expect(code).toBeFalsy();
          let sectionCode = fixture.debugElement
            .query(By.css('.section-code-error'));
          expect(sectionCode.nativeElement.textContent)
            .toEqual('Toute les contraintes doivent être respectées pour générer le code Gherkin');
        });
      }));

      it('should display the 2 steps returned by the service', async(() => {
        sectionService.getSectionObservable.mockImplementation((sn) => {
          if(sn == sectionName) 
            return of({isValid: true, name:'', steps: [{name: 'step1'}, {name: 'step2'}]});
          return of(defaultSectionValue);
        })
        component.ngOnInit();
        fixture.whenStable().then(() => {
          fixture.detectChanges();
          let stepCode = fixture.debugElement
          .queryAll(By.css('.section-code:nth-child('+(index+1)+') .step-code'));
          expect(stepCode[0].nativeElement.textContent
            .includes(sectionName + ' step1')).toBeTruthy();
          expect(stepCode[1].nativeElement.textContent
            .includes('And step2')).toBeTruthy();
        });
      }));
    });
  });
});
