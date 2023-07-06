import { IUser } from "./store.interface";

export let users: IUser[] = [];

export const changeUsers = (newUsers: IUser[]) => (users = newUsers);
