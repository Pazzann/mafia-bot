import {EmbedBuilder} from "discord.js";
import IHostGameProps from "../types/interfaces/IHost";

export default function usersRedraw(users: string[], embed: EmbedBuilder, host: IHostGameProps) {
    let a = "";
    users.map(item=>{
        a += `<@${item}> \n`
    })

    embed.setDescription(`**${host.hostLocale.game_created_autocancel}:** <t:${Math.floor(Date.now()/1000) + 600}:R>\n**${host.hostLocale.game_created_gameHost}:** <@${host.author}>\n\n__**${host.hostLocale.game_created_votes}:**__ \`${!host.voteVisible}\`\n\n__**${host.hostLocale.game_created_playerList}:**__ \n ${a}`)
    return embed;
}