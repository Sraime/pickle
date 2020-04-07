import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiScenario } from './api-scenario.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScenarioService {

  constructor(private http: HttpClient) { }

  getScenariosFeature() : Observable<ApiScenario[]> {
    return this.http.get<ApiScenario[]>(environment.api.scenario.url);
  }
}
