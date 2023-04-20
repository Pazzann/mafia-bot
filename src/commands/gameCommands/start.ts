import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    EmbedBuilder
} from "discord.js";
import {curHandlingGames, curHostGames} from "../../index";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";
import GetRandomTheme from "../../Functions/themes";
import getDisabledButtons from "../../Functions/getDisabledButtons";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import MafiaGame from "../../Classes/MafiaGame";
import BaseRole from "../../Classes/Roles/BaseRole";
import BaseCondition from "../../Classes/WinningConditions/BaseCondition";
import MafiaWin from "../../Classes/WinningConditions/MafiaWin";
import KillerWIn from "../../Classes/WinningConditions/KillerWín";
import PeacecfulWin from "../../Classes/WinningConditions/PeacecfulWin";


module.exports.execute = async function (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (curHostGames.has(gameid))
        if (curHostGames.get(gameid).author == interaction.user.id) {
            const gameData = curHostGames.get(gameid);
            clearTimeout(gameData.timeout);
            if (gameData.users.length < 4)
                return interaction.reply({content:locale.error_not_enough_players, ephemeral: true}).catch(()=>{});
            if (gameData.roles.length < 1)
                return interaction.reply({content:"not enough roles", ephemeral: true}).catch(()=>{});
            await interaction.deferReply();
            curHostGames.delete(gameid);
            const win:BaseCondition[] =  [new MafiaWin(), new KillerWIn(), new PeacecfulWin()];
            const roles: BaseRole[] = gameData.roles;
            const game = new MafiaGame( gameid, gameData.author);
            const vRoles = await game.GenerateUsers(gameData.users, roles);
            const vWins = game.RegisterWins(win);

            let winStr = "";
            let roleStr = "";
            for (let role of vRoles){
                roleStr += "\`\`" + role.GetRoleName(user.lang) + "\`\`\n";
            }
            for(let win of vWins){
                winStr += "\`\`" + win.GetName(user.lang) + "\`\`\n";
            }

            curHandlingGames.set(gameid, game);
            const theme = GetRandomTheme();
            for(let player of game.Players){
                const dm = player.dsUser?.dmChannel ?? await player.dsUser.createDM();
                const row = player.role.GetNightVoteRow(game.GetAliveUsers(), false, player);
                if(row)
                    dm.send({ embeds: [MafiaEmbedBuilder.sleepTime(player.local), MafiaEmbedBuilder.roleGiver(player, game.GetAliveUsers(), theme, player.local, player.lang, roles)], components: [row]}).catch(err=>{console.log(err)});
                else
                    dm.send({ embeds: [MafiaEmbedBuilder.sleepTime(player.local), MafiaEmbedBuilder.roleGiver(player, game.GetAliveUsers(), theme, player.local, player.lang, roles)]}).catch(err=>{console.log(err)});
            }
            await interaction.message.edit({components: getDisabledButtons(gameid, locale)})
            const buttonRow = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel(locale.pre_end_game)
                        .setEmoji("🔥")
                        .setCustomId("e" + String(gameid))
                        .setStyle(ButtonStyle.Danger)
                );
            const embed = new EmbedBuilder()
                .setTitle(locale.game_started)
                .setDescription(`**${locale.game_created_gameOwner}:** <@${interaction.user.id}>! \n Roles:\n ${roleStr}\n Winning Conditions:\n ${winStr}`)
                .setColor("#99ffb5")
                .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016410833112268910/Boy_From_God_Shrek_peaky_blinders_family_2a6ce986-1bad-472e-b288-481161d806af.png?width=566&height=566");
            return interaction.followUp({embeds: [embed], components: [buttonRow]}).catch(()=>{});
        } else {
            return interaction.reply({content: locale.error_you_are_not_the_owner, ephemeral: true}).catch(()=>{});
        }
    else
        return interaction.reply({content: locale.error_incorrect_game_id, ephemeral: true}).catch(()=>{});
}