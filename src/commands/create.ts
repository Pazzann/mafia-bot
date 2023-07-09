import {
    ButtonInteraction,
    ChatInputCommandInteraction,
    EmbedBuilder
} from "discord.js";
import {curHandlingGames, curHostGames} from "../index";
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
import PeacefulWin from "../Classes/WinningConditions/PeacefulWin";
import KillerWIn from "../Classes/WinningConditions/KillerWín";
import getDisabledButtons from "../Functions/getDisabledButtons";
import setGameEmbedDescription from "../Functions/setGameEmbedDescription";

export default function create(interaction: ChatInputCommandInteraction | ButtonInteraction, user: User, locale: ILangProps) {
    for (let v of curHostGames.values()) {
        if (v.users.includes(interaction.user.id))
            return interaction.reply({content: (v.author == interaction.user.id ? locale.game_error_alreadyCreated : locale.game_error_alreadyJoined), ephemeral: true}).catch();
    }
    for (let v of curHandlingGames.values()) {
        if (v.HasPlayer(interaction.user.id))
            return interaction.reply({content: (v.author == interaction.user.id ? locale.game_error_alreadyCreated : locale.game_error_alreadyJoined), ephemeral: true}).catch();
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
        conditions: [new MafiaWin(), new PeacefulWin(), new KillerWIn()],
        embed: new EmbedBuilder(),
        hostLocale: locale,
        voteVisible: true
    });

    let roleStr = curHostGames.get(id).roles.reduce((previous, item)=> previous + "\`\`" + item.GetRoleName(user.lang) + "\`\`\n", "");
    let condStr = curHostGames.get(id).conditions.reduce((previous, item)=> previous + "\`\`" + item.GetName(user.lang) + "\`\`\n", "");

    let host = curHostGames.get(id);
    host.embed = new EmbedBuilder()
        .setTitle(locale.game_created_title)
        .addFields([{
            name: `__**${locale.game_created_roles}**__`,
            value: roleStr
        }, {
            name: `__**${locale.game_created_gameEndConditions}**__`,
            value: condStr
        }])
        .setColor("#ffec6e")
        .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016009845289275533/unknown.png?width=566&height=566");
    setGameEmbedDescription(host);
    curHostGames.set(id, host);

    return interaction.reply({embeds: [host.embed], components: getDisabledButtons(id, locale, false)}).catch();
}