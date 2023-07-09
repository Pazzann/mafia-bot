import {SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import {curHostGames} from "../../index";
import MistressRole from "../../Classes/Roles/MisstressRole";
import PeacefulRole from "../../Classes/Roles/PeacefulRole";
import KillerRole from "../../Classes/Roles/KillerRole";
import PoliceRole from "../../Classes/Roles/PoliceRole";
import DoctorRole from "../../Classes/Roles/DoctorRole";
import MafiaRole from "../../Classes/Roles/MafiaRole";
import CustomRole from "../../Classes/Roles/CustomRole";

export default async function editGameRoleList(interaction: SelectMenuInteraction, user: User, locale: ILangProps) {
    try {
        let gameid = +interaction.values[0].split('%')[0];
        if (!curHostGames.has(gameid))
            return interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch();

        const host = curHostGames.get(gameid);
        if (host.author != interaction.user.id)
            return interaction.reply({content: locale.game_edit_error_noAccess, ephemeral: true}).catch();

        // if (!user.premium)
        //     return interaction.reply("You don't have premium to change game preset");

        host.roles = [];
        for (let role of interaction.values) {
            let roleId = role.split('%')[1];
            switch (roleId) {
                case new MistressRole().RoleName: {
                    host.roles.push(new MistressRole());
                    break;
                }
                case new MafiaRole().RoleName: {
                    host.roles.push(new MafiaRole());
                    break;
                }
                case new DoctorRole().RoleName: {
                    host.roles.push(new DoctorRole());
                    break;
                }
                case new PoliceRole().RoleName: {
                    host.roles.push(new PoliceRole());
                    break;
                }
                case new KillerRole().RoleName: {
                    host.roles.push(new KillerRole());
                    break;
                }
                case new PeacefulRole().RoleName: {
                    host.roles.push(new PeacefulRole());
                    break;
                }
                default: {
                    if (!user.premium)
                        return interaction.reply({content: locale.error_premium, ephemeral: true}).catch();
                    const customRole = await Role.findOne({where: {id: +roleId}, relations: ["user"]});
                    if (customRole == null)
                        return interaction.reply({content: locale.game_edit_roles_error_notFound, ephemeral: true}).catch();
                    if (customRole.user.userid != user.userid)
                        break;
                    host.roles.push(new CustomRole(
                        customRole.name,
                        customRole.action,
                        customRole.delay,
                        customRole.groupDec,
                        customRole.count,
                        customRole.spawnFrom,
                        customRole.placeHolder,
                        customRole.imageLink,
                        customRole.selfSelectable,
                        customRole.description
                    ));
                    break;
                }
            }
        }

        let roleStr = host.roles.reduce((previous, item)=> previous + "\`\`" + item.GetRoleName(user.lang) + "\`\`\n", "");
        host.embed.spliceFields(0, 1,
            {
                value: roleStr,
                name: `__**${locale.game_created_roles}**__`
            });
        curHostGames.set(gameid, host);
        host.interaction.editReply({embeds: [host.embed]}).catch();
        return interaction.reply({content: locale.game_edit_success_message, ephemeral: true}).catch();
    } catch (err) {
        return interaction.reply({content: locale.error_unknown, ephemeral: true}).catch();
    }
}