import {ButtonInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import {curHostGames} from "../../index";
import getDisabledButtons from "../../Functions/getDisabledButtons";
import getEditRow from "../../Functions/getEditRow";

export default async function voteVisible (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.author == interaction.user.id){
            host.voteVisible = !host.voteVisible;
            curHostGames.set(gameid, host);
            await interaction.reply({content: "Switched to: " + host.voteVisible, components: getEditRow(host, user, locale, gameid), ephemeral: true})
        }else{
            interaction.reply({content: locale.game_cancel_error_noAccess, ephemeral: true}).catch(()=>{});
        }
    }else{
        interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch(()=>{});
    }
}