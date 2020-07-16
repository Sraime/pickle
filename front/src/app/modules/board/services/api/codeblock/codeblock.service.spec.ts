import { TestBed } from '@angular/core/testing';

import { HttpClient } from '@angular/common/http';
import { CodeblockService } from './codeblock.service';
import { of, Subject } from 'rxjs';
import { ApiCodeblock } from './api-codeblock.interface';

jest.mock('@angular/common/http');

describe('ScenarioService', () => {
	let service: CodeblockService;
	const mockHttpClient: jest.Mocked<HttpClient> = new HttpClient(null) as jest.Mocked<HttpClient>;
	const simpleGetResult: ApiCodeblock[] = [
		{
			_id: 'xxx',
			name: 's1',
			isBackground: false,
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
		service = TestBed.inject(CodeblockService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('shoud return an observable for the codeblocks request', (done) => {
		const obs: Subject<ApiCodeblock[]> = new Subject<ApiCodeblock[]>();
		mockHttpClient.get.mockReturnValue(obs);
		service.getCodeblocksFeature('xxx').subscribe((scs) => {
			expect(scs).toEqual(simpleGetResult);
			done();
		});
		obs.next(simpleGetResult);
	});
});
