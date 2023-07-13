import { IRooms } from "../../store/store.interface";
import { rooms, addRoom } from "../../store/rooms";
import { users } from "../../store/users";

export const createRoomResponse = (userId: number): IRooms => {
  const { name } = users[userId];
  const newUser = { index: userId, name };
  const roomId = rooms.length + 1;
  const newRoom: IRooms = { roomId, roomUsers: [newUser] };
  addRoom(newRoom);

  return {
    roomId,
    roomUsers: [newUser],
  };
};

export const getFreeRooms = (): IRooms[] => {
  return rooms
};
