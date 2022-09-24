import {ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonStyle} from "discord.js";

export default function getDisabledButtons(id: number) {
    const disabledButtons: ActionRowBuilder<ButtonBuilder>[] = [
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🌀")
                    .setLabel('Присоединиться')
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("j" + String(id))
                    .setDisabled(true),
                new ButtonBuilder()
                    .setEmoji("✔️")
                    .setLabel('Начать')
                    .setStyle(ButtonStyle.Success)
                    .setCustomId("s" + String(id))
                    .setDisabled(true)
            ),
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🔥")
                    .setLabel('⠀Отменить⠀⠀')
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("c" + String(id))
                    .setDisabled(true),
                new ButtonBuilder()
                    .setEmoji("🔪")
                    .setLabel('⠀Выйти⠀')
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("l" + String(id))
                    .setDisabled(true)
            ),
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("👀")
                    .setLabel('⠀⠀⠀⠀Cоздать новую игру⠀⠀⠀⠀⠀')
                    .setStyle(ButtonStyle.Success)
                    .setCustomId("createnew"),
            )
    ]
    return disabledButtons;
}