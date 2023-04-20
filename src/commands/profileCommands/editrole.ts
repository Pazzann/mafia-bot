import {ActionRowBuilder, ButtonInteraction, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }
    const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];

    for (let role of user.customRoles){
        const roleOption = new SelectMenuOptionBuilder()
            .setLabel(role.name)
            .setValue("editrole"  + String(role.id));
        chooseArr.push(roleOption)
    }
    const row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId("editrole")
                .setPlaceholder('choose role to edit')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(chooseArr)
        );
    interaction.reply({ephemeral:true, content: "choose role to edit", components: [row]});
}