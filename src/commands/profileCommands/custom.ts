import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    RestOrArray, StringSelectMenuBuilder, StringSelectMenuOptionBuilder
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function custom(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true}).catch();
        return;
    }

    const buttons  = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💡")
                .setLabel(locale.custom_button_createrole)
                .setStyle(ButtonStyle.Success)
                .setCustomId("createrole")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("✏️")
                .setLabel(locale.custom_button_editrole)
                .setStyle(ButtonStyle.Primary)
                .setCustomId("editrole")
                .setDisabled(!user.customRoles.length),
            new ButtonBuilder()
                .setEmoji("🔥")
                .setLabel(locale.custom_button_deleterole)
                .setStyle(ButtonStyle.Danger)
                .setCustomId("deleterole")
                .setDisabled(!user.customRoles.length),
        );

    const buttons2  = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💡")
                .setLabel(locale.custom_button_createcondition)
                .setStyle(ButtonStyle.Success)
                .setCustomId("createcondition")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("✏️")
                .setLabel(locale.custom_button_editcondition)
                .setStyle(ButtonStyle.Primary)
                .setCustomId("editcondition")
                .setDisabled(!user.conditions.length),
            new ButtonBuilder()
                .setEmoji("🔥")
                .setLabel(locale.custom_button_deletecondition)
                .setStyle(ButtonStyle.Danger)
                .setCustomId("deletecondition")
                .setDisabled(!user.conditions.length),
        );

    const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [buttons, buttons2];

    if (user.customRoles.length > 0) {
        const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];
        for (let role of user.customRoles) {
            const roleOption = new StringSelectMenuOptionBuilder()
                .setLabel(role.name)
                .setValue("viewrole" + String(role.id));
            chooseArr.push(roleOption)
        }
        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("viewrole")
                    .setPlaceholder(locale.role_view_select_placeHolder)
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
            );
        components.push(row)
    }

    if (user.conditions.length > 0) {
        const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];
        for (let condition of user.conditions) {
            const conditionOption = new StringSelectMenuOptionBuilder()
                .setLabel(condition.name)
                .setValue("viewcondition" + String(condition.id));
            chooseArr.push(conditionOption)
        }
        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("viewcondition")
                    .setPlaceholder(locale.condition_view_select_placeHolder)
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
            );
        components.push(row)
    }

    interaction.reply({components, ephemeral: true}).catch();
}