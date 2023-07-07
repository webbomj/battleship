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
