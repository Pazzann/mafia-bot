import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    SelectMenuInteraction,
    StringSelectMenuOptionBuilder
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

export default async function editroleselectmenu(interaction: SelectMenuInteraction, user: User, locale: ILangProps, roleId: number) {

    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }

    const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
    if (role == null) {
        interaction.reply({content: locale.role_edit_error_notFound, ephemeral: true})
        return;
    }
    if (role.user.userid != user.userid) {
        interaction.reply({content: locale.role_edit_error_noAccess, ephemeral: true})
        return;
    }
    const embed = MafiaEmbedBuilder.roleEmbed(role, locale);

    const row = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(
            new StringSelectMenuBuilder()
                .setCustomId("editroleselection")
                .setPlaceholder(locale.role_edit_selectField_placeHolder)
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_roleName_label)
                        .setValue("editrolename" + String(role.id)),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_roleDescription_label)
                        .setValue("editroledescription" + String(role.id)),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_roleImage_label)
                        .setValue("editroleimage" + String(role.id)),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_roleCount_label)
                        .setValue("editrolecount" + String(role.id)),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_rolePlaceHolder_label)
                        .setValue("editroleplaceholder" + String(role.id)),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_roleAction_label)
                        .setValue("editroleaction" + String(role.id)),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_roleSelectable_label)
                        .setValue("editroleselfselectable" + String(role.id)),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_roleDelay_label)
                        .setValue("editroledelay" + String(role.id)),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_roleSpawnFrom_label)
                        .setValue("editrolespawnfrom" + String(role.id)),
                    new StringSelectMenuOptionBuilder()
                        .setLabel(locale.role_edit_selectField_roleGroupSelection_label)
                        .setValue("editrolegroupdec" + String(role.id))
                ])
        );

    interaction.reply({content: locale.role_edit_selectField_message, ephemeral: true, embeds: [embed], components: [row]})
}