import { TestBed } from '@angular/core/testing';

import { FeatureService } from './feature.service';
import { ApiFeature } from './api-feature.interface';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
jest.mock('@angular/common/http');

describe('FeatureService', () => {
	let service: FeatureService;
	const mockHttpClient: jest.Mocked<HttpClient> = new HttpClient(null) as jest.Mocked<HttpClient>;
	const simpleResultApiFeature: ApiFeature = {
		_id: 'xxx',
		name: 'my feature'
	};

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpClient,
					useValue: mockHttpClient
				}
			]
		});
		service = TestBed.inject(FeatureService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('shoud return an observable for the feature requested', (done) => {
		const obs: Subject<ApiFeature> = new Subject<ApiFeature>();
		mockHttpClient.get.mockReturnValue(obs);
		service.getFeature(simpleResultApiFeature._id).subscribe((scs) => {
			expect(scs).toEqual(simpleResultApiFeature);
			done();
		});
		obs.next(simpleResultApiFeature);
	});
});
