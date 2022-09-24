import {ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import {curHandlingGames, curHostGames} from "../index";
import getDisabledButtons from "../Functions/SelectRows/getDisabledButtons";

module.exports.execute = function (interaction: ButtonInteraction, gameid = 0) {
    // if (!gameid)
    //     gameid = interaction.options.getNumber('gameid');

    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.author == interaction.user.id){
            clearTimeout(host.timeout);
            interaction.message.edit({content: "**Игра отменена организатором!**", components: getDisabledButtons(gameid)})
            curHostGames.delete(gameid);
            interaction.reply(`Игра \`\`${gameid}\`\` была убрана!`);
        }else{
            interaction.reply({content: "Вы не владелец игры!", ephemeral: true});
        }
    }else{
        interaction.reply({content: "Неправильный ID игры!", ephemeral: true});
    }
}