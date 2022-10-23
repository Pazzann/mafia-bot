import IUserProps from "./IUser";

export default interface IMafiaGameProps {
    users: Array<IUserProps>;
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
    }
    votedToKick: IVoteProps[];
    finished: boolean;
}
interface IVoteProps{
    userid: string;
    forwhom: string;
}