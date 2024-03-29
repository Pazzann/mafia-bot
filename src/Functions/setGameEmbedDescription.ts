import IHostGameProps from "../types/interfaces/IHost";

export default function setGameEmbedDescription(host: IHostGameProps, isCancelled: boolean = false) {
    let a = host.users.reduce((previous, item)=> previous + `<@${item}>\n`, "");
    host.embed.setDescription(`${isCancelled ? "" : `**${host.hostLocale.game_created_autocancel}:** <t:${Math.floor(Date.now()/1000) + 600}:R>\n`}**${host.hostLocale.game_created_gameHost}:** <@${host.author}>\n\n__**${host.hostLocale.game_created_votes}:**__ \`${!host.voteVisible}\`\n\n__**${host.hostLocale.game_created_playerList}:**__ \n ${a}`)
}