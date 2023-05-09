import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";
import {ActionRowBuilder, ButtonBuilder, ButtonStyle} from "discord.js";

export default function getProfileButtons(user: User, locale: ILangProps){
    return new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💵")
                .setLabel(locale.profile_button_premium)
                .setStyle(ButtonStyle.Primary)
                .setCustomId("premium")
                .setDisabled(false),
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
}