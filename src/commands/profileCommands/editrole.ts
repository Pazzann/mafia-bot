import {ActionRowBuilder, ButtonInteraction, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function editrole(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }

    const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
    for (let role of user.customRoles) {
        const roleOption = new SelectMenuOptionBuilder()
            .setLabel(role.name)
            .setValue("editrole" + String(role.id));
        chooseArr.push(roleOption)
    }

    const row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId("editrole")
                .setPlaceholder(locale.role_edit_select_placeHolder)
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(chooseArr)
        );
    interaction.reply({content: locale.role_edit_select_message, ephemeral: true, components: [row]});
}