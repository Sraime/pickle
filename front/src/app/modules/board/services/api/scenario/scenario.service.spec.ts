import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { ScenarioService } from './scenario.service';
import { of, Subject } from 'rxjs';
import { ApiScenario } from './api-scenario.interface';

jest.mock('@angular/common/http');

describe('ScenarioService', () => {
	let service: ScenarioService;
	const mockHttpClient: jest.Mocked<HttpClient> = new HttpClient(null) as jest.Mocked<HttpClient>;
	const simpleGetResult: ApiScenario[] = [
		{
			_id: 'xxx',
			name: 's1',
			givenSteps: [],
			whenSteps: [],
			thenSteps: []
		}
	];
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpClient,
					useValue: mockHttpClient
				}
			]
		});
		service = TestBed.inject(ScenarioService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('shoud return an observable for the scenarios request', (done) => {
		const obs: Subject<ApiScenario[]> = new Subject<ApiScenario[]>();
		mockHttpClient.get.mockReturnValue(obs);
		service.getScenariosFeature('xxx').subscribe((scs) => {
			expect(scs).toEqual(simpleGetResult);
			done();
		});
		obs.next(simpleGetResult);
	});
});
