import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    EmbedBuilder
} from "discord.js";
import {curHandlingGames, curHostGames} from "../../index";
import MafiaEmbedFactory from "../../Classes/MafiaEmbedFactory";
import getRandomTheme from "../../Functions/themes";
import getDisabledButtons from "../../Functions/getDisabledButtons";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import MafiaGame from "../../Classes/MafiaGame";
import setGameEmbedDescription from "../../Functions/setGameEmbedDescription";

export default async function start(interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (!curHostGames.has(gameid))
        return interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch();
    if (curHostGames.get(gameid).author != interaction.user.id)
        return interaction.reply({content: locale.game_start_error_noAccess, ephemeral: true}).catch();

    const host = curHostGames.get(gameid);
    clearTimeout(host.timeout);
    if (host.users.length < 4)
        return interaction.reply({content: locale.game_start_error_notEnoughPlayers, ephemeral: true}).catch();
    if (host.roles.length < 1)
        return interaction.reply({content: locale.game_start_error_notEnoughRoles, ephemeral: true}).catch();

    setGameEmbedDescription(host);
    await interaction.deferReply();
    curHostGames.delete(gameid);
    const game = new MafiaGame(gameid, host.author, host.voteVisible, interaction.guildId);
    const vRoles = await game.generatePlayers(host.users, host.roles);
    const vConditions = await game.registerConditions(host.conditions);

    const roleStr = vRoles.reduce((previous, item)=> previous + "\`\`" + item.getName(user.lang) + "\`\`\n", "");
    const condStr = vConditions.reduce((previous, item)=> previous + "\`\`" + item.getName(user.lang) + "\`\`\n", "");

    curHandlingGames.set(gameid, game);
    const theme = getRandomTheme();
    for (let player of game.players) {

        const row = player.role.getNightVoteRow(game.getAliveUsers(), player);
        if (row && player.role.DelayForActivity === 1)
            player.dmChannel.send({
                embeds: [MafiaEmbedFactory.sleepTime(player.local), await MafiaEmbedFactory.roleGiver(player, game.GetAliveUsers(), theme, player.local, player.lang, host.roles)],
                components: [row]
            }).catch(err => {
                console.log(err)
            });
        else
            player.dmChannel.send({embeds: [MafiaEmbedFactory.sleepTime(player.local), await MafiaEmbedFactory.roleGiver(player, game.GetAliveUsers(), theme, player.local, player.lang, host.roles)]}).catch(err => {
                console.log(err)
            });
    }
    await game.EndChooseMoveHandler();
    await interaction.message.edit({components: getDisabledButtons(gameid, locale)})
    const buttonRow = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel(locale.game_started_button_endGame)
                .setEmoji("🔥")
                .setCustomId("e" + String(gameid))
                .setStyle(ButtonStyle.Danger)
        );
    const embed = new EmbedBuilder()
        .setTitle(locale.game_started_title)
        .setDescription(`**${locale.game_created_gameHost}:** <@${interaction.user.id}>\n\n__**${locale.game_created_votes}:**__ \`${!host.voteVisible}\``)
        .addFields([{
            value: roleStr,
            name: `__**${locale.game_created_roles}**__`
        }, {
            value: condStr,
            name: `__**${locale.game_created_gameEndConditions}**__`
        }])
        .setColor("#99ffb5")
        .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016410833112268910/Boy_From_God_Shrek_peaky_blinders_family_2a6ce986-1bad-472e-b288-481161d806af.png?width=566&height=566");
    return interaction.followUp({embeds: [embed], components: [buttonRow]}).catch();
}