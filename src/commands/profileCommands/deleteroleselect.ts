import {SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

module.exports.execute = async function (interaction: SelectMenuInteraction, user: User, locale: ILangProps, roleId: number) {

    if (!user.premium) {
        interaction.reply({
            content: "You don't have premium to create custom roles and conditions, sorry!",
            ephemeral: true
        })
        return;
    }
    try {
        const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
        if (role == null) {
            interaction.reply({content: "No role found!", ephemeral: true})
            return;
        }
        if (role.user.userid != user.userid) {
            interaction.reply({content: "You don't have permission to edit this role, sorry!", ephemeral: true})
            return;
        }
        await Role.delete({id: roleId});
        interaction.reply({content: "successfully deleted", ephemeral: true});
    } catch (err) {

        interaction.reply({content: "not deleted", ephemeral: true});
    }

}