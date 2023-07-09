import {ButtonInteraction} from "discord.js";
import {curHostGames} from "../../index";
import getEditRow from "../../Functions/getEditRow";
import setGameEmbedDescription from "../../Functions/setGameEmbedDescription";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default function voteVisible(interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (!curHostGames.has(gameid))
        return interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch();

    const host = curHostGames.get(gameid);
    if (host.author != interaction.user.id)
        return interaction.reply({content: locale.game_cancel_error_noAccess, ephemeral: true}).catch();

    host.voteVisible = !host.voteVisible;
    setGameEmbedDescription(host);
    curHostGames.set(gameid, host);
    host.interaction.editReply({embeds: [host.embed]}).catch();
    return interaction.reply({content: locale.game_edit_success_message, components: getEditRow(host, user, locale, gameid), ephemeral: true}).catch();
}