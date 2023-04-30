import {
    ActionRowBuilder,
    ButtonInteraction,
    ChatInputCommandInteraction,
    ModalBuilder,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";


export default async function createrole(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }
    if (user.customRoles.length >= 19) {
        interaction.reply({content: locale.role_create_error_number, ephemeral: true})
        return;
    }


    const modal = new ModalBuilder()
        .setCustomId("newRolePartOne")
        .setTitle(locale.role_create_title1);


    const nameInput = new TextInputBuilder()
        .setCustomId("roleName")
        .setLabel(locale.role_create_roleName_label)
        .setPlaceholder(locale.role_create_roleName_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setMaxLength(20)
        .setMinLength(3)
        .setRequired(true);
    const descriptionInput = new TextInputBuilder()
        .setCustomId("roleDescription")
        .setLabel(locale.role_create_roleDescription_label)
        .setPlaceholder(locale.role_create_roleDescription_placeHolder)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
    const imageInput = new TextInputBuilder()
        .setCustomId("roleImage")
        .setLabel(locale.role_create_roleImage_label)
        .setPlaceholder(locale.role_create_roleImage_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const countInput = new TextInputBuilder()
        .setCustomId("roleCount")
        .setLabel(locale.role_create_roleCount_label)
        .setPlaceholder(locale.role_create_roleCount_placeHolder)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
    const placeHolderInput = new TextInputBuilder()
        .setCustomId("rolePlaceHolder")
        .setLabel(locale.role_create_rolePlaceHolder_label)
        .setPlaceholder(locale.role_create_rolePlaceHolder_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setMaxLength(100)
        .setRequired(true);



    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(imageInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(countInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(placeHolderInput),
    );

    await interaction.showModal(modal);
}