import {SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";
import WinningCondition from "../../Entities/WinningCondition.entity";

module.exports.execute = async function (interaction: SelectMenuInteraction, user: User, locale: ILangProps, conditionId: number) {

    if (!user.premium) {
        interaction.reply({
            content: "You don't have premium to create custom roles and conditions, sorry!",
            ephemeral: true
        })
        return;
    }
    const condition = await WinningCondition.findOne({where: {id: conditionId}, relations: ["user"]});
    if (condition == null) {
        interaction.reply({content: "No role found!", ephemeral: true})
        return;
    }
    if (condition.user.userid != user.userid) {
        interaction.reply({content: "You don't have permission to edit this role, sorry!", ephemeral: true})
        return;
    }
    const embed = MafiaEmbedBuilder.conditionEmbed(condition, locale);


    interaction.reply({ ephemeral: true, embeds: [embed]})
}