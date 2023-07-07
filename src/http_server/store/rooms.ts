import { IRoomUsers, IRooms, IUser } from "./store.interface";
import { users } from "./users";

export let rooms: IRooms[] = [];

export const addRoom = (newRoom: IRooms) => {
  rooms.push(newRoom);
};

export const addUserToRoom = (roomId: number, userId: number) => {
  const user = users[userId];
  const adaptUser: IRoomUsers = { index: userId, name: user.name };
  const currentRoom = rooms.find((room) => room.roomId === roomId);
  currentRoom.roomUsers = [...currentRoom.roomUsers, adaptUser];
  const roomsWithoutCurrent = rooms.filter((room) => room.roomId !== roomId);
  rooms = [...roomsWithoutCurrent, currentRoom];
};
