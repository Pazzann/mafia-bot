import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default  async function newconditionhalfbut(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }
    const name = interaction.customId.split("newconditionhalfbut").join("");
    const modal = new ModalBuilder()
        .setCustomId("newConditionPartTwo" + name)
        .setTitle(locale.condition_create_title2 + name);
    const conditionInput = new TextInputBuilder()
        .setCustomId("condition")
        .setLabel(locale.condition_create_condition_label)
        .setPlaceholder(locale.condition_create_condition_placeHolder)
        .setStyle(TextInputStyle.Paragraph)
        .setValue("false")
        .setRequired(true);
    const embedTitleInput = new TextInputBuilder()
        .setCustomId("embedTitle")
        .setLabel(locale.condition_create_embedTitle_label)
        .setPlaceholder(locale.condition_create_embedTitle_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const embedDescriptionInput = new TextInputBuilder()
        .setCustomId("embedDescription")
        .setLabel(locale.condition_create_embedDescription_label)
        .setPlaceholder(locale.condition_create_embedDescription_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const embedThumbnailInput = new TextInputBuilder()
        .setCustomId("embedThumbnail")
        .setLabel(locale.condition_create_embedThumbnail_label)
        .setPlaceholder(locale.condition_create_embedThumbnail_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const winRoleInput = new TextInputBuilder()
        .setCustomId("winRole")
        .setLabel(locale.condition_create_winRole_label)
        .setPlaceholder(locale.condition_create_winRole_placeHolder)
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