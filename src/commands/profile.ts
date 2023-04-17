import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";
import {dbDateToDate} from "../Functions/dateParser";


module.exports.execute = async function (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {


    const embed = new EmbedBuilder()
        .setTitle("Your profile👤")
        .setDescription(`⌛**Mafia account since:** <t:${Math.round(dbDateToDate(user.since) / 1000)}:d>\n⌚**Account since:** <t:${Math.round(interaction.user.createdAt.getTime() / 1000)}:d>`)
        .setColor('#b73131')
        .addFields([
            {
                name: "🎮 Total Games:",
                value: String(user.totalGames),
                inline: true
            },
            {
                name: "🏆 Total Wins:",
                value: String(user.totalWins),
                inline: true
            },
            {
                name: "💵 Premium:",
                value: user.premium ? "purchased" : "not purchased",
                inline: true
            },
        ])
        .setThumbnail(interaction.user.avatarURL())

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💵")
                .setLabel("Premium")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("premium")
                .setDisabled(user.premium),
            new ButtonBuilder()
                .setEmoji("🧐")
                .setLabel("Custom")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("custom")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("📬")
                .setLabel("News Notification")
                .setStyle(user.notifications ? ButtonStyle.Success : ButtonStyle.Danger)
                .setCustomId("news")
                .setDisabled(false)
        );
    interaction.reply({embeds: [embed], components: [buttons]});
}