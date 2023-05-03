import {ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";
import WinningCondition from "../../Entities/WinningCondition.entity";

export default async function viewcondition(interaction: SelectMenuInteraction, user: User, locale: ILangProps, conditionId: number) {

    const condition = await WinningCondition.findOne({where: {id: conditionId}, relations: ["user"]});
    if (condition == null) {
        interaction.reply({content: locale.condition_view_error_notFound, ephemeral: true})
        return;
    }
    const buttonRow: ActionRowBuilder<ButtonBuilder> =
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(locale.condition_view_button_clone)
                    .setCustomId("cloneCondition" + conditionId)
                    .setEmoji("🌀")
                    .setStyle(ButtonStyle.Success)
            );
    const embed = MafiaEmbedBuilder.conditionEmbed(condition, locale);

    interaction.reply({ephemeral: true, embeds: [embed], components: [buttonRow]})
}