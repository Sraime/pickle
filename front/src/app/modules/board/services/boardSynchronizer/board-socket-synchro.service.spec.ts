import { TestBed } from '@angular/core/testing';

import { BoardSocketSynchro } from './board-socket-synchro.service';
import { SectionUpdateData } from '../../interfaces/section-update.interface';

jest.mock('socket.io-client');

import io from 'socket.io-client';
import { ScenarioUpdateData } from '../../interfaces/scenario-update-data.interface';
import { EventUpdateType } from '../../libs/EventUpdateType.enums';

describe('SynchroBoardService', () => {
	let service: BoardSocketSynchro;
	const listennedEvents = new Map<string, any>();
	const MockSocket = {
		emit: jest.fn(),
		close: jest.fn(),
		open: jest.fn(),
		connected: false,
		on: (event, callback) => {
			listennedEvents.set(event, callback);
		}
	};
	const sectionUpdate: SectionUpdateData = {
		steps: [],
		name: 'Given',
		codeBlockId: 'xx'
	};

	const scenarioUpdateTypeCreate: ScenarioUpdateData = {
		name: 'sc1',
		codeBlockId: 'xxx',
		updateType: EventUpdateType.CREATE
	};

	MockSocket.open.mockImplementation(() => {
		MockSocket.connected = true;
	});
	MockSocket.close.mockImplementation(() => {
		MockSocket.connected = false;
	});
	io.mockReturnValue(MockSocket);

	beforeEach(() => {
		TestBed.configureTestingModule({});
		service = TestBed.inject(BoardSocketSynchro);
	});
	it('should be created', () => {
		expect(service).toBeTruthy();
		expect(io).toHaveBeenCalled();
	});

	it('should have synchronization disabled by default', () => {
		expect(service.synchonizationEnabled()).toBeFalsy();
	});

	it('should enable synchronization', () => {
		service.startSynchronization();
		expect(MockSocket.open).toHaveBeenCalled();
		expect(service.synchonizationEnabled()).toBeTruthy();
	});

	it('should disable synchronization', () => {
		service.startSynchronization();
		service.stopSynchronization();
		expect(service.synchonizationEnabled()).toBeFalsy();
		expect(MockSocket.close).toHaveBeenCalled();
	});

	describe('init listen events', () => {
		it('should listend section-update events', () => {
			expect(listennedEvents.get('section-update')).toBeTruthy();
		});

		it('should listend scenario-update events', () => {
			expect(listennedEvents.get('scenario-update')).toBeTruthy();
		});
	});

	describe('dispatch actions', () => {
		describe('synchro disabled', () => {
			it('should throw an error when trying a dispatch section update', () => {
				expect(() => {
					service.dispatchSectionUpdate(sectionUpdate);
				}).toThrowError('Synchronization is not active');
			});

			it('should throw an error when trying a dispatch scenario update', () => {
				expect(() => {
					service.dispatchScenarioUpdate(scenarioUpdateTypeCreate);
				}).toThrowError('Synchronization is not active');
			});
		});

		describe('synchro enabled', () => {
			beforeEach(() => {
				service.startSynchronization();
			});
			afterEach(() => {
				service.stopSynchronization();
			});

			it('should emit updated data when trying a dispatch section update', () => {
				service.dispatchSectionUpdate(sectionUpdate);
				expect(MockSocket.emit).toHaveBeenCalledWith('section-update', sectionUpdate);
			});

			it('should emit updated data when trying a dispatch scenario update', () => {
				service.dispatchScenarioUpdate(scenarioUpdateTypeCreate);
				expect(MockSocket.emit).toHaveBeenCalledWith('scenario-update', scenarioUpdateTypeCreate);
			});
		});
	});

	describe('update events received', () => {
		it('should receive updated data on section-update event', (done) => {
			service.getSectionUpdateObservable().subscribe((data) => {
				expect(data).toEqual(sectionUpdate);
				done();
			});
			listennedEvents.get('section-update')(sectionUpdate);
		});

		it('should receive updated data on scenario-update event', (done) => {
			service.getScenarioUpdateObservable().subscribe((data) => {
				expect(data).toEqual(scenarioUpdateTypeCreate);
				done();
			});
			listennedEvents.get('scenario-update')(scenarioUpdateTypeCreate);
		});
	});
});
