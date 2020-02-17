import { TestBed } from '@angular/core/testing';

import { FeatureUpdaterService } from './feature-updater.service';
import { FeatureUpdateData } from '../../../interfaces/feature-update-data.interface';

describe('FeatureUpdaterService', () => {
	let service: FeatureUpdaterService;

	beforeEach(() => TestBed.configureTestingModule({}));
	beforeEach(() => {
		service = TestBed.get(FeatureUpdaterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
});
