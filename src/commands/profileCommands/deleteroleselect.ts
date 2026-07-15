import {MessageFlags, SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";

export default async function deleteroleselect(interaction: SelectMenuInteraction, user: User, locale: ILangProps, roleId: number) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, flags: MessageFlags.Ephemeral}).catch();
        return;
    }
    try {
        const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
        if (role == null) {
            interaction.reply({content: locale.role_delete_error_notFound, flags: MessageFlags.Ephemeral}).catch();
            return;
        }
        if (role.user.userid != user.userid) {
            interaction.reply({content: locale.role_delete_error_noAccess, flags: MessageFlags.Ephemeral}).catch();
            return;
        }
        await Role.delete({id: roleId});
        interaction.reply({content: locale.role_delete_success_message, flags: MessageFlags.Ephemeral}).catch();
    } catch (err) {
        interaction.reply({content:  locale.error_unknown, flags: MessageFlags.Ephemeral}).catch();
    }

}