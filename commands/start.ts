import {
    ActionRowBuilder,
    ChatInputCommandInteraction, EmbedBuilder,
    RestOrArray,
    SelectMenuBuilder,
    SelectMenuOptionBuilder
} from "discord.js";
import {curHandlingGames, curHostGames, discordBot} from "../bot";
import User from "../types/user";
import {Roles} from "../types/roles";
import MafiaEmbedBuilder from "../Classes/MafiaEmbedBuilder";
import GetRandomTheme from "../Functions/themes";
import generateUsers from "../Functions/generateUsers";
import getMafiaRow from "../Functions/SelectRows/getMafiaRow";
import getPoliceRow from "../Functions/SelectRows/getPoliceRow";
import getDoctorRow from "../Functions/SelectRows/getDoctorRow";



module.exports.execute = async function (interaction: ChatInputCommandInteraction) {
    const gameid = interaction.options.getNumber('gameid');
    if (curHostGames.get(gameid).author == interaction.user.id) {
        const gameData = curHostGames.get(gameid);
        if (gameData.users.length < 4)
            return interaction.reply('Недостаточно игроков для старта игры!');
        curHostGames.delete(gameid);
        const users = await generateUsers(gameData.users);
        curHandlingGames.set(gameid, {
            users: users,
            id: gameid,
            mafiacount: users.filter(item=>item.role === Roles.MAFIA).length,
            author: interaction.user.id,
            stage: 'chossing',
            votedToKick: [],
            votedToCheck: {
                mafia: [],
                police: null,
                doctor: null,
                killer: "noKiller",
                mistress: "noMistress",
                beautiful: "noBeautiful"
            },
            day: 0,
        });

        const theme = GetRandomTheme();
        users.map(item => {
            discordBot.users.fetch(item.userid).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                dm.send({
                    content: "Город засыпает",
                    embeds: [MafiaEmbedBuilder.roleGiver(item.role, users.length, theme, Math.floor(users.length / 3), curHandlingGames.get(gameid))]
                });
            });
        });
        users.filter(item => item.role === Roles.MAFIA).map(item=>{
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
        const embed = new EmbedBuilder()
            .setTitle("Игра создана")
            .setDescription(`Successfully started \`\`${gameid}\`\``)
            .setColor("#99ffb5")
            .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016410833112268910/Boy_From_God_Shrek_peaky_blinders_family_2a6ce986-1bad-472e-b288-481161d806af.png?width=566&height=566");
        return interaction.reply({embeds: [embed]});
    } else {
        return interaction.reply('Неправильный ID игры!');
    }
}