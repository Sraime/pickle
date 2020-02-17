import { TestBed } from '@angular/core/testing';
import { AbstractUpdaterService } from './abstract-updater.service';
import { Injectable } from '@angular/core';

interface InfoUpdateData {}
@Injectable({
	providedIn: 'root'
})
export class InfoUpdaterService extends AbstractUpdaterService<InfoUpdateData> {}

describe('FeatureUpdaterService', () => {
	let service: InfoUpdaterService;

	beforeEach(() => TestBed.configureTestingModule({}));
	beforeEach(() => {
		service = TestBed.get(InfoUpdaterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should dispatch the change when there is an update', (done) => {
		const data: InfoUpdateData = {
			name: 'my feature'
		};
		service.getObservable().subscribe((updated) => {
			expect(updated).toEqual(data);
			done();
		});
		service.updateData(data);
	});
});
