import {ButtonInteraction, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import {curHostGames} from "../../index";
import usersRedraw from "../../Functions/usersRedraw";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import {Langs} from "../../types/Langs";

module.exports.execute = function (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps, lang: Langs) {
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.users.includes(interaction.user.id)){
            host.timeout.refresh();
            host.users.splice(host.users.indexOf(interaction.user.id), 1);
            const newEmbed = usersRedraw(host.users, host.embed, locale, host);
            host.embed = newEmbed;
            curHostGames.set(gameid, host);
            interaction.message.edit({embeds: [newEmbed]});
            interaction.reply({content: locale.leave_game, ephemeral: true}).catch(()=>{});
        }else{
            interaction.reply({content: locale.error_you_are_not_already, ephemeral: true}).catch(()=>{});
        }
    }else{
        interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch(()=>{});
    }
}