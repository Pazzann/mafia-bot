import {ButtonInteraction, ChatInputCommandInteraction} from "discord.js";
import {curHandlingGames, curHostGames, discordBot} from "../index";
import User from "../Entities/User";
import {ILangProps} from "../types/interfaces/ILang";

module.exports.execute = function (interaction: ButtonInteraction, gameid = 0, user: User, locale: ILangProps) {
    if (curHandlingGames.has(gameid)) {
        const game = curHandlingGames.get(gameid);
        if (game.author == interaction.user.id) {
            game.Players.map(async item => {
                    const dm = item.dsUser?.dmChannel ?? await item.dsUser.createDM();
                    dm.send(item.local.game_was_ended);
            });
            curHandlingGames.delete(gameid);
            interaction.reply(locale.game_deleted).catch(()=>{});
        } else {
            interaction.reply({content: locale.error_you_are_not_the_owner, ephemeral: true}).catch(()=>{});
        }
    } else {
        interaction.reply({content:locale.error_incorrect_game_id, ephemeral: true}).catch(()=>{});
    }
}