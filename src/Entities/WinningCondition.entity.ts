import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Langs} from "../types/Langs";
import User from "./User.entity";

@Entity("conditions")
export default class WinningCondition extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.conditions)
    user: User;


}