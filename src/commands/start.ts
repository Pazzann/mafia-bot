import {
    ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonInteraction, ButtonStyle,
    ChatInputCommandInteraction, EmbedBuilder,
    RestOrArray,
    SelectMenuBuilder,
    SelectMenuOptionBuilder
} from "discord.js";
import {curHandlingGames, curHostGames, discordBot} from "../index";
import User from "../types/user";
import {Roles} from "../types/roles";
import MafiaEmbedBuilder from "../Classes/MafiaEmbedBuilder";
import GetRandomTheme from "../Functions/themes";
import generateUsers from "../Functions/generateUsers";
import getMafiaRow from "../Functions/SelectRows/getMafiaRow";
import getPoliceRow from "../Functions/SelectRows/getPoliceRow";
import getDoctorRow from "../Functions/SelectRows/getDoctorRow";
import getKillerRow from "../Functions/SelectRows/getKillerRow";
import getDisabledButtons from "../Functions/SelectRows/getDisabledButtons";


module.exports.execute = async function (interaction: ButtonInteraction, gameid = 0) {
    // if (!gameid)
    //     gameid = interaction.options.getNumber('gameid');
    if (curHostGames.has(gameid))
        if (curHostGames.get(gameid).author == interaction.user.id) {
            const gameData = curHostGames.get(gameid);
            clearTimeout(gameData.timeout);
            if (gameData.users.length < 4)
                return interaction.reply({content:'Недостаточно игроков для старта игры!', ephemeral: true});
            curHostGames.delete(gameid);
            const users = await generateUsers(gameData.users);
            curHandlingGames.set(gameid, {
                users: users,
                id: gameid,
                mafiacount: users.filter(item => item.role === Roles.MAFIA).length,
                author: interaction.user.id,
                stage: 'chossing',
                votedToKick: [],
                votedToCheck: {
                    mafia: [],
                    police: null,
                    doctor: null,
                    killer: users.length > 7 ? null : "noKiller",
                    mistress: "noMistress",
                    beautiful: "noBeautiful"
                },
                finished: false,
                day: 0,
            });

            const theme = GetRandomTheme();
            users.map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({
                        embeds: [MafiaEmbedBuilder.sleepTime(), MafiaEmbedBuilder.roleGiver(item.role, users.length, theme, Math.floor(users.length / 3), curHandlingGames.get(gameid))]
                    });
                });
            });
            users.filter(item => item.role === Roles.MAFIA).map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({components: [getMafiaRow(users)]});
                });
            })

            discordBot.users.fetch(users.filter(item => item.role === Roles.DOCTOR)[0].userid).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                dm.send({components: [getDoctorRow(users)]});
            });
            discordBot.users.fetch(users.filter(item => item.role === Roles.POLICE)[0].userid).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                dm.send({components: [getPoliceRow(users)]});
            });
            if (users.length > 7) {
                discordBot.users.fetch(users.filter(item => item.role === Roles.KILLER)[0].userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({components: [getKillerRow(users)]});
                });
            }
            interaction.message.edit({components: getDisabledButtons(gameid)})
            const buttonRow = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setLabel("Закончить игру заранее")
                        .setEmoji("🔥")
                        .setCustomId("e" + String(gameid))
                        .setStyle(ButtonStyle.Danger)
                );
            const embed = new EmbedBuilder()
                .setTitle("Игра создана")
                .setDescription(`Successfully started \`\`${gameid}\`\``)
                .setColor("#99ffb5")
                .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016410833112268910/Boy_From_God_Shrek_peaky_blinders_family_2a6ce986-1bad-472e-b288-481161d806af.png?width=566&height=566");
            return interaction.reply({embeds: [embed], components: [buttonRow]});
        } else {
            return interaction.reply({content: "Неправильный ID игры!", ephemeral: true});
        }
    else
        return interaction.reply({content: "Неправильный ID игры!", ephemeral: true});
}