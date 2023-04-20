import {ActionRowBuilder, ButtonInteraction, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {


    if(!user.premium){
        interaction.reply({content: "You don't have premium to edit conditions, sorry!", ephemeral: true})
        return;
    }
    if(user.conditions.length > 0){
        const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
        for (let condition of user.conditions){
            const conditionOption = new SelectMenuOptionBuilder()
                .setLabel(condition.name)
                .setValue(String(condition.id));
            chooseArr.push(conditionOption)
        }
        const row = new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId("editcondition")
                    .setPlaceholder('choose condition to edit')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
            );
        interaction.reply({ ephemeral: true, components: [row]});
    }else{
        interaction.reply({ephemeral: true, content: "You don't have conditions"})
    }


}