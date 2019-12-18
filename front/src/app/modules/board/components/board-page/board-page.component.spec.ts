import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPageComponent } from './board-page.component';
import { configureTestSuite } from 'ng-bullet';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BoardPageComponent', () => {
  let component: BoardPageComponent;
  let fixture: ComponentFixture<BoardPageComponent>;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardPageComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  const sections = [
    {sectionName: 'Given'},
    {sectionName: 'When'},
    {sectionName: 'Then'}
  ]

  sections.forEach((section) => {

    describe('section '+ section.sectionName,() => {

      it('should have a component with name'+section.sectionName, async(() => {
        const htmlSection = fixture.debugElement
              .query(By.css('section-steps[sectionName="'+section.sectionName+'"]'))
              .nativeElement;
        expect(htmlSection).toBeTruthy();
      }));
    });
  });

});
