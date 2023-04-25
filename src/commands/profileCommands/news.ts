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
import getProfileButtons from "../../Functions/getProfileButtons";


export default async function news(interaction: ButtonInteraction, user: User, locale: ILangProps) {
    if (interaction.message.interaction.user.id !== interaction.user.id) {
        interaction.reply({ephemeral: true, content: "You are not the owner"})
        return;
    }
    user.notifications = !user.notifications;
    await user.save();
    await interaction.message.edit({components: [getProfileButtons(user, locale)]})
    await interaction.reply({ephemeral: true, content: "Successfully"});
}