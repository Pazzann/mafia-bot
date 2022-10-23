import {ChatInputCommandInteraction} from "discord.js";

export default interface IHostGameProps {
    author: string;
    users: string[];
    id: number;
    channel: string;
    timeout: ReturnType<typeof setTimeout>;
    interaction: ChatInputCommandInteraction;
}