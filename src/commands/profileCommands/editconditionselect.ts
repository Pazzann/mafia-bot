import {ActionRowBuilder, ModalBuilder, SelectMenuInteraction, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import WinningCondition from "../../Entities/WinningCondition.entity";

export default async function editconditionselect(interaction: SelectMenuInteraction, user: User, locale: ILangProps, conditionId: number) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }

    const condition = await WinningCondition.findOne({where: {id: conditionId}, relations: ["user"]});
    if (condition == null) {
        interaction.reply({content: locale.condition_edit_error_notFound, ephemeral: true})
        return;
    }
    if (condition.user.userid != user.userid) {
        interaction.reply({content: locale.condition_edit_error_noAccess, ephemeral: true})
        return;
    }

    const modal = new ModalBuilder()
        .setCustomId("editCondition" + condition.id)
        .setTitle(locale.condition_edit_title + condition.name);
    const conditionInput = new TextInputBuilder()
        .setCustomId("condition")
        .setLabel(locale.condition_edit_condition_label)
        .setPlaceholder(locale.condition_edit_condition_placeHolder)
        .setStyle(TextInputStyle.Paragraph)
        .setValue(condition.condition)
        .setRequired(true);
    const embedTitleInput = new TextInputBuilder()
        .setCustomId("embedTitle")
        .setLabel(locale.condition_edit_embedTitle_label)
        .setPlaceholder(locale.condition_edit_embedTitle_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setValue(condition.embedTitle)
        .setRequired(true);
    const embedDescriptionInput = new TextInputBuilder()
        .setCustomId("embedDescription")
        .setLabel(locale.condition_edit_embedDescription_label)
        .setPlaceholder(locale.condition_edit_embedDescription_placeHolder)
        .setStyle(TextInputStyle.Paragraph)
        .setValue(condition.embedDescription)
        .setRequired(true);
    const embedThumbnailInput = new TextInputBuilder()
        .setCustomId("embedThumbnail")
        .setLabel(locale.condition_edit_embedThumbnail_label)
        .setPlaceholder(locale.condition_edit_embedThumbnail_placeHolder)
        .setValue(condition.embedThumbnail)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const winRoleInput = new TextInputBuilder()
        .setCustomId("winRole")
        .setLabel(locale.condition_edit_winRole_label)
        .setPlaceholder(locale.condition_edit_winRole_placeHolder)
        .setValue(condition.winRole)
        .setValue("innocent")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(conditionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(embedTitleInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(embedDescriptionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(embedThumbnailInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(winRoleInput),
    );
    await interaction.showModal(modal);
}