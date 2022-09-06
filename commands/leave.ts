import {ChatInputCommandInteraction} from "discord.js";
import {curHostGames} from "../bot";

module.exports.execute = function (interaction: ChatInputCommandInteraction) {
    const gameid = interaction.options.getNumber('gameid');
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.users.includes(interaction.user.id)){
            host.users.splice(host.users.indexOf(interaction.user.id), 1);
            curHostGames.set(gameid, host);
            interaction.reply('Removed');
        }else{
            interaction.reply("You are an idiot");
        }
    }else{
        interaction.reply("You are an idiot");
    }
}