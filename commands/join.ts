import {ChatInputCommandInteraction} from "discord.js";
import {curHostGames} from "../bot";

module.exports.execute = function (interaction: ChatInputCommandInteraction) {
    const gameid = interaction.options.getNumber('gameid');
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (!host.users.includes(interaction.user.id)){
            host.users.push(interaction.user.id);
            curHostGames.set(gameid, host);
            interaction.reply(`Вы вошли в игру \`\`${gameid}\`\` `);
        }else{
            interaction.reply("Вы уже в этой игре!");
        }
    }else{
        interaction.reply("Неправильный ID игры!");
    }
}