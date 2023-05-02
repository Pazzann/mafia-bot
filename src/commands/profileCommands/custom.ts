import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder, RestOrArray, StringSelectMenuBuilder, StringSelectMenuOptionBuilder
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function custom(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if(!user.premium){
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }

    const buttons  = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💡")
                .setLabel("Create Role")
                .setStyle(ButtonStyle.Success)
                .setCustomId("createrole")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("✏️")
                .setLabel("Edit Role")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("editrole")
                .setDisabled(!user.customRoles.length),
            new ButtonBuilder()
                .setEmoji("🔥")
                .setLabel("Delete Role")
                .setStyle(ButtonStyle.Danger)
                .setCustomId("deleterole")
                .setDisabled(!user.customRoles.length),
        );
    const buttons2  = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💡")
                .setLabel("Create Condition")
                .setStyle(ButtonStyle.Success)
                .setCustomId("createcondition")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("✏️")
                .setLabel("Edit Condition")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("editcondition")
                .setDisabled(!user.conditions.length),
            new ButtonBuilder()
                .setEmoji("🔥")
                .setLabel("Delete Condition")
                .setStyle(ButtonStyle.Danger)
                .setCustomId("deletecondition")
                .setDisabled(!user.conditions.length),
        );
    const components: ActionRowBuilder<ButtonBuilder | StringSelectMenuBuilder>[] = [buttons, buttons2];

    if(user.customRoles.length > 0){
        const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];
        for (let role of user.customRoles){
            const roleOption = new StringSelectMenuOptionBuilder()
                .setLabel(role.name)
                .setValue("viewrole"  + String(role.id));
            chooseArr.push(roleOption)
        }
        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("viewrole")
                    .setPlaceholder('choose role to view')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
            );
        components.push(row)
    }
    if(user.conditions.length > 0){
        const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];
        for (let condition of user.conditions){
            const conditionOption = new StringSelectMenuOptionBuilder()
                .setLabel(condition.name)
                .setValue("viewcondition"  + String(condition.id));
            chooseArr.push(conditionOption)
        }
        const row = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId("viewcondition")
                    .setPlaceholder('choose condition to view')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
            );
        components.push(row)
    }


    interaction.reply({content: "Choose action", components, ephemeral: true}).catch();
}