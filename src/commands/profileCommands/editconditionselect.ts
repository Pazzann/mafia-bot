import {ActionRowBuilder, ModalBuilder, SelectMenuInteraction, TextInputBuilder, TextInputStyle} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import WinningCondition from "../../Entities/WinningCondition.entity";

module.exports.execute = async function (interaction: SelectMenuInteraction, user: User, locale: ILangProps, conditionId: number) {

    if (!user.premium) {
        interaction.followUp({
            content: "You don't have premium to create custom roles and conditions, sorry!",
            ephemeral: true
        })
        return;
    }

    const condition = await WinningCondition.findOne({where: {id: conditionId}, relations: ["user"]});
    if (condition == null) {
        interaction.followUp({content: "No condition found!", ephemeral: true})
        return;
    }
    if (condition.user.userid != user.userid) {
        interaction.followUp({content: "You don't have permission to delete this condition, sorry!", ephemeral: true})
        return;
    }


    const modal = new ModalBuilder()
        .setCustomId('editCondition' + condition.id)
        .setTitle(condition.name + ' Edition');
    const conditionInput = new TextInputBuilder()
        .setCustomId('condition')
        .setLabel("Condition")
        .setPlaceholder("Enter new condition. ")
        .setStyle(TextInputStyle.Paragraph)
        .setValue(condition.condition)
        .setRequired(true);
    const embedTitleInput = new TextInputBuilder()
        .setCustomId('embedTitle')
        .setLabel("Embed Title")
        .setPlaceholder("enter new embed title")
        .setStyle(TextInputStyle.Short)
        .setValue(condition.embedTitle)
        .setRequired(true);
    const embedDescriptionInput = new TextInputBuilder()
        .setCustomId('embedDescription')
        .setLabel("Embed Description")
        .setPlaceholder("enter new embed description")
        .setStyle(TextInputStyle.Short)
        .setValue(condition.embedDescription)
        .setRequired(true);
    const embedThumbnailInput = new TextInputBuilder()
        .setCustomId('embedThumbnail')
        .setLabel("Embed Thumbnail")
        .setPlaceholder("new image")
        .setValue(condition.embedThumbnail)
        .setStyle(TextInputStyle.Short)
        .setRequired(true);
    const winRoleInput = new TextInputBuilder()
        .setCustomId('winRole')
        .setLabel("Win role")
        .setPlaceholder("just a new role name")
        .setValue(condition.winRole)
        .setValue("innocent")
        .setStyle(TextInputStyle.Short)
        .setRequired(true);

    modal.addComponents(
        new ActionRowBuilder<TextInputBuilder>().addComponents(conditionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(embedTitleInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(embedDescriptionInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(embedThumbnailInput),
        new ActionRowBuilder<TextInputBuilder>().addComponents(winRoleInput),
    );
    await interaction.showModal(modal);

}