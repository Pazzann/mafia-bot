import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";
import {dbDateToDate} from "../Functions/dateParser";


module.exports.execute = async function (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {


    const embed = new EmbedBuilder()
        .setTitle(locale.profile_title)
        .setDescription(`⌛**${locale.profile_mafiaAccountSince}** <t:${Math.round(dbDateToDate(user.since) / 1000)}:d>\n⌚**${locale.profile_accountSince}** <t:${Math.round(interaction.user.createdAt.getTime() / 1000)}:d>`)
        .setColor('#b73131')
        .addFields([
            {
                name: locale.profile_totalGames,
                value: String(user.totalGames),
                inline: true
            },
            {
                name: locale.profile_totalWins,
                value: String(user.totalWins),
                inline: true
            },
            {
                name: locale.profile_premium,
                value: user.premium ? locale.profile_premium_purchased : locale.profile_premium_notPurchased,
                inline: true
            },
        ])
        .setThumbnail(interaction.user.avatarURL())

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💵")
                .setLabel(locale.profile_button_premium)
                .setStyle(ButtonStyle.Primary)
                .setCustomId("premium")
                .setDisabled(user.premium),
            new ButtonBuilder()
                .setEmoji("🧐")
                .setLabel(locale.profile_button_custom)
                .setStyle(ButtonStyle.Primary)
                .setCustomId("custom")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("📬")
                .setLabel(locale.profile_button_news)
                .setStyle(user.notifications ? ButtonStyle.Success : ButtonStyle.Danger)
                .setCustomId("news")
                .setDisabled(false)
        );
    interaction.followUp({embeds: [embed], components: [buttons]});
}