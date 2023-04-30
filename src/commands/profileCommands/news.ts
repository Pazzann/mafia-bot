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


export default async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {
    if (interaction.message.interaction.user.id !== interaction.user.id) {
        interaction.reply({ephemeral: true, content: (user.notifications ? locale.news_error_noAccess_enabled : locale.news_error_noAccess_disabled)})
        return;
    }
    user.notifications = !user.notifications;
    await user.save();
    await interaction.message.edit({components: [getProfileButtons(user, locale)]})
    await interaction.reply({ephemeral: true, content: (user.notifications ? locale.news_enable_success_message : locale.news_disable_success_message)});
}