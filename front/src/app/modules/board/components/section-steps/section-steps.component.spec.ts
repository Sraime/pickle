import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStepsComponent } from './section-steps.component';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import { MatCardModule, MatFormFieldModule, MatInputModule, MatIconModule, MatListModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CdkDragDrop, DragDropModule } from '@angular/cdk/drag-drop';
import { SectionServiceService } from '../../services/section-service/section-service.service';
import { of } from 'rxjs';
import { Section } from '../../interfaces/section';

describe('SectionSetpsComponent', () => {
  let component: SectionStepsComponent;
  let fixture: ComponentFixture<SectionStepsComponent>;
  let sectionService;

  configureTestSuite(() => {
    sectionService = {
      getSectionObservable: jest.fn(),
      updateSection: jest.fn()
    }
    TestBed.configureTestingModule({
      declarations: [ SectionStepsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [ 
        {
          provide: SectionServiceService,
          useValue: sectionService
        }
      ],
      imports: [ MatCardModule, MatFormFieldModule, 
        MatIconModule, MatInputModule, BrowserAnimationsModule, MatListModule, DragDropModule ]
    })
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionStepsComponent);
    component = fixture.componentInstance;
    sectionService.getSectionObservable.mockReturnValue(
      of({isValid: true, name: 'Given', steps:[]})
    );
    fixture.detectChanges();
  });
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('should get the step list from the service', () => {
    let updatedSection: Section = {name:'Given', isValid: true, steps: [{name: 'step'}]};
    sectionService.getSectionObservable.mockReturnValue(of(updatedSection));
    component.ngOnInit();
    expect(component.steps).toEqual(['step']);
  });
  
  it('should have a title', async(() => {
    component.sectionName = 'Given';
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const title = fixture.debugElement
      .query(By.css('.section-steps-title'))
      .nativeElement;
      expect(title.textContent).toEqual('Given');
    });
  }));
  
  it('should have a step list', async(() => {
    const list = fixture.debugElement
    .query(By.css('.section-steps-list'))
    .nativeElement;
    expect(list).toBeTruthy();
  }));
  
  it('should display registered steps', async(() => {
    component.steps = [
      'step1',
      'step2'
    ]
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const steps = fixture.debugElement
      .queryAll(By.css('.section-steps-list .section-step'));
      expect(steps.length).toEqual(2);
    });
  }));
  
  it('should have a list of step empty by default', () => {
    expect(component.steps).toEqual([]);
  });
  
  it('should have an input for adding new steps', async(() => {
    component.sectionName = 'Given';
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const input = fixture.debugElement.query(By.css('input#new-given-step.input-new-step'));
      expect(input).toBeTruthy();
    });
  }));
  
  describe('adding steps', () => {
    let input;
    let stubUpdateSection;
    
    beforeEach(() => {
      input = fixture.debugElement.query(By.css('input.input-new-step'));
      stubUpdateSection = jest.spyOn(sectionService, 'updateSection');
    });
  
    it('should add a new step and clean the input after filling the it and pressing Enter', () => {
      component.sectionName = 'Given';
      input.nativeElement.value = 'step1';
      input.nativeElement.dispatchEvent(new KeyboardEvent("keydown", 
        {key: 'Enter', code: 'Enter'}
      ));
      expect(component.steps.length).toEqual(0);
      expect(stubUpdateSection).toHaveBeenCalledWith('Given', [{name: 'step1'}]);
      expect(input.nativeElement.value).toEqual('');
    });
  
    it('should not add new step when the input is empty', () => {
      input.nativeElement.dispatchEvent(new KeyboardEvent("keydown", 
        {key: 'Enter', code: 'Enter'}
      ));
      expect(component.steps.length).toEqual(0);
    });
  });


  describe('remove step', () => {
    it('should remove the step from the list when it emit a delEvent', () =>{
      component.steps = ['step1'];
      component.delStep({name: 'step1'});
      expect(component.steps.length).toEqual(0);
    });

    it('should remove the first step from the list when it emit a delEvent', () =>{
      component.steps = ['step1', 'step2'];
      component.delStep({name: 'step1'});
      expect(component.steps[0]).toEqual('step2');
    });
  });
  
  describe('move step', () => {

    let mockDragDropEvent: CdkDragDrop<string[]>;

    beforeEach(() => {
      mockDragDropEvent = {
        previousIndex: null,     
        currentIndex: null,
        item: null,
        container: null,
        previousContainer: null,
        isPointerOverContainer: true,
        distance: null
      }
    });

    it('should move the step to its new index after a drop event', () => {
      component.steps = ['step1', 'step2'];
      mockDragDropEvent.previousIndex = 1;
      mockDragDropEvent.currentIndex = 0
      component.dropStep(mockDragDropEvent);
      expect(component.steps).toEqual(['step2', 'step1'])
    });
  });

  describe('constraints helper', () => {
    it('should display the minimum steps constraints when there is O step', () => {
      const minSectionCotraints = fixture.debugElement.query(
        By.css('.section-steps-constraints .min-steps-constraint')
      );
      expect(minSectionCotraints.nativeElement.textContent).toEqual(
        'At least one step is required'
      );
    });

    it('should not display the minimum steps required if there is 1 step', async(() => {
      component.steps = ['step1'];
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const minSectionCotraints = fixture.debugElement.query(
          By.css('.section-steps-constraints .min-steps-constraint')
        );
        expect(minSectionCotraints).toBeFalsy();
      });
    }));

  });
});
