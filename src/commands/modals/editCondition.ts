import {ModalSubmitInteraction, TextInputComponent} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";
import WinningCondition from "../../Entities/WinningCondition.entity";

module.exports.execute = async function (interaction: ModalSubmitInteraction, user: User, locale: ILangProps, conditionId: string) {
    if(!user.premium){
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }

    try{
        const condition = await WinningCondition.findOne({where: {id: +conditionId}, relations: ["user"]});
        if (condition == null) {
            interaction.reply({content: locale.condition_edit_error_notFound, ephemeral: true})
            return;
        }
        if (condition.user.userid != user.userid) {
            interaction.reply({content: locale.condition_edit_error_noAccess, ephemeral: true})
            return;
        }


        condition.condition = interaction.fields.getTextInputValue("condition");
        condition.embedTitle = interaction.fields.getTextInputValue("embedTitle");
        condition.embedDescription = interaction.fields.getTextInputValue("embedDescription");
        condition.embedThumbnail = interaction.fields.getTextInputValue("embedThumbnail");
        condition.winRole = interaction.fields.getTextInputValue("winRole");
        condition.save();



        interaction.reply({ephemeral: false, content: locale.condition_edit_success_message, embeds:[MafiaEmbedBuilder.conditionEmbed(condition, locale)]})


    }catch (err) {
    }

}