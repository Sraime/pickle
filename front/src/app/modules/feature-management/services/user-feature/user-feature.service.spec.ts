import { TestBed } from '@angular/core/testing';

import { UserFeatureService } from './user-feature.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpOptionsBuilder } from 'src/app/modules/auth/libs/HttpOptionsBuilder/HttpOptionsBuilder';
import { ApiFeature } from 'src/app/modules/board/services/api/feature/api-feature.interface';
import { Observable } from 'rxjs';

jest.mock('@angular/common/http');
jest.mock('src/app/modules/auth/libs/HttpOptionsBuilder/HttpOptionsBuilder');

const mockHttpClient: jest.Mocked<HttpClient> = new HttpClient(null) as jest.Mocked<HttpClient>;
const mockHttpOptionsBuilder: jest.Mocked<HttpOptionsBuilder> = new HttpOptionsBuilder() as jest.Mocked<
	HttpOptionsBuilder
>;

describe('UserFeatureService', () => {
	let service: UserFeatureService;
	const httpOptions: HttpHeaders = {} as HttpHeaders;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [
				{
					provide: HttpClient,
					useValue: mockHttpClient
				},
				{
					provide: HttpOptionsBuilder,
					useValue: mockHttpOptionsBuilder
				}
			]
		});
		service = TestBed.inject(UserFeatureService);
	});

	beforeEach(() => {
		mockHttpOptionsBuilder.getHeader.mockReturnValue(httpOptions);
	});

	afterEach(() => {
		mockHttpClient.get.mockClear();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	describe('getUserFeatures', () => {
		localStorage.setItem('pseudo', 'bob');
		it('should request the API with the builded in header', (done) => {
			const resultHttpService = new Observable((subscriber) => {
				subscriber.next([]);
			});
			mockHttpClient.get.mockReturnValue(resultHttpService);
			service.getUserFeatures().subscribe((data) => {
				expect(mockHttpClient.get).toHaveBeenCalledWith('http://localhost:3000/user/bob/feature', {
					headers: {}
				});
				done();
			});
		});
		it('should return an observable with the api', (done) => {
			const featureApiResults: ApiFeature[] = [{ name: 'F1', _id: 'xxx' }];
			const resultHttpService = new Observable((subscriber) => {
				subscriber.next(featureApiResults);
			});
			mockHttpClient.get.mockReturnValue(resultHttpService);
			service.getUserFeatures().subscribe((data) => {
				expect(data).toEqual(featureApiResults);
				done();
			});
		});
	});
});
