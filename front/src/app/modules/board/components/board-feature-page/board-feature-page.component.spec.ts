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

  it('should display a one scenario build by default', () => {
    const sbuilder = fixture.debugElement.query(By.css('scenario-builder'));
    expect(sbuilder).toBeTruthy();
  });
});
