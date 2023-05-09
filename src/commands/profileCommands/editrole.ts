import {ActionRowBuilder, ButtonInteraction, RestOrArray, StringSelectMenuBuilder, StringSelectMenuOptionBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function editrole(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true}).catch();
        return;
    }

    const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];
    for (let role of user.customRoles) {
        const roleOption = new StringSelectMenuOptionBuilder()
            .setLabel(role.name)
            .setValue("editrole" + String(role.id));
        chooseArr.push(roleOption)
    }

    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("editrole")
                .setPlaceholder(locale.role_edit_select_placeHolder)
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(chooseArr)
        );
    interaction.reply({content: locale.role_edit_select_message, ephemeral: true, components: [row]}).catch();
}