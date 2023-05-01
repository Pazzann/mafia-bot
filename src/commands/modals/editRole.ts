import {ModalSubmitInteraction, TextInputComponent} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

export default async function editRole (interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {
    if (!user.premium) {
        interaction.reply({content: locale.error_premium, ephemeral: true})
        return;
    }
    try {
        let roleId = +interaction.customId.split("editRole").join('');
        const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
        if (role == null) {
            interaction.reply({content: locale.role_edit_error_notFound, ephemeral: true})
            return;
        }
        if (role.user.userid != user.userid) {
            interaction.reply({content: locale.role_edit_error_noAccess, ephemeral: true})
            return;
        }

        let IdOfInput = (interaction.components[0].components[0] as TextInputComponent).customId;
        switch (IdOfInput) {
            case "editRolename": {
                role.name = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoledescription": {
                role.description = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoleimage": {
                role.imageLink = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoleaction": {
                role.action = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoledelay": {
                role.delay = +(interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRolegroupdec": {
                role.groupDec = Boolean((interaction.components[0].components[0] as TextInputComponent).value);
                break;
            }
            case "editRoleplaceholder": {
                role.placeHolder = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoleselfselectable": {
                role.selfSelectable = Boolean((interaction.components[0].components[0] as TextInputComponent).value);
                break;
            }
            case "editRolespawnfrom": {
                role.spawnFrom = +(interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRolecount": {
                role.count = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
        }

        role.save();
        interaction.reply({content: locale.role_edit_success_message, ephemeral: false, embeds:[MafiaEmbedBuilder.roleEmbed(role, locale)]})
    } catch (err) {
    }
}