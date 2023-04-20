import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: locale.create_condition_error_premium, ephemeral: true})
        return;
    }
    const name = interaction.customId.split("newconditionhalfbut").join("");
    const modal = new ModalBuilder()
        .setCustomId("newConditionPartTwo" + name)
        .setTitle(locale.create_condition_title2 + name);
    const conditionInput = new TextInputBuilder()
        .setCustomId("condition")
        .setLabel(locale.create_condition_condition_label)
        .setPlaceholder(locale.create_condition_condition_placeHolder)
        .setStyle(TextInputStyle.Paragraph)
        .setValue("false")
        .setRequired(true);
    const embedTitleInput = new TextInputBuilder()
        .setCustomId("embedTitle")
        .setLabel(locale.create_condition_embedTitle_label)
        .setPlaceholder(locale.create_condition_embedTitle_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const embedDescriptionInput = new TextInputBuilder()
        .setCustomId("embedDescription")
        .setLabel(locale.create_condition_embedDescription_label)
        .setPlaceholder(locale.create_condition_embedDescription_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const embedThumbnailInput = new TextInputBuilder()
        .setCustomId("embedThumbnail")
        .setLabel(locale.create_condition_embedThumbnail_label)
        .setPlaceholder(locale.create_condition_embedThumbnail_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const winRoleInput = new TextInputBuilder()
        .setCustomId("winRole")
        .setLabel(locale.create_condition_winRole_label)
        .setPlaceholder(locale.create_condition_winRole_placeHolder)
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