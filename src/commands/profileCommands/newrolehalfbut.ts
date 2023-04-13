import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps, id: number) {

    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }
    const modal = new ModalBuilder()
        .setCustomId('newRolePartTwo' + String(id))
        .setTitle('Role Creation');
    const actionInput = new TextInputBuilder()
        .setCustomId('roleAction')
        .setLabel("Action")
        .setPlaceholder("Enter action. For more information see /help Scripting")
        .setStyle(TextInputStyle.Short)
        .setValue("no_activity")
        .setMaxLength(15)
        .setMinLength(3)
        .setRequired(true);
    const selfSelectableInput = new TextInputBuilder()
        .setCustomId('roleSelectable')
        .setLabel("SelfSelectable")
        .setPlaceholder("true or false")
        .setValue("true")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const delayInput = new TextInputBuilder()
        .setCustomId('roleDelay')
        .setLabel("Delay")
        .setValue("1")
        .setPlaceholder("Delay between actions in days\"")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const spawnFromInput = new TextInputBuilder()
        .setCustomId('roleSpawnFrom')
        .setLabel("Spawn From")
        .setPlaceholder("Spawn from player count")
        .setValue("1")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const groupSelectionInput = new TextInputBuilder()
        .setCustomId('roleGroupSelection')
        .setLabel("Group selection")
        .setPlaceholder("true or false")
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