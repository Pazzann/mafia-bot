import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    EmbedBuilder
} from "discord.js";
import {curHandlingGames, curHostGames} from "../index";
import MafiaEmbedBuilder from "../Classes/MafiaEmbedBuilder";
import GetRandomTheme from "../Functions/themes";
import getDisabledButtons from "../Functions/getDisabledButtons";
import User from "../Entities/User";
import {ILangProps} from "../types/interfaces/ILang";
import MafiaGame from "../Classes/MafiaGame";
import BaseRole from "../Classes/Roles/BaseRole";
import MafiaRole from "../Classes/Roles/MafiaRole";
import PoliceRole from "../Classes/Roles/PoliceRole";
import DoctorRole from "../Classes/Roles/DoctorRole";
import KillerRole from "../Classes/Roles/KillerRole";
import MistressRole from "../Classes/Roles/MisstressRole";
import PeacefulRole from "../Classes/Roles/PeacefulRole";
import BaseCondition from "../Classes/WinningConditions/BaseCondition";
import MafiaWin from "../Classes/WinningConditions/MafiaWin";
import KillerWIn from "../Classes/WinningConditions/KillerWIn";
import PeacecfulWin from "../Classes/WinningConditions/PeacecfulWin";


module.exports.execute = async function (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (curHostGames.has(gameid))
        if (curHostGames.get(gameid).author == interaction.user.id) {
            const gameData = curHostGames.get(gameid);
            clearTimeout(gameData.timeout);
            if (gameData.users.length < 4)
                return interaction.reply({content:locale.error_not_enough_players, ephemeral: true}).catch(()=>{});
            curHostGames.delete(gameid);
            const win:BaseCondition[] =  [new MafiaWin(), new KillerWIn(), new PeacecfulWin()];
            const roles: BaseRole[] = [new MafiaRole(), new PoliceRole(), new DoctorRole(), new KillerRole(), new MistressRole(), new PeacefulRole()];
            const game = new MafiaGame( gameid, gameData.author);
            const vRoles = await game.GenerateUsers(gameData.users, roles);
            const vWins = game.RegisterWins(win);
            let winStr = "";
            let roleStr = "";
            for (let role of vRoles){
                roleStr += "\`\`" + role.RoleName + "\`\`\n";
            }
            for(let win of vWins){
                winStr += "\`\`" + win.Name + "\`\`\n";
            }
            curHandlingGames.set(gameid, game);
            const theme = GetRandomTheme();
            for(let player of game.Players){
                const dm = player.dsUser?.dmChannel ?? await player.dsUser.createDM();
                const row = player.role.GetNightVoteRow(game.GetAliveUsers(), false, player);
                if(row)
                    dm.send({content: "test", embeds: [MafiaEmbedBuilder.sleepTime(player.local), MafiaEmbedBuilder.roleGiver(player.role, game.GetAliveUsers().length, theme, player.local, player.lang)], components: [row]}).catch(err=>{console.log(err)});
                else
                    dm.send({content: "test", embeds: [MafiaEmbedBuilder.sleepTime(player.local), MafiaEmbedBuilder.roleGiver(player.role, game.GetAliveUsers().length, theme, player.local, player.lang)]}).catch(err=>{console.log(err)});
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
                .setTitle(locale.game_create)
                .setDescription(`**${locale.create_game_owner}:** <@${interaction.user.id}>! \n Roles:\n ${roleStr}\n Winning Conditions:\n ${winStr}`)
                .setColor("#99ffb5")
                .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016410833112268910/Boy_From_God_Shrek_peaky_blinders_family_2a6ce986-1bad-472e-b288-481161d806af.png?width=566&height=566");
            return interaction.reply({embeds: [embed], components: [buttonRow]}).catch(()=>{});
        } else {
            return interaction.reply({content: locale.error_you_are_not_the_owner, ephemeral: true}).catch(()=>{});
        }
    else
        return interaction.reply({content: locale.error_incorrect_game_id, ephemeral: true}).catch(()=>{});
}