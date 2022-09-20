import {ChatInputCommandInteraction} from "discord.js";
import {curHostGames} from "../bot";

module.exports.execute = function (interaction: ChatInputCommandInteraction, gameid = 0) {
    if (!gameid)
        gameid = interaction.options.getNumber('gameid');
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.users.includes(interaction.user.id)){
            host.users.splice(host.users.indexOf(interaction.user.id), 1);
            curHostGames.set(gameid, host);
            interaction.reply({content:`<@${interaction.user.id}> покинул игру \`\`${host.id}\`\`, всего в игре \`\`${host.users.length}\`\` участников!`, ephemeral: false});
        }else{
            interaction.reply({content: "Вас там итак нет!", ephemeral: true});
        }
    }else{
        interaction.reply({content: "Неправильный ID игры!", ephemeral: true});
    }
}