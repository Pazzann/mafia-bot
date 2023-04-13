import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }

    const buttons  = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💵")
                .setLabel("Delete Role")
                .setStyle(ButtonStyle.Danger)
                .setCustomId("deleterole")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("🧐")
                .setLabel("Create Role")
                .setStyle(ButtonStyle.Success)
                .setCustomId("createrole")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("🧐")
                .setLabel("Edit Role")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("editrole")
                .setDisabled(false),

        );
    const buttons2  = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💵")
                .setLabel("Delete Condition")
                .setStyle(ButtonStyle.Danger)
                .setCustomId("deletecondition")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("🧐")
                .setLabel("Create Condition")
                .setStyle(ButtonStyle.Success)
                .setCustomId("createcondition")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("🧐")
                .setLabel("Edit Condition")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("editcondition")
                .setDisabled(false),

        );
    interaction.reply({content: "Choose action", components: [buttons, buttons2], ephemeral: true});
}