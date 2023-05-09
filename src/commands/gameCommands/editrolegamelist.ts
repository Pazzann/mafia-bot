import {
    ActionRowBuilder,
    ButtonInteraction,
    ModalBuilder,
    SelectMenuInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
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
import {Action} from "../../types/Action";

export default async function editrolegamelist(interaction: SelectMenuInteraction, user: User, locale: ILangProps) {
    try {
        let gameid = +interaction.values[0].split('%')[0];
        if (curHostGames.has(gameid)) {
            const host = curHostGames.get(gameid);
            if (host.author == interaction.user.id) {
                // if (!user.premium) {
                //     interaction.reply("You don't have premium to change game preset");
                //     return;
                // }
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
                            if (!user.premium) {
                                break;
                            }
                            const custRole = await Role.findOne({where: {id: +roleId}, relations: ["user"]});
                            if (custRole == null) {
                                break;
                            }
                            if (custRole.user.userid != user.userid) {
                                break;
                            }
                            host.roles.push(new CustomRole(
                                custRole.name,
                                custRole.action as Action,
                                custRole.delay,
                                custRole.groupDec,
                                custRole.count,
                                custRole.spawnFrom,
                                custRole.placeHolder,
                                custRole.imageLink,
                                custRole.selfSelectable,
                                custRole.description
                            ));
                            break;
                        }
                    }
                }
                let winStr = "";
                let roleStr = "";
                for (let role of host.roles) {
                    roleStr += "\`\`" + role.GetRoleName(user.lang) + "\`\`\n";
                }
                for (let win of host.conditions) {
                    winStr += "\`\`" + win.GetName(user.lang) + "\`\`\n";
                }
                host.embed.setFields([
                    {
                        value: roleStr,
                        name: `__**${locale.game_created_roles}**__`
                    },
                    {
                        value: winStr,
                        name: `__**${locale.game_created_gameEndConditions}**__`
                    }]);
                curHostGames.set(gameid, host);
                await host.interaction.editReply({embeds: [host.embed]}).catch();
                await interaction.reply({content: locale.game_edit_success_message, ephemeral: true}).catch();
            } else {
                interaction.reply({content: locale.game_edit_error_noAccess, ephemeral: true}).catch(() => {
                });
            }
        } else {
            interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch(() => {
            });
        }
    } catch (err) {
        interaction.reply({content: locale.error_unknown, ephemeral: true}).catch();
    }
}