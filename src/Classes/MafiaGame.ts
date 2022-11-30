import MafiaUser from "./MafiaUser";
import {discordBot} from "../index";
import User from "../Entities/User";
import BaseRole from "./Roles/BaseRole";
import shuffle from "../Functions/shuffle";
import ScriptEngine from "./ScriptEngine";
import {Langs} from "../types/Langs";
import BaseCondition from "./WinningConditions/BaseCondition";



export default class MafiaGame{
        public Players: MafiaUser[];
        private readonly _author: string;
        private _day: number;
        private readonly _id: number;
        private _stage:  "choosing" | "discussion";
        private _finished: boolean;
        private _roles: BaseRole[];
        private _winCond: BaseCondition[];

        constructor(id: number, author: string) {
                this._id = id;
                this._author = author;
                this._day = 0;
                this._stage = "choosing";
                this._finished = false;
        }

        public CheckEndGame(){

        }

        public async EndChooseMoveHandler(){

        }
        //not finished
        public async Choose(who: MafiaUser, whom: string): Promise<boolean>{
                if(!this.HasPlayer(whom))
                        return false;
                let whomU = this.GetUser(whom);
                if(!this._validateSelection(who, whomU))
                        return false;
                switch (this._stage){
                        case "choosing":{

                                break;
                        }
                        case "discussion":{

                                break;
                        }
                }
                return true;
        }
        private _validateSelection(who: MafiaUser, whom: MafiaUser): boolean{
                if(whom.isKilled == true)
                        return false;
                if(who.isKilled == true)
                        return false;
                return true;
        }
        public GetUser(id: string): MafiaUser{
                return this.Players.filter((p)=>p.id === id)[0];
        }
        public HasPlayer(id: string): boolean{
                return this.Players.filter((player)=>player.id === id).length > 0;
        }
        get author(){
                return this._author;
        }
        get id(){
                return this._id;
        }
        public GetAliveUsers(): MafiaUser[]{
                return this.Players.filter((player)=>player.isKilled == false);
        }
        public static GenerateId(): number{
                return Math.round(Math.random() * 10000);
        }
        public RegisterWins(wins: BaseCondition[]): BaseCondition[]{
                let validetadWins: BaseCondition[] = []
                for (let winCon of wins){
                        if(typeof ScriptEngine.WinningEngine(winCon.Condition, this.Players) === "boolean"){
                                validetadWins.push(winCon);
                        }
                }
                this._winCond = validetadWins;
                return validetadWins;
        }
        public async GenerateUsers(users: string[], roles: BaseRole[]): Promise<BaseRole[]> {
                let players: MafiaUser[] = [];
                users = shuffle(users);
                users = shuffle(users);
                users = shuffle(users);
                const totalUsers = users.length;
                let totalRoleCount = 0;
                for(let i = 0; i < roles.length; i++){
                        if(users.length >= roles[i].SpawnFrom){
                                if(String(roles[i].Count) === roles[i].Count){
                                        roles[i].Count = ScriptEngine.RoleCountCalc(roles[i].Count as string, users.length, totalRoleCount)
                                        if(isNaN(roles[i].Count as number)){
                                                roles.splice(i, 1);
                                                i--;
                                        }else{
                                                totalRoleCount += roles[i].Count as number;
                                        }
                                }else{
                                        totalRoleCount += roles[i].Count as number;
                                }
                                if(totalRoleCount > users.length){
                                        totalRoleCount = users.length;
                                        roles.splice(i+1,roles.length);
                                }
                        }else{
                                roles.splice(i,roles.length);
                        }
                }
                for (let role of roles){
                        for(let i = 0; i < role.Count; i++){
                                const dsUser = await discordBot.users.fetch(users[0])
                                const dbUser = await User.findOneBy({userid: users[0]});
                                let lang: Langs;
                                lang = dbUser.lang;
                                const player = new MafiaUser(users[0], lang, role, dsUser, dbUser)
                                players.push(player);
                                users.splice(0,1);
                                if(users.length==0)
                                        break;
                        }
                }
                this.Players = players;
                this._roles = roles;
                return roles;
        }
}