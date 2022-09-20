import User from "./user";

export default interface MafiaGame{
    users: Array<User>;
    author: string;
    day: number;
    id: number
    mafiacount: number;
    stage: "chossing" | "discussion",
    votedToCheck: {
        police: string | null | "noPolice";
        doctor: string | null | "noDoctor";
        mafia: Array<{mafia: string; target: string}>;
        killer: string | null | "noKiller";
        mistress: string | null | "noMistress";
        beautiful: string | null | "noBeautiful" | "notThatMove";
    }
    votedToKick: vote[];
    finished: boolean;
}
interface vote{
    userid: string;
    forwhom: string;
}