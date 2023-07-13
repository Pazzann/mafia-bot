import {BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn} from "typeorm";
import {Langs} from "../types/Langs";
import WinningCondition from "./WinningCondition.entity";
import Role from "./Role.entity";
import Game from "./Game.entity";

@Entity("users")
export default class User extends BaseEntity {
    @PrimaryColumn({type:"varchar"})
    userid: string;
    @Column({type:"varchar"})
    lang: Langs;
    @Column()
    totalGames: number;
    @Column()
    totalWins: number;
    @Column({type: "date"})
    since: string;
    @OneToMany(()=> WinningCondition, (condition) => condition.user)
    conditions: WinningCondition[];
    @OneToMany(()=> Role, (role) => role.user)
    customRoles: Role[];
    @ManyToMany(()=> Game, (game) => game.players)
    games: Game[];
    @Column({type: "boolean", default: false})
    premium: boolean;
    @Column({type: "boolean", default: false})
    notifications: boolean;
}