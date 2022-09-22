import {ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, ChatInputCommandInteraction} from "discord.js";
import {curHandlingGames, curHostGames} from "../bot";

module.exports.execute = function (interaction: ButtonInteraction, gameid = 0) {
    // if (!gameid)
    //     gameid = interaction.options.getNumber('gameid');

    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.author == interaction.user.id){
            const buttonRow2 = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji("🔥")
                        .setLabel('⠀Отменить⠀⠀')
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("c")
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setEmoji("🔪")
                        .setLabel('⠀Выйти⠀')
                        .setStyle(ButtonStyle.Danger)
                        .setCustomId("l")
                        .setDisabled(true)
                );
            const buttonRow1 = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji("🌀")
                        .setLabel('Присоединиться')
                        .setStyle(ButtonStyle.Primary)
                        .setCustomId("j")
                        .setDisabled(true),
                    new ButtonBuilder()
                        .setEmoji("✔️")
                        .setLabel('Начать')
                        .setStyle(ButtonStyle.Success)
                        .setCustomId("s")
                        .setDisabled(true)
                )
            ;
            const buttonRow3 = new ActionRowBuilder<ButtonBuilder>()
                .addComponents(
                    new ButtonBuilder()
                        .setEmoji("👀")
                        .setLabel('⠀⠀⠀⠀Cоздать новую игру⠀⠀⠀⠀⠀')
                        .setStyle(ButtonStyle.Success)
                        .setCustomId("createnew"),
                )
            ;
            interaction.message.edit({content: "canceled", components: [buttonRow1,buttonRow2,buttonRow3]})
            curHostGames.delete(gameid);
            interaction.reply(`Игра \`\`${gameid}\`\` была убрана!`);
        }else{
            interaction.reply({content: "Вы не владелец игры!", ephemeral: true});
        }
    }else{
        interaction.reply({content: "Неправильный ID игры!", ephemeral: true});
    }
}