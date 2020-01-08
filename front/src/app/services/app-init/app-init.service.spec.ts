import { TestBed } from '@angular/core/testing';

import { AppInitService } from './app-init.service';
import { HttpClient } from '@angular/common/http';
import { FeatureToggleService } from '../feature-toggle/feature-toggle.service';

describe('AppInitService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: HttpClient,
        useValue: () => jest.fn()
      },
      {
        provide: FeatureToggleService,
        feature: {}
      }
    ]
  }));

  it('should be created', () => {
    const service: AppInitService = TestBed.get(AppInitService);
    expect(service).toBeTruthy();
  });
});
