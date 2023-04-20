import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: locale.create_condition_error_premium, ephemeral: true})
        return;
    }
    if(user.customRoles.length>=19){
        interaction.reply({content: locale.create_condition_error_number, ephemeral: true})
        return;
    }


    const modal = new ModalBuilder()
        .setCustomId("newConditionPartOne")
        .setTitle(locale.create_condition_title1);


    const nameInput = new TextInputBuilder()
        .setCustomId("conditionName")
        .setLabel(locale.create_condition_conditionName_label)
        .setPlaceholder(locale.create_condition_conditionName_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setMaxLength(20)
        .setMinLength(3)
        .setRequired(true);



    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput),
    );

    await interaction.showModal(modal);
}