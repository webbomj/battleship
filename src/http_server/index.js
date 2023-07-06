import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { WebSocketServer } from "ws";

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
  res.end(data);
});

server.listen(3000);

const wss = new WebSocketServer({ server });

wss.on("connection", function connection(ws) {
  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const dataJSON = JSON.parse(data);
    const dataDataJSON = JSON.parse(dataJSON.data);
    console.log("received: %s", dataJSON, dataDataJSON);
  });

  //   ws.send("something");
});
