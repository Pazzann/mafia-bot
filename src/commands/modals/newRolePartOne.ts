import {
    ActionRowBuilder, ButtonBuilder,
    ButtonStyle,
    ModalSubmitInteraction
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";

let validUrl = require('valid-url');

module.exports.execute = async function (interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {

    if (!user.premium) {
        interaction.reply({
            content: "You don't have premium to create custom roles and conditions, sorry!",
            ephemeral: true
        })
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
                .setEmoji("💵")
                .setLabel("Open Next")
                .setStyle(ButtonStyle.Success)
                .setCustomId("newrolehalfbut" + role.id)
                .setDisabled(false),
        );
    await interaction.reply({content: "Click the button", ephemeral: true, components: [buttons]})

}