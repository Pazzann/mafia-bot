import {ModalSubmitInteraction, TextInputComponent} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";
import WinningCondition from "../../Entities/WinningCondition.entity";

export default async function editCondition (interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {
    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true}).catch()
        return;
    }
    try {
        let conditionId = interaction.customId.split("editCondition").join('');
        const condition = await WinningCondition.findOne({where: {id: +conditionId}, relations: ["user"]});
        if (condition == null) {
            interaction.reply({content: locale.condition_edit_error_notFound, ephemeral: true}).catch()
            return;
        }
        if (condition.user.userid != user.userid) {
            interaction.reply({content: locale.condition_edit_error_noAccess, ephemeral: true}).catch()
            return;
        }

        condition.condition = interaction.fields.getTextInputValue("condition");
        condition.embedTitle = interaction.fields.getTextInputValue("embedTitle");
        condition.embedDescription = interaction.fields.getTextInputValue("embedDescription");
        condition.embedThumbnail = interaction.fields.getTextInputValue("embedThumbnail");
        condition.winRole = interaction.fields.getTextInputValue("winRole");
        condition.save();

        interaction.reply({content: locale.condition_edit_success_message, ephemeral: false, embeds:[MafiaEmbedBuilder.conditionEmbed(condition, locale)]}).catch()
    } catch (err) {
    }
}