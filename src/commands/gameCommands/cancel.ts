import {ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import {curHandlingGames, curHostGames} from "../../index";
import getDisabledButtons from "../../Functions/getDisabledButtons";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = function (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.author == interaction.user.id){
            clearTimeout(host.timeout);
            interaction.message.edit({content: `**${locale.game_cancel_success_message_aboveEmbed}**`, components: getDisabledButtons(gameid, locale)})
            curHostGames.delete(gameid);
            interaction.reply(locale.game_cancel_success_message).catch(()=>{});
        }else{
            interaction.reply({content: locale.game_cancel_error_noAccess, ephemeral: true}).catch(()=>{});
        }
    }else{
        interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch(()=>{});
    }
}