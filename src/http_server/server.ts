import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { WebSocketServer } from "ws";

import { registerUser } from "./controllers/registerUser/registerUser";
import { createRoom } from "./controllers/createRoom/createRoom";
import { createGame } from "./controllers/createGame/createGame";
import { addShips } from "./controllers/addShips/addShips";
import { RequestType, WebSocketApp } from "./interfaces/server.interface";

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(""));
  const file_path =
    __dirname + (req.url === "/" ? "/front/index.html" : "/front" + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

export const server = http.createServer(function (req, res) {
  res.writeHead(200);
  res.end();
});

server.listen(3000);

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws: WebSocketApp) {
  ws.on("error", console.error);

  ws.on("message", function message(message: string) {
    const parsedMessage = JSON.parse(message);
    console.log(parsedMessage);
    switch (parsedMessage.type) {
      case RequestType.REG:
        const userData = JSON.parse(parsedMessage.data);
        registerUser(userData, ws);
        break;
      case RequestType.CREATEROOM:
        createRoom(ws, wss);
        break;
      case RequestType.ADDUSERTOROOM:
        const gameData = JSON.parse(parsedMessage.data);
        createGame(ws, gameData.indexRoom, wss);
        break;
      case RequestType.ADDSHIPS:
        const shipsData = JSON.parse(parsedMessage.data);
        addShips(ws, shipsData, wss);
        break;
      default:
        break;
    }
  });

  //   ws.send("something");
});
