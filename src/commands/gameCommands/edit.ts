import {ButtonInteraction} from "discord.js";
import {curHostGames} from "../../index";
import getEditRow from "../../Functions/getEditRow";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default function edit(interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (!curHostGames.has(gameid))
        return interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch();

    const host = curHostGames.get(gameid);
    if (host.author != interaction.user.id)
        return interaction.reply({content: locale.game_edit_error_noAccess, ephemeral: true}).catch();

    // if (!user.premium)
    //     return interaction.reply("You don't have premium to change game preset");

    return interaction.reply({components: getEditRow(host, user, locale, gameid), ephemeral: true}).catch();
}