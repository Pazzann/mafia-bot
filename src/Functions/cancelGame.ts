import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import {curHostGames} from "../index";
import getDisabledButtons from "./SelectRows/getDisabledButtons";

export default function cancelGame(interaction: ChatInputCommandInteraction, id: number){
    if(curHostGames.has(id))
        curHostGames.delete(id);

    interaction.editReply({components: getDisabledButtons(id), content: "**Превышено время ожидание!**"}).catch(()=>{});

}