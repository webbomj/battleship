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

  ws.send(
    JSON.stringify({
      type: "update_room",
      data: JSON.stringify(roomResponse),
      id: 0,
    })
  );

  const freeRooms = getFreeRooms();

  wss.clients.forEach((client) => {
    client.send(
      JSON.stringify({
        type: "update_room",
        data: JSON.stringify(freeRooms),
        id: 0,
      })
    );
  });
};
