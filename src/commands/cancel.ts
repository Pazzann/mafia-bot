import {ChatInputCommandInteraction} from "discord.js";
import {curHandlingGames, curHostGames} from "../bot";

module.exports.execute = function (interaction: ChatInputCommandInteraction, gameid = 0) {
    if (!gameid)
        gameid = interaction.options.getNumber('gameid');
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.author == interaction.user.id){
            curHostGames.delete(gameid);
            interaction.reply(`Игра \`\`${gameid}\`\` была убрана!`);
        }else{
            interaction.reply({content: "Вы не владелец игры!", ephemeral: true});
        }
    }else{
        interaction.reply({content: "Неправильный ID игры!", ephemeral: true});
    }
}