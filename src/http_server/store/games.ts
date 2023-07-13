import { IGame, IRoomUsers } from "./store.interface";

export let games: IGame[] = [];

export const addGame = (gameId: number, roomUsers: IRoomUsers[]) => {
  games.push({ gameId, roomUsers });
};
