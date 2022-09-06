import {ChatInputCommandInteraction} from "discord.js";
import {curHandlingGames, curHostGames} from "../bot";

module.exports.execute = function (interaction: ChatInputCommandInteraction) {
    const gameid = interaction.options.getNumber('gameid');
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.author == interaction.user.id){
            curHostGames.delete(gameid);
            interaction.reply('Вы убраны из игры');
        }else{
            interaction.reply("Вы не владелец игры!");
        }
    }else{
        interaction.reply("Неправильный ID игры!");
    }
}