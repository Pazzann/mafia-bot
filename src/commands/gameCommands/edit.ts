import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonInteraction,
    ButtonStyle,
    RestOrArray,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder
} from "discord.js";
import {curHostGames} from "../../index";
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
import getEditRow from "../../Functions/getEditRow";

export default async function edit(interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (curHostGames.has(gameid)) {
        const host = curHostGames.get(gameid);
        if (host.author == interaction.user.id) {
            // if (!user.premium) {
            //     interaction.reply("You don't have premium to change game preset");
            //     return;
            // }


            interaction.reply({ephemeral: true, components: getEditRow(host, user, locale, gameid)})
        } else {
            interaction.reply({content: locale.game_edit_error_noAccess, ephemeral: true}).catch(() => {
            });
        }
    } else {
        interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch(() => {
        });
    }
}