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

    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }
    if(user.customRoles.length>=19){
        interaction.reply({content: "You can't create more then 19 roles, sorry!", ephemeral: true})
        return;
    }


    const modal = new ModalBuilder()
        .setCustomId('newRolePartOne')
        .setTitle('Role Creation');


    const nameInput = new TextInputBuilder()
        .setCustomId('roleName')
        .setLabel("Name")
        .setPlaceholder("What is the name of your role?")
        .setStyle(TextInputStyle.Short)
        .setMaxLength(20)
        .setMinLength(3)
        .setRequired(true);
    const descriptionInput = new TextInputBuilder()
        .setCustomId('roleDescription')
        .setLabel("Description")
        .setPlaceholder("Description. For more information see /help Scripting")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
    const imageInput = new TextInputBuilder()
        .setCustomId('roleImage')
        .setLabel("Image link")
        .setPlaceholder("Enter image link for thumbnail")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const countInput = new TextInputBuilder()
        .setCustomId('roleCount')
        .setLabel("Count")
        .setPlaceholder("Enter count. For more information see /help Scripting")
        .setStyle(TextInputStyle.Paragraph)
        .setRequired(true);
    const placeHolderInput = new TextInputBuilder()
        .setCustomId('rolePlaceHolder')
        .setLabel("Place holder")
        .setPlaceholder("Place holder for selecting player to action")
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