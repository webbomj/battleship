import { getFreeRooms } from "../../services/room/roomService";
import { WebSocketApp } from "../../interfaces/server.interface";
import { WebSocketServer } from "ws";

export const updateRoom = (ws: WebSocketApp) => {
  const freeRooms = getFreeRooms();

  ws.send(
    JSON.stringify({
      type: "update_room",
      data: JSON.stringify(freeRooms),
      id: 0,
    })
  );
};
