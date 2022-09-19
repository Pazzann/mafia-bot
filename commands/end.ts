import {ChatInputCommandInteraction} from "discord.js";
import {curHandlingGames, curHostGames, discordBot} from "../bot";

module.exports.execute = function (interaction: ChatInputCommandInteraction, gameid = 0) {
    if (!gameid)
        gameid = interaction.options.getNumber('gameid');
    if (curHandlingGames.has(gameid)) {
        const host = curHandlingGames.get(gameid);
        if (host.author == interaction.user.id) {
            host.users.map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send(`Игра преждевременно была завершена организатором`);
                });
            });
            curHandlingGames.delete(gameid);
            interaction.reply('Игра удалена!');
        } else {
            interaction.reply("Вы не владелец игры!");
        }
    } else {
        interaction.reply("Неправильный ID игры!");
    }
}