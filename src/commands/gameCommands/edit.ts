import {
    ActionRowBuilder,
    BaseInteraction,
    ButtonInteraction,
    ChatInputCommandInteraction,
    EmbedBuilder,
    RestOrArray, SelectMenuBuilder,
    SelectMenuOptionBuilder
} from "discord.js";
import {curHandlingGames, curHostGames} from "../../index";
import usersRedraw from "../../Functions/usersRedraw";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import MistressRole from "../../Classes/Roles/MisstressRole";
import MafiaRole from "../../Classes/Roles/MafiaRole";
import PeacefulRole from "../../Classes/Roles/PeacefulRole";
import KillerRole from "../../Classes/Roles/KillerRole";
import PoliceRole from "../../Classes/Roles/PoliceRole";
import DoctorRole from "../../Classes/Roles/DoctorRole";
import KillerWIn from "../../Classes/WinningConditions/KillerWín";
import MafiaWin from "../../Classes/WinningConditions/MafiaWin";
import PeacecfulWin from "../../Classes/WinningConditions/PeacecfulWin";

export default async function edit(interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (curHostGames.has(gameid)) {
        const host = curHostGames.get(gameid);
        if (host.author == interaction.user.id) {
            // if (!user.premium) {
            //     interaction.reply("You don't have premium to change game preset");
            //     return;
            // }
            const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];

            chooseArr.push(
                new SelectMenuOptionBuilder()
                    .setLabel(new MistressRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new MistressRole().RoleName)),
                new SelectMenuOptionBuilder()
                    .setLabel(new MafiaRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new MafiaRole().RoleName)),
                new SelectMenuOptionBuilder()
                    .setLabel(new PeacefulRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new PeacefulRole().RoleName)),
                new SelectMenuOptionBuilder()
                    .setLabel(new KillerRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new KillerRole().RoleName)),
                new SelectMenuOptionBuilder()
                    .setLabel(new PoliceRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new PoliceRole().RoleName)),
                new SelectMenuOptionBuilder()
                    .setLabel(new DoctorRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new DoctorRole().RoleName)),
            )
            if (host.roles.filter(item => item.RoleName === new MistressRole().RoleName).length > 0) {
                chooseArr[0].setDefault(true);
            }
            if (host.roles.filter(item => item.RoleName === new MafiaRole().RoleName).length > 0) {
                chooseArr[1].setDefault(true);
            }
            if (host.roles.filter(item => item.RoleName === new PeacefulRole().RoleName).length > 0) {
                chooseArr[2].setDefault(true);
            }
            if (host.roles.filter(item => item.RoleName === new KillerRole().RoleName).length > 0) {
                chooseArr[3].setDefault(true);
            }
            if (host.roles.filter(item => item.RoleName === new PoliceRole().RoleName).length > 0) {
                chooseArr[4].setDefault(true);
            }
            if (host.roles.filter(item => item.RoleName === new DoctorRole().RoleName).length > 0) {
                chooseArr[5].setDefault(true);
            }
            if (user.premium) {
                for (let role of user.customRoles) {
                    const roleOption = new SelectMenuOptionBuilder()
                        .setLabel(role.name)
                        .setValue(String(host.id) + "%" + String(role.id));
                    if (host.roles.filter(item => item.RoleName === role.name).length > 0)
                        roleOption.setDefault(true);
                    chooseArr.push(roleOption)
                }
            }

            const row = new ActionRowBuilder<SelectMenuBuilder>()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId("editrolegamelist")
                        .setPlaceholder('choose role to view')
                        .setMinValues(1)
                        .setMaxValues(chooseArr.length)
                        .addOptions(chooseArr)
                );

            const chooseArr2: RestOrArray<SelectMenuOptionBuilder> = [];


            chooseArr2.push(
                new SelectMenuOptionBuilder()
                    .setLabel(new KillerWIn().Name)
                    .setValue(String(host.id) + "%" + String(new KillerWIn().Name)),
                new SelectMenuOptionBuilder()
                    .setLabel(new MafiaWin().Name)
                    .setValue(String(host.id) + "%" + String(new MafiaWin().Name)),
                new SelectMenuOptionBuilder()
                    .setLabel(new PeacecfulWin().Name)
                    .setValue(String(host.id) + "%" + String(new PeacecfulWin().Name)),
            )
            if (host.conditions.filter(item => item.Name === new KillerWIn().Name).length > 0) {
                chooseArr2[0].setDefault(true);
            }
            if (host.conditions.filter(item => item.Name === new MafiaWin().Name).length > 0) {
                chooseArr2[1].setDefault(true);
            }
            if (host.conditions.filter(item => item.Name === new PeacecfulWin().Name).length > 0) {
                chooseArr2[2].setDefault(true);
            }
            if (user.premium) {
                for (let condition of user.conditions) {
                    const conditionOption = new SelectMenuOptionBuilder()
                        .setLabel(condition.name)
                        .setValue(String(host.id) + "%" + String(condition.id));
                    if (host.conditions.filter(item => item.Name === condition.name).length > 0)
                        conditionOption.setDefault(true);
                    chooseArr2.push(conditionOption)
                }
            }
            const row2 = new ActionRowBuilder<SelectMenuBuilder>()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId("editcondtiongamelist")
                        .setPlaceholder('choose conditions')
                        .setMinValues(1)
                        .setMaxValues(chooseArr2.length)
                        .addOptions(chooseArr2)
                );

            interaction.reply({ephemeral: true, components: [row, row2]})
        } else {
            interaction.reply({content: locale.game_start_error_noAccess, ephemeral: true}).catch(() => {
            });
        }
    } else {
        interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch(() => {
        });
    }
}