import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default  async function helpmessage(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    const modal = new ModalBuilder()
        .setCustomId("textToModeration")
        .setTitle(locale.helpMessage_title);


    const textInput = new TextInputBuilder()
        .setCustomId("text")
        .setLabel(locale.helpMessage_text_label)
        .setPlaceholder(locale.helpMessage_text_placeHolder)
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(textInput)
    );

    await interaction.showModal(modal);
}