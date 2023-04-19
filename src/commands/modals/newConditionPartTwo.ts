import {ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, ModalSubmitInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import WinningCondition from "../../Entities/WinningCondition.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

let validUrl = require('valid-url');


module.exports.execute = async function (interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {

    if (!user.premium) {
        interaction.reply({
            content: "You don't have premium to create custom roles and conditions, sorry!",
            ephemeral: true
        })
        return;
    }
    const name = interaction.customId.split("newConditionPartTwo").join("");

    let imageURL = interaction.fields.getTextInputValue("embedThumbnail");
    if (!validUrl.isUri(imageURL)) {
        imageURL = "https://cdn.discordapp.com/attachments/1007804567183954070/1007804829919350895/IMG_2292.jpg";
    }


    const condition = WinningCondition.create({
        name,
        user,
        condition: interaction.fields.getTextInputValue("condition"),
        embedTitle: interaction.fields.getTextInputValue("embedTitle"),
        embedDescription: interaction.fields.getTextInputValue("embedDescription"),
        embedThumbnail: imageURL,
        winRole: interaction.fields.getTextInputValue("winRole")
    });
    await condition.save();

    const embed = MafiaEmbedBuilder.conditionEmbed(condition, locale);

    await interaction.reply({content: "Succesfully", embeds: [embed]});
}