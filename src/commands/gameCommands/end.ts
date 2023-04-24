import {ButtonInteraction, ChatInputCommandInteraction} from "discord.js";
import {curHandlingGames, curHostGames, discordBot} from "../../index";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default function end (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (curHandlingGames.has(gameid)) {
        const game = curHandlingGames.get(gameid);
        if (game.author == interaction.user.id) {
            game.Players.map(async item => {
                    const dm = item.dsUser?.dmChannel ?? await item.dsUser.createDM();
                    dm.send(item.local.game_end_success_privateMessage);
            });
            curHandlingGames.delete(gameid);
            interaction.reply(locale.game_end_success_message).catch(()=>{});
        } else {
            interaction.reply({content: locale.game_end_error_noAccess, ephemeral: true}).catch(()=>{});
        }
    } else {
        interaction.reply({content:locale.game_error_incorrectGameID, ephemeral: true}).catch(()=>{});
    }
}