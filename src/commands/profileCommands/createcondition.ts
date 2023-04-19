import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }
    if(user.customRoles.length>=19){
        interaction.reply({content: "You can't create more then 21 conditions, sorry!", ephemeral: true})
        return;
    }


    const modal = new ModalBuilder()
        .setCustomId("newConditionPartOne")
        .setTitle("Condition Creation");


    const nameInput = new TextInputBuilder()
        .setCustomId("conditionName")
        .setLabel("Name")
        .setPlaceholder("What is the name of your condition?")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(20)
        .setMinLength(3)
        .setRequired(true);



    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput),
    );

    await interaction.showModal(modal);
}