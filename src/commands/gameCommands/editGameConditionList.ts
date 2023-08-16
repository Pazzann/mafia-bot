import {SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import {curHostGames} from "../../index";
import PeacefulWin from "../../Classes/WinningConditions/PeacefulWin";
import KillerWIn from "../../Classes/WinningConditions/KillerWín";
import MafiaWin from "../../Classes/WinningConditions/MafiaWin";
import WinningCondition from "../../Entities/WinningCondition.entity";
import CustomWin from "../../Classes/WinningConditions/CustomWin";

export default async function editGameConditionList(interaction: SelectMenuInteraction, user: User, locale: ILangProps) {
    try {
        let gameid = +interaction.values[0].split('%')[0];
        if (!curHostGames.has(gameid))
            return interaction.reply({content: locale.game_error_incorrectGameID, ephemeral: true}).catch();

        const host = curHostGames.get(gameid);
        if (host.author != interaction.user.id)
            return interaction.reply({content: locale.game_start_error_noAccess, ephemeral: true}).catch();

        // if (!user.premium)
        //     return interaction.reply("You don't have premium to change game preset");

        host.conditions = [];
        for (let condition of interaction.values) {
            let conditionId = condition.split('%')[1];
            switch (conditionId) {
                case new PeacefulWin().name: {
                    host.conditions.push(new PeacefulWin());
                    break;
                }
                case new MafiaWin().name: {
                    host.conditions.push(new MafiaWin());
                    break;
                }
                case new KillerWIn().name: {
                    host.conditions.push(new KillerWIn());
                    break;
                }
                default: {
                    if (!user.premium)
                        return interaction.reply({content: locale.error_premium, ephemeral: true}).catch();
                    const customCond = await WinningCondition.findOne({where: {id: +conditionId}, relations: ["user"]});
                    if (customCond == null)
                        return interaction.reply({content: locale.game_edit_conditions_error_notFound, ephemeral: true}).catch();
                    if (customCond.user.userid != user.userid)
                        break;
                    host.conditions.push(new CustomWin(
                        customCond.name,
                        customCond.condition,
                        customCond.embedTitle,
                        customCond.embedDescription,
                        customCond.embedThumbnail,
                        customCond.winRole
                    ));
                    break;
                }
            }
        }

        let condStr = host.conditions.reduce((previous, item)=> previous + "\`\`" + item.getName(user.lang) + "\`\`\n", "");
        host.embed.spliceFields(1, 1,
            {
                value: condStr,
                name: `__**${locale.game_created_gameEndConditions}**__`
            });
        curHostGames.set(gameid, host);
        host.interaction.editReply({embeds: [host.embed]}).catch();
        return interaction.reply({content: locale.game_edit_success_message, ephemeral: true}).catch();
    } catch (err) {
        return interaction.reply({content: locale.error_unknown, ephemeral: true}).catch();
    }
}