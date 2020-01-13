import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardPageComponent } from './board-page.component';
import { configureTestSuite } from 'ng-bullet';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('BoardPageComponent', () => {
	let component: BoardPageComponent;
	let fixture: ComponentFixture<BoardPageComponent>;

	configureTestSuite(() => {
		TestBed.configureTestingModule({
			declarations: [BoardPageComponent],
			schemas: [NO_ERRORS_SCHEMA]
		});
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(BoardPageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
