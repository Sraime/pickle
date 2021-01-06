import io from "socket.io-client";
import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Injectable } from "@angular/core";
import { SynchronizedData } from "../socket-manager.interface";
import { SocketConnector } from "../socket-room-manager";

interface EventConfig {
  subject: Subject<SynchronizedData>;
  callbacks: ((data: SynchronizedData) => void)[];
}

@Injectable({
  providedIn: "root",
})
export class SocketioConnectorService implements SocketConnector {
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

  enableSynchronization() {
    this._socket = io(this._socketUrl, {});
    console.log("socket initialized");
    this._eventHandlers.forEach((eventConfig, eventName) => {
      this.startListeningEvent(eventName);
    });
  }

  disableSynchronization() {
    if (this._socket) {
      this._socket.close();
    }
  }

  pushEventData(eventName: string, data: SynchronizedData) {
    console.log("socket push", eventName, data);
    this._socket.emit(eventName, data);
  }

  addEventCallback(
    eventName: string,
    callback: (data: SynchronizedData) => void
  ) {
    if (!this._eventHandlers.has(eventName)) {
      this.addListenedEvent(eventName);
    }
    const eventConfig: EventConfig = this._eventHandlers.get(eventName);
    eventConfig.callbacks.push(callback);
  }

  removeEventCallbacks(eventName: string) {
    this._eventHandlers.delete(eventName);
  }

  private addListenedEvent<SynchronizedData>(eventName: string) {
    if (this._eventHandlers.has(eventName))
      throw new Error("event type already listened");
    const eventHandler = new Subject<SynchronizedData>();
    const eventConfig: EventConfig = { subject: eventHandler, callbacks: [] };
    this._eventHandlers.set(eventName, eventConfig);
    if (this.synchonizationEnabled()) {
      this.startListeningEvent(eventName);
    }
  }

  private startListeningEvent<SynchronizedData>(eventName: string) {
    const eventConfig = this._eventHandlers.get(eventName);
    console.log("start litening", eventName);
    this._socket.on(eventName, (data: SynchronizedData) => {
      console.log("receive event data", eventName, data);
      eventConfig.callbacks.forEach((callback) => {
        callback(data);
      });
    });
  }
}
