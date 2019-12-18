import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionStepItemComponent } from './section-step-item.component';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material';

describe('SectionStepItemComponent', () => {
  let component: SectionStepItemComponent;
  let fixture: ComponentFixture<SectionStepItemComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ SectionStepItemComponent ],
      imports: [MatIconModule]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SectionStepItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should should display the name of the step', async(() => {
    component.name = 'step1';
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      let name = fixture.debugElement.query(By.css('.step-name'));
      expect(name.nativeElement.textContent).toEqual('step1');
    });
  }));

  describe('delete',() => {

    beforeAll(() => {
      
    });

  })
  it('should have a delete button', () => {
    let del = fixture.debugElement.query(By.css('.btn-step-del'));
    expect(del).toBeTruthy();
  });

  it('should emit an event when the del button is prressed', (done) => {
    component.name = 'step1'
    let del = fixture.debugElement.query(By.css('.btn-step-del'));
    component.delEvent.subscribe((step) => {
      expect(step.name).toEqual('step1');
      done();
    });
    del.nativeElement.dispatchEvent(new Event('click'));
  });
});

