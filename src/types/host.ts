import {ChatInputCommandInteraction} from "discord.js";

export default interface HostGame{
    author: string;
    users: string[];
    id: number;
    channel: string;
    timeout: ReturnType<typeof setTimeout>;
    interaction: ChatInputCommandInteraction;
}