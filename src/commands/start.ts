import {
    ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonInteraction, ButtonStyle,
    ChatInputCommandInteraction, EmbedBuilder,
    RestOrArray,
    SelectMenuBuilder,
    SelectMenuOptionBuilder
} from "discord.js";
import {curHandlingGames, curHostGames, discordBot} from "../index";
import IUserProps from "../types/interfaces/IUser";
import {IRolesProps} from "../types/interfaces/IRoles";
import MafiaEmbedBuilder from "../Classes/MafiaEmbedBuilder";
import GetRandomTheme from "../Functions/themes";
import generateUsers from "../Functions/generateUsers";
import getMafiaRow from "../Functions/SelectRows/getMafiaRow";
import getPoliceRow from "../Functions/SelectRows/getPoliceRow";
import getDoctorRow from "../Functions/SelectRows/getDoctorRow";
import getKillerRow from "../Functions/SelectRows/getKillerRow";
import getDisabledButtons from "../Functions/getDisabledButtons";
import User from "../Entities/User";
import {ILangProps} from "../types/interfaces/ILang";


module.exports.execute = async function (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (curHostGames.has(gameid))
        if (curHostGames.get(gameid).author == interaction.user.id) {
            const gameData = curHostGames.get(gameid);
            clearTimeout(gameData.timeout);
            if (gameData.users.length < 4)
                return interaction.reply({content:locale.error_not_enough_players, ephemeral: true}).catch(()=>{});
            curHostGames.delete(gameid);
            const users = await generateUsers(gameData.users);
            curHandlingGames.set(gameid, {
                users: users,
                id: gameid,
                mafiacount: users.filter(item => item.role === IRolesProps.MAFIA).length,
                author: interaction.user.id,
                stage: 'chossing',
                votedToKick: [],
                votedToCheck: {
                    mafia: [],
                    police: null,
                    doctor: null,
                    killer: users.length > 7 ? null : "noKiller",
                    mistress: "noMistress",
                },
                finished: false,
                day: 0,
            });

            const theme = GetRandomTheme();
            users.map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({
                        embeds: [MafiaEmbedBuilder.sleepTime(item.local), MafiaEmbedBuilder.roleGiver(item.role, users.length, theme, Math.floor(users.length / 3), curHandlingGames.get(gameid), item.local, item.lang)]
                    });
                });
            });
            users.filter(item => item.role === IRolesProps.MAFIA).map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({components: [getMafiaRow(users)]});
                });
            })

            discordBot.users.fetch(users.filter(item => item.role === IRolesProps.DOCTOR)[0].userid).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                dm.send({components: [getDoctorRow(users)]});
            });
            discordBot.users.fetch(users.filter(item => item.role === IRolesProps.POLICE)[0].userid).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                dm.send({components: [getPoliceRow(users)]});
            });
            if (users.length > 7) {
                discordBot.users.fetch(users.filter(item => item.role === IRolesProps.KILLER)[0].userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({components: [getKillerRow(users)]});
                });
            }
            interaction.message.edit({components: getDisabledButtons(gameid, locale)})
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
                .setDescription(`**${locale.create_game_owner}:** <@${interaction.user.id}>!`)
                .setColor("#99ffb5")
                .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016410833112268910/Boy_From_God_Shrek_peaky_blinders_family_2a6ce986-1bad-472e-b288-481161d806af.png?width=566&height=566");
            return interaction.reply({embeds: [embed], components: [buttonRow]}).catch(()=>{});
        } else {
            return interaction.reply({content: locale.error_you_are_not_the_owner, ephemeral: true}).catch(()=>{});
        }
    else
        return interaction.reply({content: locale.error_incorrect_game_id, ephemeral: true}).catch(()=>{});
}