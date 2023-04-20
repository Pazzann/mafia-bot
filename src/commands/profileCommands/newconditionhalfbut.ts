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
        .setCustomId("newConditionPartTwo" + name)
        .setTitle("Condition Creation: " + name);
    const conditionInput = new TextInputBuilder()
        .setCustomId("condition")
        .setLabel("Condition")
        .setPlaceholder("your condition; for more information see _/help -> Scripting_")
        .setStyle(TextInputStyle.Paragraph)
        .setValue("false")
        .setRequired(true);
    const embedTitleInput = new TextInputBuilder()
        .setCustomId("embedTitle")
        .setLabel("Title")
        .setPlaceholder("Mafia wins ;)")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const embedDescriptionInput = new TextInputBuilder()
        .setCustomId("embedDescription")
        .setLabel("Description")
        .setPlaceholder("Mysteriously the mafia has won...")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const embedThumbnailInput = new TextInputBuilder()
        .setCustomId("embedThumbnail")
        .setLabel("Thumbnail")
        .setPlaceholder("crazy kitty image link")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const winRoleInput = new TextInputBuilder()
        .setCustomId("winRole")
        .setLabel("Winning Role")
        .setPlaceholder("just a winning role name")
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