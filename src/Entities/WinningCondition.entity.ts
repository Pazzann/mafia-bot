import {BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import User from "./User.entity";

@Entity("conditions")
export default class WinningCondition extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(() => User, (user) => user.conditions)
    user: User;
    @Column({type: "varchar"})
    name: string;
    @Column({type: "varchar"})
    condition: string;
    @Column({type: "varchar"})
    embedTitle: string;
    @Column({type: "varchar"})
    embedDescription: string;
    @Column({type: "varchar"})
    embedThumbnail: string;
    @Column({type: "varchar"})
    winRole: string;
}