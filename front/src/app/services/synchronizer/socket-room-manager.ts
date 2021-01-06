import { SocketManager, SynchronizedData } from "./socket-manager.interface";

export interface SocketConnector extends SocketManager {
  removeEventCallbacks(eventName: string);
}

export abstract class SocketRoomManger implements SocketManager {
  private _roomId: String = null;
  private _registeredEvents: string[] = [];
  constructor(
    private _roomType: string,
    private _socketConnector: SocketConnector
  ) {}
  pushEventData(eventName: string, data: SynchronizedData) {
    if (!this.synchonizationEnabled())
      throw new Error("synhronization is not enabled");
    this._socketConnector.pushEventData(eventName, data);
  }
  addEventCallback(
    eventName: string,
    callback: (data: SynchronizedData) => void
  ) {
    this._socketConnector.addEventCallback(eventName, callback);
    this._registeredEvents.push(eventName);
  }

  synchonizationEnabled(): boolean {
    return this._socketConnector && this._roomId !== null;
  }

  enableRoomSynchronization(roomId: string) {
    this._roomId = roomId;
    this.enableSynchronization();
  }

  enableSynchronization(): void {
    if (!this._socketConnector.synchonizationEnabled()) {
      this._socketConnector.enableSynchronization();
    }
    this._socketConnector.pushEventData(this._roomType + "-join", {
      roomId: this._roomId,
    });
    this._registeredEvents.forEach((eventName) => {
      this._socketConnector.removeEventCallbacks(eventName);
    });
    this._registeredEvents = [];
  }

  disableSynchronization(): void {
    this.disableRoomSynchronization();
    this._socketConnector.disableSynchronization();
  }

  disableRoomSynchronization(): void {
    this._socketConnector.pushEventData("leave-" + this._roomType, {
      roomId: this._roomId,
    });
    this._roomId = null;
  }
}
