import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiCodeblock } from './api-codeblock.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class CodeblockService {
	constructor(private http: HttpClient) {}

	getCodeblocksFeature(featureId): Observable<ApiCodeblock[]> {
		return this.http.get<ApiCodeblock[]>(
			environment.api.feature.url + '/' + featureId + '/codeblock'
		);
	}
}
