import { changeUsers, users } from "../../store/users";
import { IUser } from "../../store/store.interface";
import { createUserResponse } from "../../services/user/userService";
import { RequestType, WebSocketApp } from "../../interfaces/server.interface";
import { rooms } from "../../store/rooms";
import { updateRoom } from "../createRoom/updateRoom";

export const registerUser = (data: IUser, ws: WebSocketApp) => {
  console.log("received: %s", data);
  changeUsers([...users, data]);

  const userResponse = createUserResponse(data.name);

  ws.userId = userResponse.index;

  ws.send(
    JSON.stringify({
      type: RequestType.REG,
      data: JSON.stringify(userResponse),
      id: 0,
    })
  );

  if (rooms.length) {
    updateRoom(ws);
  }
};
