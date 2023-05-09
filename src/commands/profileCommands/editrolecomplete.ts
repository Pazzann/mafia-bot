import {
    ActionRowBuilder,
    ModalBuilder,
    SelectMenuInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";

export default async function editrolecomplete(interaction: SelectMenuInteraction, user: User, locale: ILangProps) {
    try {
        if (!user.premium) {
            interaction.reply({content: locale.error_premium, ephemeral: true}).catch();
            return;
        }

        let roleId = +interaction.values[0].match(/[0-9]+/)[0];
        let action = interaction.values[0].split("editrole").join('').split(String(roleId)).join('');
        const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
        if (role == null) {
            interaction.reply({content: locale.role_edit_error_notFound, ephemeral: true}).catch();
            return;
        }
        if (role.user.userid != user.userid) {
            interaction.reply({content: locale.role_edit_error_noAccess, ephemeral: true}).catch();
            return;
        }

        const modal = new ModalBuilder()
            .setCustomId("editRole" + String(roleId))
            .setTitle(locale.role_edit_title + role.name);

        switch (action) {
            case "name":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_roleName_label)
                            .setPlaceholder(locale.role_edit_roleName_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                            .setValue(role.name)
                        )
                )
                break;
            }
            case "description":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_roleDescription_label)
                            .setPlaceholder(locale.role_edit_roleDescription_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Paragraph)
                            .setValue(role.description)
                        )
                )
                break;
            }
            case "image":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_roleImage_label)
                            .setPlaceholder(locale.role_edit_roleImage_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                            .setValue(role.imageLink)
                        )
                )
                break;
            }
            case "count":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_roleCount_label)
                            .setPlaceholder(locale.role_edit_roleCount_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Paragraph)
                            .setValue(role.count)
                        )
                )
                break;
            }
            case "placeholder":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_rolePlaceHolder_label)
                            .setMaxLength(100)
                            .setPlaceholder(locale.role_edit_rolePlaceHolder_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                            .setValue(role.placeHolder)
                        )
                )
                break;
            }
            case "action":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_roleAction_label)
                            .setPlaceholder(locale.role_edit_roleAction_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                            .setValue(role.action)
                        )
                )
                break;
            }
            case "selfselectable":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_roleSelectable_label)
                            .setPlaceholder(locale.role_edit_roleSelectable_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                            .setValue(String(role.selfSelectable))
                        )
                )
                break;
            }
            case "delay":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_roleDelay_label)
                            .setPlaceholder(locale.role_edit_roleDelay_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                            .setValue(role.delay.toString())
                        )
                )
                break;
            }
            case "spawnfrom":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_roleSpawnFrom_label)
                            .setPlaceholder(locale.role_edit_roleSpawnFrom_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                            .setValue(String(role.spawnFrom))
                        )
                )
                break;
            }
            case "groupdec":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId("editRole" + action)
                            .setLabel(locale.role_edit_roleGroupSelection_label)
                            .setPlaceholder(locale.role_edit_roleGroupSelection_placeHolder)
                            .setRequired(true)
                            .setStyle(TextInputStyle.Short)
                            .setValue(String(role.groupDec))
                        )
                )
                break;
            }
        }

        await interaction.showModal(modal);
    } catch (err) {
        console.log(err)
    }
}