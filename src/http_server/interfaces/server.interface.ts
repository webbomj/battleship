import WebSocket from "ws";
import { WebSocketServer } from "ws";
import http from "node:http";

export enum RequestType {
  REG = "reg",
  CREATEROOM = "create_room",
}

export interface WebSocketApp extends WebSocket {
  userId?: number;
  userName?: string;
  roomId?: number;
}
