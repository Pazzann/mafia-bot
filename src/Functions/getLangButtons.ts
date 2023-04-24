import {ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonStyle} from "discord.js";

export default function getLangButtons() {
    const disabledButtons: ActionRowBuilder<ButtonBuilder>[] = [
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🇬🇧")
                    .setLabel("English")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("en")
                    .setDisabled(false),
                new ButtonBuilder()
                    .setEmoji("🇺🇦")
                    .setLabel("Українська")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ua")
                    .setDisabled(false),
                new ButtonBuilder()
                    .setEmoji("🇺🇳")
                    .setLabel("Русский")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ru")
                    .setDisabled(false),
                new ButtonBuilder()
                    .setEmoji("🇵🇱")
                    .setLabel("Polska")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("pl")
                    .setDisabled(false),


            ),
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🇩🇪")
                    .setLabel("Deutsch")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("de")
                    .setDisabled(false),
                new ButtonBuilder()
                    .setEmoji("🇪🇪")
                    .setLabel("Eesti keel")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("ee")
                    .setDisabled(false),
                new ButtonBuilder()
                    .setEmoji("🇪🇸")
                    .setLabel("Español")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("sp")
                    .setDisabled(false),
                new ButtonBuilder()
                    .setEmoji("🇺🇦")
                    .setLabel("Файна Українська")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("fu")
                    .setDisabled(false)
            ),
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🇸🇪")
                    .setLabel("Sweden")
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("se")
                    .setDisabled(false),
            )
    ]
    return disabledButtons;
}