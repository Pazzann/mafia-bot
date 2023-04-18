import {ChatInputCommandInteraction, Embed, EmbedBuilder} from "discord.js";
import BaseRole from "../../Classes/Roles/BaseRole";
import BaseCondition from "../../Classes/WinningConditions/BaseCondition";
import {ILangProps} from "./ILang";

export default interface IHostGameProps {
    author: string;
    users: string[];
    id: number;
    channel: string;
    timeout: ReturnType<typeof setTimeout>;
    interaction: ChatInputCommandInteraction;
    roles: BaseRole[];
    conditions: BaseCondition[];
    embed: EmbedBuilder;
    hostLocale: ILangProps;
}