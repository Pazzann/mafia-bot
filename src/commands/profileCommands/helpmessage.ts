import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {

    const modal = new ModalBuilder()
        .setCustomId('textToModeration')
        .setTitle('Msg to Support');


    const textInput = new TextInputBuilder()
        .setCustomId('text')
        .setLabel("Message")
        .setPlaceholder("Text of the message.")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(textInput)
    );

    await interaction.showModal(modal);
}