import {SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import WinningCondition from "../../Entities/WinningCondition.entity";

export default async function deleteconditionselect(interaction: SelectMenuInteraction, user: User, locale: ILangProps, conditionId: number) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true}).catch();
        return;
    }
    try {
        const role = await WinningCondition.findOne({where: {id: conditionId}, relations: ["user"]});
        if (role == null) {
            interaction.reply({content: locale.condition_delete_error_notFound, ephemeral: true}).catch();
            return;
        }
        if (role.user.userid != user.userid) {
            interaction.reply({content: locale.condition_delete_error_noAccess, ephemeral: true}).catch();
            return;
        }
        await WinningCondition.delete({id: conditionId});
        interaction.reply({content: locale.condition_delete_success_message, ephemeral: true}).catch();
    } catch (err) {
        interaction.reply({content: locale.error_unknown, ephemeral: true}).catch();
    }

}