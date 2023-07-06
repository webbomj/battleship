import WebSocket from "ws";
import { changeUsers, users } from "../../store/users";
import { IUser } from "../../store/users.interface";
import { createUserResponse } from "../../services/user/userService";
import { RequestType } from "../../interfaces/server.interface";

export const registerUser = (data: IUser, ws: WebSocket) => {
  console.log("received: %s", data);
  changeUsers([...users, data]);

  const userResponse = createUserResponse(data.name);

  ws.send(
    JSON.stringify({
      type: RequestType.REG,
      data: JSON.stringify(userResponse),
      id: 0,
    })
  );
};
