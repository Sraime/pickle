import { SocketManagerService } from "./socket-manager/socket-manager.service";

export interface SynchronizedData {}
export abstract class SocketEventSynchronizer<D extends SynchronizedData> {
  private isListening = false;
  constructor(
    private _socketManager: SocketManagerService,
    private _eventName: string
  ) {
    this.startEventSynchro();
  }

  startEventSynchro() {
    this._socketManager.addListenedEvent(this._eventName);
    this.isListening = true;
  }

  stopEventSynchro() {}

  pushData(data: D) {
    if (!this.isListening) {
      throw new Error(
        "Synchronization is not active for type " + this._eventName
      );
    }
    this._socketManager.pushEventData(this._eventName, data);
  }

  synchonizationEnabled(): boolean {
    return this._socketManager.synchonizationEnabled() && this.isListening;
  }

  addCallback(callback: (d: D) => void) {
    this._socketManager.addEventCallback(this._eventName, callback);
  }
}
