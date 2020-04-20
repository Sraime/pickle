import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiFeature } from './api-feature.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class FeatureService {
	constructor(private http: HttpClient) {}

	getFeature(featureId: string): Observable<ApiFeature> {
		return this.http.get<ApiFeature>(environment.api.feature.url + '/' + featureId);
	}
}
