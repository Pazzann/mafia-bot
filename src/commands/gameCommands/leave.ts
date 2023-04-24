import {ButtonInteraction, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import {curHostGames} from "../../index";
import usersRedraw from "../../Functions/usersRedraw";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import {Langs} from "../../types/Langs";

export default function leave (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
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
            interaction.reply({content: locale.game_leave_success_message, ephemeral: true}).catch(()=>{});
        }else{
            interaction.reply({content: locale.game_leave_error_alreadyLeft, ephemeral: true}).catch(()=>{});
        }
    }else{
        interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch(()=>{});
    }
}