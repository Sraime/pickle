import { TestBed } from '@angular/core/testing';

import { FeatureUpdaterService } from './feature-updater.service';
import { FeatureUpdateData } from '../../../interfaces/feature-update-data.interface';
import { BoardSocketSynchro } from '../../boardSynchronizer/board-socket-synchro.service';
import { Subject } from 'rxjs';
jest.mock('../../boardSynchronizer/board-socket-synchro.service');

describe('FeatureUpdaterService', () => {
	const mockSocketSynchroService: jest.Mocked<BoardSocketSynchro> = new BoardSocketSynchro() as jest.Mocked<
		BoardSocketSynchro
	>;
	let service: FeatureUpdaterService;
	const featureUpdateTypeCreate: FeatureUpdateData = {
		name: 'test'
	};
	const subjectSynchroEvent: Subject<FeatureUpdateData> = new Subject<FeatureUpdateData>();

	mockSocketSynchroService.getFeatureUpdateObservable.mockReturnValue(subjectSynchroEvent);
	beforeEach(() =>
		TestBed.configureTestingModule({
			providers: [
				{
					provide: BoardSocketSynchro,
					useValue: mockSocketSynchroService
				}
			]
		})
	);

	beforeEach(() => {
		service = TestBed.get(FeatureUpdaterService);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
	it('should dispatch the event when the synchro service dispatch one', (done) => {
		service.getObservable().subscribe((data) => {
			expect(data).toEqual(featureUpdateTypeCreate);
			done();
		});
		subjectSynchroEvent.next(featureUpdateTypeCreate);
	});

	describe('synchro enabled', () => {
		beforeAll(() => {
			mockSocketSynchroService.synchonizationEnabled.mockReturnValue(true);
		});

		it('should dispatch to the synchroniser', () => {
			service.updateData(featureUpdateTypeCreate);
			expect(mockSocketSynchroService.dispatchFeatureUpdate).toHaveBeenCalledWith(
				featureUpdateTypeCreate
			);
		});
	});

	describe('synchro enabled', () => {
		beforeAll(() => {
			mockSocketSynchroService.synchonizationEnabled.mockReturnValue(false);
		});

		it('should dispatch localy when the synchronisation is disabled', (done) => {
			service.getObservable().subscribe((data) => {
				expect(data).toEqual(featureUpdateTypeCreate);
				done();
			});
			service.updateData(featureUpdateTypeCreate);
		});
	});
});
