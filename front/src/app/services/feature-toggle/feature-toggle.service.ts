import { Injectable } from '@angular/core';

export interface FeatureTypes {
  'auth': boolean;
}

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  public features: object;

  constructor() {}

  public isFeatureEnabled(feautureName: keyof FeatureTypes): boolean {
    const featureValue = this.features[feautureName];
    return featureValue as boolean;
  }
}
