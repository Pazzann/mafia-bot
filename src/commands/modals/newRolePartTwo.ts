import {EmbedBuilder, ModalSubmitInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

export default async function newRolePartTwo(interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {
    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true}).catch();
        return;
    }
    try {
        let id = Number(interaction.customId.split("newRolePartTwo").join(''));
        const role = await Role.findOne({where: {id: id}, relations: ["user"]});
        if (role == null) {
            interaction.reply({content: locale.role_create_error_notFound, ephemeral: true}).catch();
            return;
        }
        if (role.user.userid != user.userid) {
            interaction.reply({content: locale.role_create_error_noAccess, ephemeral: true}).catch();
            return;
        }

        let action = interaction.fields.getTextInputValue("roleAction");
        if (action == "kill" || action == "heal" || action == "alibi" || action == "check" || action == "full_check" || action == "no_activity")
            role.action = action;
        else
            role.action = "no_activity"
        role.selfSelectable = interaction.fields.getTextInputValue("roleSelectable") === "true";
        role.delay = isNaN(+interaction.fields.getTextInputValue("roleDelay")) ? +interaction.fields.getTextInputValue("roleDelay") > 0 ? +interaction.fields.getTextInputValue("roleDelay") : 1 : 1;
        role.spawnFrom = !isNaN(+interaction.fields.getTextInputValue("roleSpawnFrom")) ? +interaction.fields.getTextInputValue("roleSpawnFrom") : 0;
        role.groupDec = interaction.fields.getTextInputValue("roleGroupSelection") === "true";
        await role.save();

        const embed = MafiaEmbedBuilder.roleEmbed(role, locale);
        await interaction.reply({content: locale.role_create_success_message, embeds: [embed], ephemeral: true}).catch();
    } catch (err) {
        await interaction.reply(locale.error_unknown).catch();
    }

}