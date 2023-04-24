import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";


export default async function news(interaction: ButtonInteraction, user: User, locale: ILangProps) {
    if (interaction.message.interaction.user.id !== interaction.user.id){
        interaction.reply({ephemeral: true, content: "You are not the owner"})
        return;
    }

    const buttonBuilders = [
        new ButtonBuilder()
            .setEmoji("💵")
            .setLabel("Premium")
            .setStyle(ButtonStyle.Primary)
            .setCustomId("premium")
            .setDisabled(false),
        new ButtonBuilder()
            .setEmoji("🧐")
            .setLabel("Custom")
            .setStyle(ButtonStyle.Primary)
            .setCustomId("custom")
            .setDisabled(false),
        new ButtonBuilder()
            .setEmoji("📬")
            .setLabel("News notifications")
            .setCustomId("news")
            .setDisabled(false)
    ];



    if (user.notifications) {
        user.notifications = false;
        buttonBuilders[2].setStyle(ButtonStyle.Danger);
    } else {
        user.notifications = true;
        buttonBuilders[2].setStyle(ButtonStyle.Success);
    }

    await user.save();
    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(...buttonBuilders);
    await interaction.message.edit({components: [buttons]})
    await interaction.reply({ephemeral: true, content: "Successfully"});
}