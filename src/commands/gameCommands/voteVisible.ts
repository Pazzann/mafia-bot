import {ButtonInteraction} from "discord.js";
import {curHostGames} from "../../index";
import getEditRow from "../../Functions/getEditRow";
import usersRedraw from "../../Functions/usersRedraw";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default function voteVisible(interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (curHostGames.has(gameid)) {
        const host = curHostGames.get(gameid);
        if (host.author == interaction.user.id) {
            host.voteVisible = !host.voteVisible;
            const newEmbed = usersRedraw(host.users, host.embed, host);
            host.embed = newEmbed;
            curHostGames.set(gameid, host);
            host.interaction.editReply({embeds: [host.embed]}).catch();
            interaction.reply({content: "Switched to: " + !host.voteVisible, components: getEditRow(host, user, locale, gameid), ephemeral: true}).catch()
        } else {
            interaction.reply({content: locale.game_cancel_error_noAccess, ephemeral: true}).catch();
        }
    } else {
        interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch();
    }
}