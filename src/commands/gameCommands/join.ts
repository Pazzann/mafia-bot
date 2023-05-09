import {BaseInteraction, ButtonInteraction, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import {curHandlingGames, curHostGames} from "../../index";
import usersRedraw from "../../Functions/usersRedraw";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function join (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if(curHostGames.has(gameid))
    {

        const host = curHostGames.get(gameid);
        if (!host.users.includes(interaction.user.id)){
            for(let v of curHostGames.values()){
                if(v.users.includes(interaction.user.id))
                    return interaction.reply({content: (v.author == interaction.user.id ? locale.game_error_alreadyCreated : locale.game_error_alreadyJoined), ephemeral: true}).catch(()=>{});
            }
            for(let v of curHandlingGames.values()){
                if(v.HasPlayer(interaction.user.id))
                    return interaction.reply({content: (v.author == interaction.user.id ? locale.game_error_alreadyCreated : locale.game_error_alreadyJoined), ephemeral: true}).catch(()=>{});
            }
            host.timeout.refresh();
            host.users.push(interaction.user.id);
            const newEmbed = usersRedraw(host.users, host.embed, host);
            host.embed = newEmbed;
            curHostGames.set(gameid, host);
            await interaction.message.edit({embeds: [newEmbed]});
            await interaction.reply({content: locale.game_join_success_message, ephemeral: true}).catch(()=>{});
        }else{
            interaction.reply({content: locale.game_join_error_alreadyJoined, ephemeral: true}).catch(()=>{});
        }
    }else{
        interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch(()=>{});
    }
}