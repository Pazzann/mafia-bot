import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import {curHostGames} from "../index";
import getDisabledButtons from "./getDisabledButtons";
import {ILangProps} from "../types/interfaces/ILang";

export default function cancelGame(interaction: ChatInputCommandInteraction, id: number, locale: ILangProps){
    if(curHostGames.has(id))
        curHostGames.delete(id);

    interaction.reply({components: getDisabledButtons(id, locale), content: `**${locale.auto_cancel_content_message}**`}).catch(()=>{});

}