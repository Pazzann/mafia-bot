import {ActionRowBuilder, ButtonInteraction, ModalBuilder, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function createcondition(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }
    if(user.customRoles.length>=19){
        interaction.reply({content: locale.condition_create_error_number, ephemeral: true})
        return;
    }


    const modal = new ModalBuilder()
        .setCustomId("newConditionPartOne")
        .setTitle(locale.condition_create_title1);


    const nameInput = new TextInputBuilder()
        .setCustomId("conditionName")
        .setLabel(locale.condition_create_conditionName_label)
        .setPlaceholder(locale.condition_create_conditionName_placeHolder)
        .setStyle(TextInputStyle.Short)
        .setMaxLength(20)
        .setMinLength(3)
        .setRequired(true);



    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(nameInput),
    );

    await interaction.showModal(modal);
}