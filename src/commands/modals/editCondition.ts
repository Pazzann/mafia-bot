import {ModalSubmitInteraction, TextInputComponent} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";
import WinningCondition from "../../Entities/WinningCondition.entity";

module.exports.execute = async function (interaction: ModalSubmitInteraction, user: User, locale: ILangProps, conditionId: string) {
    if(!user.premium){
        interaction.followUp({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }

    try{
        const condition = await WinningCondition.findOne({where: {id: +conditionId}, relations: ["user"]});
        if(condition == null){
            interaction.followUp({content: "No role found!", ephemeral: true})
            return;
        }
        if(condition.user.userid != user.userid){
            interaction.followUp({content: "You don't have permission to edit this role, sorry!", ephemeral: true})
            return;
        }


        condition.condition = interaction.fields.getTextInputValue("condition");
        condition.embedTitle = interaction.fields.getTextInputValue("embedTitle");
        condition.embedDescription = interaction.fields.getTextInputValue("embedDescription");
        condition.embedThumbnail = interaction.fields.getTextInputValue("embedThumbnail");
        condition.winRole = interaction.fields.getTextInputValue("winRole");
        condition.save();



        interaction.followUp({ephemeral: false, content: "succesfully", embeds:[MafiaEmbedBuilder.conditionEmbed(condition, locale)]})


    }catch (err) {
    }

}