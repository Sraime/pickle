import { Injectable } from '@angular/core';

export type featureTypes = {
  'auth': boolean;
};

@Injectable({
  providedIn: 'root'
})
export class FeatureToggleService {
  public features: Object;

  constructor() {}

  public isFeatureEnabled(feautureName: keyof featureTypes): boolean {
    const featureValue = this.features[feautureName];
    return featureValue as boolean;
  }
}