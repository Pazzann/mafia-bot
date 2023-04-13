import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    UserMention
} from "discord.js";
import {curHandlingGames, curHostGames, ILocalProps} from "../../index";
import cancelGame from "../../Functions/cancelGame";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import MafiaGame from "../../Classes/MafiaGame";

module.exports.execute = function (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {
    for(let v of curHostGames.values()){
        if(v.users.includes(interaction.user.id))
            return interaction.reply({content: locale.create_error, ephemeral: true}).catch(()=>{});
    }
    for(let v of curHandlingGames.values()){
        if(v.HasPlayer(interaction.user.id)){
            return interaction.reply({content: locale.create_error, ephemeral: true}).catch(()=>{});
        }
    }
    const id = MafiaGame.GenerateId();
    curHostGames.set(id, {
        author: interaction.user.id,
        users: [interaction.user.id],
        id: id,
        channel: interaction.channel.id,
        timeout: setTimeout(()=>{cancelGame(interaction, id, locale)}, 600000),
        interaction: interaction
    });
    const buttonRow2 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("🔥")
                .setLabel(`⠀${locale.create_button_cancel}⠀⠀`)
                .setStyle(ButtonStyle.Danger)
                .setCustomId("c" + String(id)),
            new ButtonBuilder()
                .setEmoji("🔪")
                .setLabel(`⠀${locale.create_button_leave}⠀`)
                .setStyle(ButtonStyle.Danger)
                .setCustomId("l" + String(id))
        );
    const buttonRow1 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("🌀")
                .setLabel(locale.create_button_join)
                .setStyle(ButtonStyle.Primary)
                .setCustomId("j" + String(id)),
            new ButtonBuilder()
                .setEmoji("✔️")
                .setLabel(locale.create_button_start)
                .setStyle(ButtonStyle.Success)
                .setCustomId("s" + String(id))
        )
    ;
    const buttonRow3 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("👀")
                .setLabel(`⠀⠀⠀⠀${locale.create_button_new}⠀⠀⠀⠀⠀`)
                .setStyle(ButtonStyle.Success)
                .setCustomId("createnew"),
        )
    ;
    const embed = new EmbedBuilder()
        .setTitle(locale.game_create)
        .setDescription(`**${locale.create_autocancel}:** <t:${Math.floor(Date.now()/1000) + 600}:R>\n**${locale.create_game_owner}:** <@${interaction.user.id}>\n\n__**${locale.create_player_list}:**__ \n<@${interaction.user.id}>`)
        .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016009845289275533/unknown.png?width=566&height=566")
        .setColor("#ffec6e")
    interaction.reply({embeds: [embed], components: [buttonRow1, buttonRow2, buttonRow3]}).catch(()=>{});
}