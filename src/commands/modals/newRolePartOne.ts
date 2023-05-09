import {
    ActionRowBuilder, ButtonBuilder,
    ButtonStyle,
    ModalSubmitInteraction
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";

let validUrl = require('valid-url');

export default async function newRolePartOne (interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true}).catch();
        return;
    }
    let imageURL = interaction.fields.getTextInputValue("roleImage");
    if (!validUrl.isUri(imageURL)) {
        imageURL = "https://cdn.discordapp.com/attachments/1007804567183954070/1007804829919350895/IMG_2292.jpg";
    }


    const role = await Role.create({
        user: user,
        action: "no_activity",
        name: interaction.fields.getTextInputValue("roleName"),
        delay: 1,
        groupDec: false,
        count: interaction.fields.getTextInputValue("roleCount"),
        spawnFrom: 1,
        selfSelectable: false,
        placeHolder: interaction.fields.getTextInputValue("rolePlaceHolder"),
        imageLink: imageURL,
        description: interaction.fields.getTextInputValue("roleDescription")
    }).save();

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setLabel(locale.role_create_goNext_button)
                .setStyle(ButtonStyle.Success)
                .setCustomId("newrolehalfbut" + role.id)
                .setDisabled(false),
        );
    await interaction.reply({content: locale.role_create_goNext_message, ephemeral: true, components: [buttons]}).catch();

}