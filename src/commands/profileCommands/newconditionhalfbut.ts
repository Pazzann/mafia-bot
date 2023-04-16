import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }
    const name = interaction.customId.split("newconditionhalfbut").join("");
    const modal = new ModalBuilder()
        .setCustomId('newConditionPartTwo' + name)
        .setTitle(name + ' Creation');
    const conditionInput = new TextInputBuilder()
        .setCustomId('condition')
        .setLabel("Condition")
        .setPlaceholder("Enter condition. For more information see /help Scripting")
        .setStyle(TextInputStyle.Paragraph)
        .setValue("false")
        .setRequired(true);
    const embedTitleInput = new TextInputBuilder()
        .setCustomId('embedTitle')
        .setLabel("Embed Title")
        .setPlaceholder("Mafia wins ;)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const embedDescriptionInput = new TextInputBuilder()
        .setCustomId('embedDescription')
        .setLabel("Embed Description")
        .setPlaceholder("Mafia has won somehow")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const embedThumbnailInput = new TextInputBuilder()
        .setCustomId('embedThumbnail')
        .setLabel("Embed Thumbnail")
        .setPlaceholder("Crazy kitty image")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const winRoleInput = new TextInputBuilder()
        .setCustomId('winRole')
        .setLabel("Win role")
        .setPlaceholder("just a role name")
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