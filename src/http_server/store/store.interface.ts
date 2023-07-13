export interface IUser {
  name: string;
  password: string;
}

export interface IRooms {
  roomId: number;
  roomUsers: IRoomUsers[];
}

export interface IRoomUsers {
  name: string;
  index: number;
}

export interface IRoomUsers {
  name: string;
  index: number;
}

export interface IGame {
  gameId: number;
  roomUsers: IRoomUsers[];
}

export interface IShipsData {
  gameId: number;
  userId: number;
  ships: IShips[];
}

export interface IShips {
  position: IPoint;
  direction: boolean;
  type: TypeShips;
  length: number;
}

export type TypeShips = "huge" | "large" | "small" | "medium";

export interface IPoint {
  x: number;
  y: number;
}

export interface IShipsDetails {
  shipsPoints: IPoint[];
  missPoints: IPoint[];
}

export interface IAllShips {
  ships: IShipsDetails[];
  playerId: number;
}
