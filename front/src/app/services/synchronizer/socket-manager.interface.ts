export interface SynchronizedData {}
export interface SocketManager {
  synchonizationEnabled(): boolean;
  enableSynchronization(): void;
  disableSynchronization(): void;
  pushEventData(eventName: string, data: SynchronizedData);
  addEventCallback(
    eventName: string,
    callback: (data: SynchronizedData) => void
  );
}
