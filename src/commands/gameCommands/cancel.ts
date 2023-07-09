import {ButtonInteraction} from "discord.js";
import {curHostGames} from "../../index";
import getDisabledButtons from "../../Functions/getDisabledButtons";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import setGameEmbedDescription from "../../Functions/setGameEmbedDescription";

export default function cancel(interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (!curHostGames.has(gameid))
        return interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch();

    const host = curHostGames.get(gameid);
    if (host.author != interaction.user.id)
        return interaction.reply({content: locale.game_cancel_error_noAccess, ephemeral: true}).catch();

    clearTimeout(host.timeout);
    setGameEmbedDescription(host, true);
    interaction.message.edit({
        content: `**${locale.game_cancel_success_message_aboveEmbed}**`,
        embeds: [host.embed],
        components: getDisabledButtons(gameid, locale)
    }).catch();
    curHostGames.delete(gameid);
    return interaction.reply(locale.game_cancel_success_message).catch();
}