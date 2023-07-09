import {ButtonInteraction} from "discord.js";
import {curHostGames} from "../../index";
import setGameEmbedDescription from "../../Functions/setGameEmbedDescription";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default function leave(interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (!curHostGames.has(gameid))
        return interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch();

    const host = curHostGames.get(gameid);
    if (!host.users.includes(interaction.user.id))
        return interaction.reply({content: locale.game_leave_error_alreadyLeft, ephemeral: true}).catch();

    host.timeout.refresh();
    host.users.splice(host.users.indexOf(interaction.user.id), 1);
    setGameEmbedDescription(host);
    curHostGames.set(gameid, host);
    interaction.message.edit({embeds: [host.embed]}).catch();
    return interaction.reply({content: locale.game_leave_success_message, ephemeral: true}).catch();
}