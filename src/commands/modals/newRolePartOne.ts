import {
    ActionRowBuilder, ButtonBuilder,
    ButtonInteraction, ButtonStyle,
    ModalBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";

module.exports.execute = async function (interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
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
        imageLink: interaction.fields.getTextInputValue("roleImage"),
        description: interaction.fields.getTextInputValue("roleDescription")
    }).save();

    const buttons  = new ActionRowBuilder<ButtonBuilder>()
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