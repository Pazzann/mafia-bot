import {ChatInputCommandInteraction} from "discord.js";
import {curHandlingGames, curHostGames} from "../bot";

module.exports.execute = function (interaction: ChatInputCommandInteraction) {
    const gameid = interaction.options.getNumber('gameid');
    if(curHandlingGames.has(gameid))
    {
        const host = curHandlingGames.get(gameid);
        if (host.author == interaction.user.id){
            curHandlingGames.delete(gameid);
            interaction.reply('Игра удалена!');
        }else{
            interaction.reply("Вы не владелец игры!");
        }
    }else{
        interaction.reply("Неправильный ID игры!");
    }
}