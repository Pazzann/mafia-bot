import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../Entities/User";
import {ILangProps} from "../types/interfaces/ILang";

module.exports.execute = async function (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {

    const embed = new EmbedBuilder()
        .setTitle("Help")
        .setDescription(`FAQ:`)
        .setColor('#5bab49')

    const buttons  = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💵")
                .setLabel("Premium")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("premium")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("📙")
                .setLabel("Game Rules")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("rules")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("🛠")
                .setLabel("Scripting")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("scripting")
                .setDisabled(false)

        );
    interaction.reply({embeds: [embed], components: [buttons]});
}