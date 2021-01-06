import { Injectable } from "@angular/core";
import { SocketRoomManger } from "src/app/services/synchronizer/socket-room-manager";
import { SocketioConnectorService } from "src/app/services/synchronizer/socketio-connector/socketio-connector.service";

@Injectable({
  providedIn: "root",
})
export class ProjectSynchronizationManager extends SocketRoomManger {
  constructor(private _socket: SocketioConnectorService) {
    super("project", _socket);
  }
}
