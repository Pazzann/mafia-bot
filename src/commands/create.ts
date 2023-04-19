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
import KillerWIn from "../Classes/WinningConditions/KillerWín";
import getDisabledButtons from "../Functions/getDisabledButtons";

module.exports.execute = function (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {
    for(let v of curHostGames.values()){
        if(v.users.includes(interaction.user.id))
            return interaction.reply({content: locale.create_error, ephemeral: true}).catch(()=>{});
    }
    for(let v of curHandlingGames.values()){
        if(v.HasPlayer(interaction.user.id))
            return interaction.reply({content: locale.create_error, ephemeral: true}).catch(()=>{});
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
        embed: new EmbedBuilder(),
        hostLocale: locale
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
        .setTitle(locale.game_created)
        .setDescription(`**${locale.game_created_autocancel}:** <t:${Math.floor(Date.now()/1000) + 600}:R>\n**${locale.game_created_gameOwner}:** <@${interaction.user.id}>\n\n__**${locale.game_created_playerList}:**__ \n<@${interaction.user.id}>`)
        .addFields([{
            value: roleStr,
            name: `__**${locale.game_created_roles}**__`
        }, {
            value: winStr,
            name: `__**${locale.game_created_gameEndConditions}**__`
        }])
        .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016009845289275533/unknown.png?width=566&height=566")
        .setColor("#ffec6e")

    let host = curHostGames.get(id);
    host.embed = embed;
    curHostGames.set(id, host);

    interaction.reply({embeds: [embed], components: getDisabledButtons(id, locale, false)}).catch(()=>{});
}