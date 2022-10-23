import {ActionRowBuilder, ButtonBuilder, ButtonComponent, ButtonStyle} from "discord.js";
import {ILangProps} from "../types/interfaces/ILang";

export default function getDisabledButtons(id: number, locale: ILangProps) {
    const disabledButtons: ActionRowBuilder<ButtonBuilder>[] = [
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🌀")
                    .setLabel(locale.create_button_join)
                    .setStyle(ButtonStyle.Primary)
                    .setCustomId("j" + String(id))
                    .setDisabled(true),
                new ButtonBuilder()
                    .setEmoji("✔️")
                    .setLabel(locale.create_button_start)
                    .setStyle(ButtonStyle.Success)
                    .setCustomId("s" + String(id))
                    .setDisabled(true)
            ),
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("🔥")
                    .setLabel(`⠀${locale.create_button_cancel}⠀⠀`)
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("c" + String(id))
                    .setDisabled(true),
                new ButtonBuilder()
                    .setEmoji("🔪")
                    .setLabel(`⠀${locale.create_button_leave}⠀`)
                    .setStyle(ButtonStyle.Danger)
                    .setCustomId("l" + String(id))
                    .setDisabled(true)
            ),
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setEmoji("👀")
                    .setLabel(`⠀⠀⠀⠀${locale.create_button_new}⠀⠀⠀⠀⠀`)
                    .setStyle(ButtonStyle.Success)
                    .setCustomId("createnew"),
            )
    ]
    return disabledButtons;
}