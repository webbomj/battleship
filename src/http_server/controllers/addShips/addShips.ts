import { WebSocketServer } from "ws";
import { RequestType, WebSocketApp } from "../../interfaces/server.interface";
import {
  addShipsData,
  createMissPoints,
  createShip,
  createAllShipsData,
  addAllShipsData,
  allShips,
  startShipsData,
} from "../../store/ships";
import { IShipsData, IShipsDetails } from "../../store/store.interface";

export const addShips = (
  ws: WebSocketApp,
  shipsData: IShipsData,
  wss: WebSocketServer
) => {
  console.log(ws.userId, ws.roomId, shipsData);
  if (typeof ws.userId != "number" || typeof ws.roomId != "number") return;

  const roomId = ws.roomId;

  addShipsData({...shipsData, userId: ws.userId});

  console.log('shipssss', startShipsData[0], startShipsData[1])

  const arrayShipsDetails: IShipsDetails[] = [];

  shipsData.ships.forEach((ship) => {
    const shipsPoints = createShip(ship);
    const missPoints = createMissPoints(shipsPoints);

    const shipsDetails: IShipsDetails = {
      missPoints,
      shipsPoints,
    };

    arrayShipsDetails.push(shipsDetails);
  });

  const allShipsData = createAllShipsData(arrayShipsDetails, ws.userId);

  addAllShipsData(allShipsData);
  //   console.log(allShips, startShipsData, roomId);
  
  console.log(allShips, allShips.length);
  if (allShips.length > 1) {
    (wss.clients as Set<WebSocketApp>).forEach((client) => {
      if (client.roomId === roomId) {
        console.log("da", client.userId, startShipsData[0].userId, startShipsData[1].userId);
        client.send(
          JSON.stringify({
            type: RequestType.STARTGAME,
            data: JSON.stringify({
              ships:
                startShipsData[0].userId === client.userId
                  ? startShipsData[0].ships
                  : startShipsData[1].ships,
              currentPlayerIndex: startShipsData[0].userId === client.userId
              ? startShipsData[0].userId
              : startShipsData[1].userId,
            }),
            id: 0,
          })
        );
        client.send(
          JSON.stringify({
            type: RequestType.TURN,
            data: JSON.stringify({
            //  currentPlayer: 1
             currentPlayer: startShipsData[0].userId
            }),
            id: 0,
          })
        );
      }
    });
  }
};
