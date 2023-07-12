import WebSocket from "ws";

export enum RequestType {
  REG = "reg",
  CREATEROOM = "create_room",
  ADDUSERTOROOM = "add_user_to_room",
  CREATEGAME = "create_game",
  ADDSHIPS = "add_ships",
  STARTGAME = "start_game",
  TURN = "turn",
  UPDATEROOM = 'update_room'
}

export interface WebSocketApp extends WebSocket {
  userId?: number;
  userName?: string;
  roomId?: number;
}
