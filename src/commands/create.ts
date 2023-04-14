import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    UserMention
} from "discord.js";
import {curHandlingGames, curHostGames, ILocalProps} from "../index";
import cancelGame from "../Functions/cancelGame";
import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";
import MafiaGame from "../Classes/MafiaGame";
import MafiaRole from "../Classes/Roles/MafiaRole";
import PoliceRole from "../Classes/Roles/PoliceRole";
import DoctorRole from "../Classes/Roles/DoctorRole";
import KillerRole from "../Classes/Roles/KillerRole";
import MistressRole from "../Classes/Roles/MisstressRole";
import PeacefulRole from "../Classes/Roles/PeacefulRole";
import MafiaWin from "../Classes/WinningConditions/MafiaWin";
import PeacecfulWin from "../Classes/WinningConditions/PeacecfulWin";
import KillerWIn from "../Classes/WinningConditions/KillerWIn";

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
        interaction: interaction,
        roles: [new MafiaRole(), new PoliceRole(), new DoctorRole(), new KillerRole(), new MistressRole(), new PeacefulRole()],
        conditions: [new MafiaWin(), new PeacecfulWin(), new KillerWIn()],
        embed: new EmbedBuilder()
    });
    let winStr = "";
    let roleStr = "";
    for (let role of curHostGames.get(id).roles){
        roleStr += "\`\`" + role.RoleName + "\`\`\n";
    }
    for(let win of curHostGames.get(id).conditions){
        winStr += "\`\`" + win.Name + "\`\`\n";
    }
    const embed = new EmbedBuilder()
        .setTitle(locale.game_create)
        .setDescription(`**${locale.create_autocancel}:** <t:${Math.floor(Date.now()/1000) + 600}:R>\n**${locale.create_game_owner}:** <@${interaction.user.id}>\n\n__**${locale.create_player_list}:**__ \n<@${interaction.user.id}>`)
        .addFields([{
            value: roleStr,
            name: "Roles"
        }, {
            value: winStr,
            name: "Winning Conditions"
        }])
        .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016009845289275533/unknown.png?width=566&height=566")
        .setColor("#ffec6e")
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
                .setEmoji("✏️")
                .setLabel(`⠀⠀⠀⠀Edit⠀⠀⠀⠀⠀`)
                .setStyle(ButtonStyle.Success)
                .setCustomId("r" + String(id)),
        )
    ;
    const buttonRow4 = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("👀")
                .setLabel(`⠀⠀⠀⠀${locale.create_button_new}⠀⠀⠀⠀⠀`)
                .setStyle(ButtonStyle.Success)
                .setCustomId("createnew"),
        )
    ;
    let host = curHostGames.get(id);
    host.embed = embed;
    curHostGames.set(id, host);

    interaction.reply({embeds: [embed], components: [buttonRow1, buttonRow2, buttonRow3, buttonRow4]}).catch(()=>{});
}