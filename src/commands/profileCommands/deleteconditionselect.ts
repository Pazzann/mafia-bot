import {SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import WinningCondition from "../../Entities/WinningCondition.entity";

module.exports.execute = async function (interaction: SelectMenuInteraction, user: User, locale: ILangProps, conditionId: number) {

    if (!user.premium) {
        interaction.reply({
            content: "You don't have premium to create custom roles and conditions, sorry!",
            ephemeral: true
        })
        return;
    }
    try {
        const role = await WinningCondition.findOne({where: {id: conditionId}, relations: ["user"]});
        if (role == null) {
            interaction.reply({content: "No condition found!", ephemeral: true})
            return;
        }
        if (role.user.userid != user.userid) {
            interaction.reply({content: "You don't have permission to delete this condition, sorry!", ephemeral: true})
            return;
        }
        await WinningCondition.delete({id: conditionId});
        interaction.reply("successfully deleted");
    }catch (err){

        interaction.reply("not deleted");
    }

}