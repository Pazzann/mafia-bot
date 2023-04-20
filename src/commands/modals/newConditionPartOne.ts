import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ModalSubmitInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";

module.exports.execute = async function (interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }
    const name = interaction.fields.getTextInputValue("conditionName");

    const buttons  = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💵")
                .setLabel("Open Next")
                .setStyle(ButtonStyle.Success)
                .setCustomId("newconditionhalfbut" + name)
                .setDisabled(false),
        );
    await interaction.reply({content: "Click the button", ephemeral: true, components: [buttons]})

}