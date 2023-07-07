import { RequestType, WebSocketApp } from "../../interfaces/server.interface";
import { addUserToRoom, rooms } from "../../store/rooms";
import { addGame, games } from "../../store/games";
import { WebSocket, WebSocketServer } from "ws";

export const createGame = (
  ws: WebSocketApp,
  indexRoom: number,
  wss: WebSocketServer
) => {
  const currentUserId = ws?.userId;
  const currentRoom = rooms.find((room) => room.roomId === indexRoom);
  const firstPlayerId = currentRoom.roomUsers[0].index;

  if (currentUserId !== firstPlayerId) {
    console.log(currentUserId, firstPlayerId, rooms);
    addUserToRoom(indexRoom, currentUserId);

    console.log(firstPlayerId);
    const gameId = games.length + 1;
    addGame(gameId, currentRoom.roomUsers);

    ws.send(
      JSON.stringify({
        type: RequestType.CREATEGAME,
        data: JSON.stringify({
          idGame: gameId,
        }),
        id: 0,
      })
    );

    (wss.clients as Set<WebSocketApp>).forEach((client) => {
      if (client.userId === firstPlayerId) {
        client.send(
          JSON.stringify({
            type: RequestType.CREATEGAME,
            data: JSON.stringify({
              idGame: gameId,
            }),
            id: 0,
          })
        );
      }
    });
  }
};
