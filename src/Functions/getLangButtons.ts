import {ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonStyle} from "discord.js";

export default function getLangButtons() {
    const disabledButtons: ActionRowBuilder<ButtonBuilder>[] = [
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🇺🇦")
                    .setLabel("Українська")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ua")
                    .setDisabled(false),
                new ButtonBuilder()
                    .setEmoji("🇱🇺")
                    .setLabel("Русский")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ru")
                    .setDisabled(false),
                new ButtonBuilder()
                    .setEmoji("🇬🇧")
                    .setLabel("English")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("en")
                    .setDisabled(false)
            ),
    ]
    return disabledButtons;
}