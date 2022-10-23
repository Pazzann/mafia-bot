import IUserProps from "../../types/interfaces/IUser";
import {ActionRowBuilder, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";

export default function getDoctorRow(users: IUserProps[], unactive = false){
    const filterUsers = users.filter(item=> item.isKilled === false);
    const Emojis: string[] = ['💉', '💊', '🧬', '🦠', '🧫', '🧪', '♥️'];
    const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
    for (let user of filterUsers){
        const chooser = new SelectMenuOptionBuilder()
            .setLabel(user.userTag)
            .setEmoji(Emojis[Math.floor(Math.random() * Emojis.length)])
            .setValue(user.userid);
        chooseArr.push(chooser);
    }
    const row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId("doctor_select")
                .setPlaceholder('Выберите кого хотите вылечить...')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions(chooseArr)
                .setDisabled(unactive),
        );
    return row;
}
