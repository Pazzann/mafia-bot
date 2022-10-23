import IUserProps from "../../types/interfaces/IUser";
import {ActionRowBuilder, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import {IRolesProps} from "../../types/interfaces/IRoles";

export default function getPoliceRow(users: IUserProps[], unactive = false){
    const filterUsers = users.filter(item=> item.isKilled === false).filter(item=>item.role!==IRolesProps.POLICE);
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
