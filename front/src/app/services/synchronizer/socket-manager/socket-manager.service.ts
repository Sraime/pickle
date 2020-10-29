import io from "socket.io-client";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { SynchronizedData } from "../socket-event-synchronizer";
import { Injectable } from "@angular/core";

interface EventConfig {
  subject: Subject<SynchronizedData>;
  callbacks: ((data: SynchronizedData) => void)[];
}

@Injectable({
  providedIn: "root",
})
export class SocketManagerService {
  private _socket = null;

  private _socketUrl: string = environment.socket.board.url;

  private _eventHandlers: Map<string, EventConfig> = new Map<
    string,
    EventConfig
  >();

  constructor() {}

  synchonizationEnabled(): boolean {
    return this._socket && this._socket.connected;
  }

  enableSynchronization(featureId: string) {
    this._socket = io(this._socketUrl, {
      query: { featureId },
    });
    this._eventHandlers.forEach((eventConfig, eventName) => {
      this.startListeningEvent(eventName);
    });
  }

  disableSynchronization() {
    if (this._socket) {
      this._socket.close();
    }
  }

  addListenedEvent<SynchronizedData>(eventName: string) {
    if (this._eventHandlers.has(eventName))
      throw new Error("event type already listened");
    const eventHandler = new Subject<SynchronizedData>();
    const eventConfig: EventConfig = { subject: eventHandler, callbacks: [] };
    this._eventHandlers.set(eventName, eventConfig);
    if (this.synchonizationEnabled()) {
      this.startListeningEvent(eventName);
    }
  }

  startListeningEvent<SynchronizedData>(eventName: string) {
    const eventConfig = this._eventHandlers.get(eventName);
    this._socket.on(eventName, (data: SynchronizedData) => {
      eventConfig.callbacks.forEach((callback) => {
        callback(data);
      });
    });
  }

  pushEventData(eventName: string, data: SynchronizedData) {
    if (!this._eventHandlers.has(eventName))
      throw new Error("event type is not handled");
    this._socket.emit(eventName, data);
  }

  addEventCallback(
    eventName: string,
    callback: (data: SynchronizedData) => void
  ) {
    const eventConfig: EventConfig = this._eventHandlers.get(eventName);
    if (!eventConfig) throw new Error("event type is not handled");
    eventConfig.callbacks.push(callback);
  }
}
