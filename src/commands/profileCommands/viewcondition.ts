import {SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";
import WinningCondition from "../../Entities/WinningCondition.entity";

export default async function viewcondition(interaction: SelectMenuInteraction, user: User, locale: ILangProps, conditionId: number) {

    if (!user.premium) {
        interaction.reply({
            content: locale.error_premium,
            ephemeral: true
        })
        return;
    }
    const condition = await WinningCondition.findOne({where: {id: conditionId}, relations: ["user"]});
    if (condition == null) {
        interaction.reply({content: locale.condition_view_error_notFound, ephemeral: true})
        return;
    }
    if (condition.user.userid != user.userid) {
        interaction.reply({content: locale.condition_view_error_noAccess, ephemeral: true})
        return;
    }
    const embed = MafiaEmbedBuilder.conditionEmbed(condition, locale);


    interaction.reply({ephemeral: true, embeds: [embed]})
}