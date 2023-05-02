import {
    ActionRowBuilder,
    BaseInteraction,
    ButtonInteraction,
    ChatInputCommandInteraction,
    EmbedBuilder,
    RestOrArray, StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
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
            const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];

            chooseArr.push(
                new StringSelectMenuOptionBuilder()
                    .setLabel(new MistressRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new MistressRole().RoleName)),
                new StringSelectMenuOptionBuilder()
                    .setLabel(new MafiaRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new MafiaRole().RoleName)),
                new StringSelectMenuOptionBuilder()
                    .setLabel(new PeacefulRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new PeacefulRole().RoleName)),
                new StringSelectMenuOptionBuilder()
                    .setLabel(new KillerRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new KillerRole().RoleName)),
                new StringSelectMenuOptionBuilder()
                    .setLabel(new PoliceRole().RoleName)
                    .setValue(String(host.id) + "%" + String(new PoliceRole().RoleName)),
                new StringSelectMenuOptionBuilder()
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
                    const roleOption = new StringSelectMenuOptionBuilder()
                        .setLabel(role.name)
                        .setValue(String(host.id) + "%" + String(role.id));
                    if (host.roles.filter(item => item.RoleName === role.name).length > 0)
                        roleOption.setDefault(true);
                    chooseArr.push(roleOption)
                }
            }

            const row = new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("editrolegamelist")
                        .setPlaceholder(locale.game_edit_roles_placeHolder)
                        .setMinValues(1)
                        .setMaxValues(chooseArr.length)
                        .addOptions(chooseArr)
                );

            const chooseArr2: RestOrArray<StringSelectMenuOptionBuilder> = [];


            chooseArr2.push(
                new StringSelectMenuOptionBuilder()
                    .setLabel(new KillerWIn().Name)
                    .setValue(String(host.id) + "%" + String(new KillerWIn().Name)),
                new StringSelectMenuOptionBuilder()
                    .setLabel(new MafiaWin().Name)
                    .setValue(String(host.id) + "%" + String(new MafiaWin().Name)),
                new StringSelectMenuOptionBuilder()
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
                    const conditionOption = new StringSelectMenuOptionBuilder()
                        .setLabel(condition.name)
                        .setValue(String(host.id) + "%" + String(condition.id));
                    if (host.conditions.filter(item => item.Name === condition.name).length > 0)
                        conditionOption.setDefault(true);
                    chooseArr2.push(conditionOption)
                }
            }
            const row2 = new ActionRowBuilder<StringSelectMenuBuilder>()
                .addComponents(
                    new StringSelectMenuBuilder()
                        .setCustomId("editcondtiongamelist")
                        .setPlaceholder(locale.game_edit_conditions_placeHolder)
                        .setMinValues(1)
                        .setMaxValues(chooseArr2.length)
                        .addOptions(chooseArr2)
                );

            interaction.reply({ephemeral: true, components: [row, row2]})
        } else {
            interaction.reply({content: locale.game_edit_error_noAccess, ephemeral: true}).catch(() => {
            });
        }
    } else {
        interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch(() => {
        });
    }
}