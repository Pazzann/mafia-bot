import {ActionRowBuilder, ButtonInteraction, RestOrArray, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function editcondition(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }
    if (user.conditions.length > 0) {
        const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];
        for (let condition of user.conditions){
            const conditionOption = new StringSelectMenuOptionBuilder()
                .setLabel(condition.name)
                .setValue(String(condition.id));
            chooseArr.push(conditionOption)
        }
        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("editcondition")
                    .setPlaceholder(locale.condition_edit_select_placeHolder)
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
            );
        interaction.reply({content: locale.condition_edit_select_message, ephemeral: true, components: [row]});
    } else {
        interaction.reply({content: locale.condition_delete_error_noConditions, ephemeral: true})
    }
}