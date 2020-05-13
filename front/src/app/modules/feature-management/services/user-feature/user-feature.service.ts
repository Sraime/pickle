import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { HttpOptionsBuilder } from 'src/app/modules/auth/libs/HttpOptionsBuilder/HttpOptionsBuilder';
import { ApiFeature } from 'src/app/modules/board/services/api/feature/api-feature.interface';

@Injectable({
	providedIn: 'root'
})
export class UserFeatureService {
	constructor(private http: HttpClient, private httpOptionsBuilder: HttpOptionsBuilder) {}

	userUrl = environment.api.user.url;

	getUserFeatures(): Observable<ApiFeature[]> {
		const h = this.httpOptionsBuilder.getHeader();
		return this.http
				.get<ApiFeature[]>(this.userUrl + '/' + localStorage.getItem('pseudo') + '/feature', {
					headers: h
				})
	}
}
