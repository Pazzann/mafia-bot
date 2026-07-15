import {MessageFlags, ModalSubmitInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedFactory from "../../Classes/MafiaEmbedFactory";
import {Action} from "../../types/Action";

export default async function editRole (interaction: ModalSubmitInteraction, user: User, locale: ILangProps) {
    if (!user.premium) {
        interaction.reply({content: locale.error_premium, flags: MessageFlags.Ephemeral}).catch();
        return;
    }
    try {
        let roleId = +interaction.customId.split("editRole").join('');
        const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
        if (role == null) {
            interaction.reply({content: locale.role_edit_error_notFound, flags: MessageFlags.Ephemeral}).catch();
            return;
        }
        if (role.user.userid != user.userid) {
            interaction.reply({content: locale.role_edit_error_noAccess, flags: MessageFlags.Ephemeral}).catch();
            return;
        }

        let IdOfInput = interaction.fields.fields.first()!.customId;
        let value = interaction.fields.getTextInputValue(IdOfInput);
        switch (IdOfInput) {
            case "editRolename": {
                role.name = value;
                break;
            }
            case "editRoledescription": {
                role.description = value;
                break;
            }
            case "editRoleimage": {
                role.imageLink = value;
                break;
            }
            case "editRoleaction": {
                role.action = value as Action;
                break;
            }
            case "editRoledelay": {
                role.delay = +value;
                break;
            }
            case "editRolegroupdec": {
                role.groupDec = Boolean(value);
                break;
            }
            case "editRoleplaceholder": {
                role.placeHolder = value;
                break;
            }
            case "editRoleselfselectable": {
                role.selfSelectable = Boolean(value);
                break;
            }
            case "editRolespawnfrom": {
                role.spawnFrom = +value;
                break;
            }
            case "editRolecount": {
                role.count = value;
                break;
            }
        }

        role.save();
        interaction.reply({content: locale.role_edit_success_message, flags: MessageFlags.Ephemeral, embeds:[MafiaEmbedFactory.roleEmbed(role, locale)]}).catch();
    } catch (err) {
    }
}