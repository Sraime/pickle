import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardFeaturePageComponent } from './board-feature-page.component';
import { configureTestSuite } from 'ng-bullet';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('BoardFeaturePageComponent', () => {
  let component: BoardFeaturePageComponent;
  let fixture: ComponentFixture<BoardFeaturePageComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardFeaturePageComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardFeaturePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display a one scenario builder by default', () => {
    const sbuilder = fixture.debugElement.query(By.css('scenario-builder'));
    expect(sbuilder).toBeTruthy();
  });

  describe('add scenario', () => {
    let btnAdd;
    
    beforeEach(() => {
      btnAdd = fixture.debugElement.query(By.css('button.btn-add-scenario'));
    });

    it('should have an option for adding a new scenario builder', () => {
      expect(btnAdd.nativeElement.textContent.includes('New Scenario')).toBeTruthy();
    });

    it('should add a new scenario after clicking on the add btn', async(() => {
      btnAdd.nativeElement.click();
      fixture.whenStable().then(() => {
        fixture.detectChanges();
        const builders = fixture.debugElement.queryAll(By.css('scenario-builder'));
        expect(builders.length).toEqual(2);
      });
    }));
  })
});
