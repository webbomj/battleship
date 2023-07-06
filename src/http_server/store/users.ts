import { IUser } from "./users.interface";

export let users: IUser[] = [];

export const changeUsers = (newUsers: IUser[]) => (users = newUsers);
