import User from "../../types/user";
import {ActionRowBuilder, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import {Roles} from "../../types/roles";

export default function getPoliceRow(users: User[], unactive = false){
    const filterUsers = users.filter(item=> item.isKilled === false).filter(item=>item.role!==Roles.POLICE);
    const Emojis: string[] = ['🚓', '👮', '🚔', '🚨'];
    const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
    for (let user of filterUsers){
        const chooser = new SelectMenuOptionBuilder()
            .setLabel(user.userTag)
            .setEmoji(Emojis[Math.floor(Math.random() * Emojis.length)])
            .setValue(user.userid);
        chooseArr.push(chooser)
    }
    const row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId("police_select")
                .setPlaceholder('Выберите кого хотите проверить...')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(chooseArr)
                .setDisabled(unactive),
        );
    return row;
}
