import {BaseInteraction, ButtonInteraction, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import {curHandlingGames, curHostGames} from "../index";
import usersRedraw from "../Functions/usersRedraw";
import User from "../Entities/User";
import {ILangProps} from "../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if(curHostGames.has(gameid))
    {

        const host = curHostGames.get(gameid);
        if (!host.users.includes(interaction.user.id)){
            for(let v of curHostGames.values()){
                if(v.users.includes(interaction.user.id))
                    return interaction.reply({content: locale.create_error, ephemeral: true}).catch(()=>{});
            }
            for(let v of curHandlingGames.values()){
                    if(v.HasPlayer(interaction.user.id)){
                        return interaction.reply({content: locale.create_error, ephemeral: true}).catch(()=>{});
                    }
            }
            host.timeout.refresh();
            host.users.push(interaction.user.id);
            curHostGames.set(gameid, host);
            const newEmbed = usersRedraw(host.users, interaction.message.embeds[0]);
            await interaction.message.edit({embeds: [newEmbed]});
            await interaction.reply({content: locale.join_game, ephemeral: true}).catch(()=>{});
        }else{
            interaction.reply({content: locale.error_you_are_already, ephemeral: true}).catch(()=>{});
        }
    }else{
        interaction.reply({content: locale.error_incorrect_game_id, ephemeral: true}).catch(()=>{});
    }
}