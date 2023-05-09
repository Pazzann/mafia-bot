import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function newrolehalfbut(interaction: ButtonInteraction, user: User, locale: ILangProps) {
    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true}).catch();
        return;
    }
    const name = interaction.customId.split("newrolehalfbut").join("");
    const modal = new ModalBuilder()
        .setCustomId("newRolePartTwo" + name)
        .setTitle(locale.role_create_title2 + name);
    const actionInput = new TextInputBuilder()
        .setCustomId("roleAction")
        .setLabel(locale.role_create_roleAction_label)
        .setPlaceholder(locale.role_create_roleAction_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setValue("no_activity")
        .setMaxLength(15)
        .setMinLength(3)
        .setRequired(true);
    const selfSelectableInput = new TextInputBuilder()
        .setCustomId("roleSelectable")
        .setLabel(locale.role_create_roleSelectable_label)
        .setPlaceholder(locale.role_create_roleSelectable_placeHolder)
        .setValue("true")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const delayInput = new TextInputBuilder()
        .setCustomId("roleDelay")
        .setLabel(locale.role_create_roleDelay_label)
        .setValue("1")
        .setPlaceholder(locale.role_create_roleDelay_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const spawnFromInput = new TextInputBuilder()
        .setCustomId("roleSpawnFrom")
        .setLabel(locale.role_create_roleSpawnFrom_label)
        .setPlaceholder(locale.role_create_roleSpawnFrom_placeHolder)
        .setValue("1")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const groupSelectionInput = new TextInputBuilder()
        .setCustomId("roleGroupSelection")
        .setLabel(locale.role_create_roleGroupSelection_label)
        .setPlaceholder(locale.role_create_roleGroupSelection_placeHolder)
        .setValue("false")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(actionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(selfSelectableInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(delayInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(spawnFromInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(groupSelectionInput),
    );
    await interaction.showModal(modal);
}