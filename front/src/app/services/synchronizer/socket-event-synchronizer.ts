import { SocketManager, SynchronizedData } from "./socket-manager.interface";
import { SocketioConnectorService } from "./socketio-connector/socketio-connector.service";

export abstract class SocketEventSynchronizer<D extends SynchronizedData> {
  constructor(
    private _socketManager: SocketManager,
    private _eventName: string
  ) {}

  pushData(data: D) {
    this._socketManager.pushEventData(this._eventName, data);
  }

  synchonizationEnabled(): boolean {
    return this._socketManager.synchonizationEnabled();
  }

  addCallback(callback: (d: D) => void) {
    this._socketManager.addEventCallback(this._eventName, callback);
  }
}
