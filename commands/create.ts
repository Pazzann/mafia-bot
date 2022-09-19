import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import {curHostGames} from "../bot";

module.exports.execute = function (interaction: ChatInputCommandInteraction) {
    const id = Math.round(Math.random() * 10000);
    curHostGames.set(id, {
        author: interaction.user.id,
        users: [interaction.user.id],
        id: id
    });
    const buttonRow2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("🔥")
                .setLabel('⠀Отменить⠀⠀')
                .setStyle(ButtonStyle.Danger)
                .setCustomId("c" + String(id)),
            new ButtonBuilder()
                .setEmoji("🔪")
                .setLabel('⠀Выйти⠀')
                .setStyle(ButtonStyle.Danger)
                .setCustomId("l" + String(id))
        );
    const buttonRow1 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("🌀")
                .setLabel('Присоединиться')
                .setStyle(ButtonStyle.Primary)
                .setCustomId("j" + String(id)),
            new ButtonBuilder()
                .setEmoji("✔️")
                .setLabel('Начать')
                .setStyle(ButtonStyle.Success)
                .setCustomId("s" + String(id))
        )
    ;
    const embed = new EmbedBuilder()
        .setTitle("Успешно создано")
        .setDescription(`ID игры: \`\`${id}\`\` \n Подключиться \`\`/join ${id}\`\``)
        .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016009845289275533/unknown.png?width=566&height=566")
        .setColor("#ffec6e")
    interaction.reply({embeds: [embed], components: [buttonRow1, buttonRow2]});
}