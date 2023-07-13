import {BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./User.entity";

@Entity("game")
export default class Game extends BaseEntity {
    @PrimaryGeneratedColumn()
    public autoGeneratedId: number;
    @Column({type: "int"})
    public id: number;
    @Column({type: "varchar"})
    public guildId: string;
    @ManyToMany(() => User)
    @JoinTable()
    public winners: User[];
    @ManyToMany(() => User, (user) => user.games)
    @JoinTable()
    public players: User[];
}