import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";
import {dbDateToDate} from "../Functions/dateParser";
import getProfileButtons from "../Functions/getProfileButtons";


export default async function profile (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {


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


    interaction.reply({embeds: [embed], components: [getProfileButtons(user, locale)]});
}