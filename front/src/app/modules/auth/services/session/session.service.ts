import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class SessionService {
  sessionData: Map<string, any> = new Map<string, any>();
  updateEvent: Subject<Map<string, any>> = new Subject<Map<string, any>>();

  constructor() {
    this.loadLocalStorage();
  }

  loadLocalStorage() {
    for (let i = 0, lasti = localStorage.length; i < lasti; i++) {
      const storageKey = localStorage.key(i);
      this.sessionData.set(
        storageKey,
        JSON.parse(localStorage.getItem(storageKey))
      );
    }
    this.emitSessionUpdateEvent();
  }

  getSessionData(dataKey: string): any {
    return this.sessionData.get(dataKey);
  }

  setSessionData(dataKey: string, data: any) {
    this.sessionData.set(dataKey, data);
    this.emitSessionUpdateEvent();
    localStorage.setItem(dataKey, JSON.stringify(data));
  }

  removeSessionData(dataKey: string) {
    this.sessionData.delete(dataKey);
    localStorage.removeItem(dataKey);
  }

  clearSession() {
    this.sessionData = new Map<string, any>();
    localStorage.clear();
    this.emitSessionUpdateEvent();
  }

  private emitSessionUpdateEvent() {
    this.updateEvent.next(this.sessionData);
  }

  getSessionEventUpdate(): Observable<Map<string, any>> {
    return this.updateEvent;
  }
}
