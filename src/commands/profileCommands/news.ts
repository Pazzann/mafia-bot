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
import profile from "../profile";


export default async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {
    user.notifications = !user.notifications;
    await user.save();
    // await interaction.message.edit({components: [getProfileButtons(user, locale)]})
    profile(interaction, user, locale, (user.notifications ? locale.news_enable_success_message : locale.news_disable_success_message))
}