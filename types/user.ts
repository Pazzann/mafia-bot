import {Roles} from "./roles";

export default interface User{
    userTag: string;
    userid: string;
    role: Roles;
    isKilled: boolean;
}