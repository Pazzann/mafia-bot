import {ButtonInteraction, ChatInputCommandInteraction} from "discord.js";
import {curHostGames} from "../index";
import getDisabledButtons from "./getDisabledButtons";
import {ILangProps} from "../types/interfaces/ILang";

export default function cancelGame(interaction: ChatInputCommandInteraction | ButtonInteraction, id: number, locale: ILangProps) {
    if (curHostGames.has(id))
        curHostGames.delete(id);

    interaction.editReply({components: getDisabledButtons(id, locale), content: `**${locale.game_autocancel_message}**`}).catch(()=>{});
}