import {BaseInteraction, ButtonInteraction, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import {curHandlingGames, curHostGames} from "../../index";
import usersRedraw from "../../Functions/usersRedraw";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if(curHostGames.has(gameid))
    {

        const host = curHostGames.get(gameid);
        if (!host.users.includes(interaction.user.id)){
            for(let v of curHostGames.values()){
                if(v.users.includes(interaction.user.id))
                    return interaction.followUp({content: locale.create_error, ephemeral: true}).catch(()=>{});
            }
            for(let v of curHandlingGames.values()){
                    if(v.HasPlayer(interaction.user.id)){
                        return interaction.followUp({content: locale.create_error, ephemeral: true}).catch(()=>{});
                    }
            }
            host.timeout.refresh();
            host.users.push(interaction.user.id);
            const newEmbed = usersRedraw(host.users, host.embed, locale, host);
            host.embed = newEmbed;
            curHostGames.set(gameid, host);
            await interaction.message.edit({embeds: [newEmbed]});
            await interaction.followUp({content: locale.join_game, ephemeral: true}).catch(()=>{});
        }else{
            interaction.followUp({content: locale.error_you_are_already, ephemeral: true}).catch(()=>{});
        }
    }else{
        interaction.followUp({content: locale.error_incorrect_game_id, ephemeral: true}).catch(()=>{});
    }
}