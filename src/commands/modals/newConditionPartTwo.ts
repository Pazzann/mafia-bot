import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalSubmitInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import WinningCondition from "../../Entities/WinningCondition.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

module.exports.execute = async function (interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }
    const name = interaction.customId.split("newConditionPartTwo").join("");

    const condition = WinningCondition.create({
        name,
        user,
        condition: interaction.fields.getTextInputValue("condition"),
        embedTitle: interaction.fields.getTextInputValue("embedTitle"),
        embedDescription: interaction.fields.getTextInputValue("embedDescription"),
        embedThumbnail: interaction.fields.getTextInputValue("embedThumbnail"),
        winRole: interaction.fields.getTextInputValue("winRole")
    });
    await condition.save();

    const embed = MafiaEmbedBuilder.conditionEmbed(condition, locale);

    await interaction.reply({content: "Succesfully", embeds: [embed]});
}