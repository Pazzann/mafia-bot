import {ChatInputCommandInteraction} from "discord.js";
import {curHostGames} from "../bot";

module.exports.execute = function (interaction: ChatInputCommandInteraction, gameid = 0) {
    if (!gameid)
        gameid = interaction.options.getNumber('gameid');
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (!host.users.includes(interaction.user.id)){
            host.users.push(interaction.user.id);
            curHostGames.set(gameid, host);
            interaction.reply(`<@${interaction.user.id}> вошёл в игру \`\`${gameid}\`\`, всего в игре \`\`${host.users.length}\`\` участников!`);
        }else{
            interaction.reply({content:"Вы уже в этой игре!", ephemeral: true});
        }
    }else{
        interaction.reply({content: "Неправильный ID игры!", ephemeral: true});
    }
}