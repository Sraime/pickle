import { TestBed } from '@angular/core/testing';

import { ScenarioUpdaterService } from './scenario-updater.service';

describe('ScenarioUpdaterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ScenarioUpdaterService = TestBed.get(ScenarioUpdaterService);
    expect(service).toBeTruthy();
  });
});
