import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import WebSocket, { WebSocketServer } from "ws";

import { registerUser } from "./controllers/registerUser/registerUser";
import { RequestType } from "./interfaces/server.interface";

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

const users = [];

wss.on("connection", function connection(ws: WebSocket) {
  ws.on("error", console.error);

  ws.on("message", function message(message: string) {
    const parsedMessage = JSON.parse(message);
    const data = JSON.parse(parsedMessage.data);
    switch (parsedMessage.type) {
      case RequestType.REG:
        registerUser(data, ws);
        break;

      default:
        break;
    }
  });

  //   ws.send("something");
});
