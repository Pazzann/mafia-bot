import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../Entities/User";
import {ILangProps} from "../types/interfaces/ILang";


module.exports.execute = async function (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {

    const embed = new EmbedBuilder()
        .setTitle("Your profile")
        .setDescription(`Your join date: ${user.since}
        Total games: ${user.totalGames}
        Total wins: ${user.totalWins}
        Premium: ${user.premium}`)
        .setColor('#b73131')

    const buttons  = new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("💵")
                    .setLabel("Premium")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("premium")
                    .setDisabled(false),

            );
    interaction.reply({embeds: [embed], components: [buttons]});
}