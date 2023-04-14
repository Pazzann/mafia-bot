import {Embed, EmbedBuilder} from "discord.js";
import {ILangProps} from "../types/interfaces/ILang";
import IHostGameProps from "../types/interfaces/IHost";

export default function usersRedraw(users: string[], embed: EmbedBuilder, locale: ILangProps, host: IHostGameProps){
    let a = "";

    users.map(item=>{
        a += `<@${item}> \n`
    })
    embed.setDescription(`**${locale.create_autocancel}:** <t:${Math.floor(Date.now()/1000) + 600}:R>\n**${locale.create_game_owner}:** <@${host.author}>\n\n__**${locale.create_player_list}:**__ \n ${a}`)

    return embed;
}