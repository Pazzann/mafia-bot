import {BaseEntity, Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn} from "typeorm";
import {Langs} from "../types/Langs";
import User from "./User.entity";
import {Collection} from "discord.js";

@Entity("roles")
export default class Role extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.customRoles)
    user: User;
    @Column({type: "varchar"})
    name: string;
    @Column({type:"varchar"})
    action: string;
    @Column()
    delay: number;
    @Column({type: "boolean"})
    groupDec: boolean;
    @Column({type: "varchar"})
    count: string;
    @Column()
    spawnFrom: number;
    @Column({type: "varchar"})
    placeHolder: string;
    @Column({type: "varchar"})
    imageLink: string;
    @Column({type: "boolean"})
    selfSelectable: boolean;
    @Column({type: "varchar"})
    description: string;

}