import { IUserResponse } from "./userService.interface";
import { users } from "../../store/users";

export const createUserResponse = (name: string): IUserResponse => {
  const userIndex = users.findIndex((user) => user.name === name);
  return {
    name,
    error: false,
    errorText: "",
    index: userIndex,
  };
};
