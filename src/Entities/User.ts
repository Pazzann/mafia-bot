import {BaseEntity, Column, Entity, PrimaryColumn} from "typeorm";
import {Langs} from "../types/Langs";

@Entity("users")
export default class User extends BaseEntity{
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
}