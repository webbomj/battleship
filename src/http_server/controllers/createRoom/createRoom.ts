import {
  createRoomResponse,
  getFreeRooms,
} from "../../services/room/roomService";
import { WebSocketApp } from "../../interfaces/server.interface";
import { WebSocketServer } from "ws";
import { rooms } from "../../store/rooms";

export const createRoom = (ws: WebSocketApp, wss: WebSocketServer) => {
  const roomResponse = createRoomResponse(ws?.userId);
  ws.roomId = roomResponse.roomId;

  const freeRooms = getFreeRooms();

  // ws.send(
  //   JSON.stringify({
  //     type: "update_room",
  //     data: JSON.stringify(freeRooms),
  //     id: 0,
  //   })
  // );

  

  (wss.clients as Set<WebSocketApp>).forEach((client) => {
    // client.roomId = roomResponse.roomId;
    client.send(
      JSON.stringify({
        type: "update_room",
        data: JSON.stringify(freeRooms),
        id: 0,
      })
    );
  });
};
