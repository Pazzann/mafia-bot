import {
    ActionRowBuilder,
    ButtonInteraction,
    RestOrArray, SelectMenuBuilder,
    SelectMenuInteraction,
    SelectMenuOptionBuilder
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

export default  async function viewrole(interaction: SelectMenuInteraction, user: User, locale: ILangProps, roleId: number) {

    if (!user.premium) {
        interaction.reply({
            content: "You don't have premium to create custom roles and conditions, sorry!",
            ephemeral: true
        })
        return;
    }
    const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
    if (role == null) {
        interaction.reply({content: "No role found!", ephemeral: true})
        return;
    }
    if (role.user.userid != user.userid) {
        interaction.reply({content: "You don't have permission to edit this role, sorry!", ephemeral: true})
        return;
    }
    const embed = MafiaEmbedBuilder.roleEmbed(role, locale);


    interaction.reply({ ephemeral: true, embeds: [embed]})
}