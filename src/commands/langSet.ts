import {ButtonInteraction} from "discord.js";
import {LangArray, Langs} from "../types/Langs";
import User from "../Entities/User.entity";
import dateParser from "../Functions/dateParser";
import {ILocalProps, localisations} from "../index";

export default async function langSet(interaction: ButtonInteraction, dataUser: User) {
    if (!LangArray.includes(interaction.customId)) return;

    if (!dataUser) {
        await User.create({
            userid: interaction.user.id,
            lang: interaction.customId as Langs,
            totalGames: 0,
            totalWins: 0,
            since: dateParser(new Date())
        }).save();
    } else {
        dataUser.lang = interaction.customId as Langs;
        await dataUser.save();
    }

    interaction.reply({
        content: localisations[interaction.customId.toUpperCase() as keyof ILocalProps].lang_set_success_message,
        ephemeral: true
    }).catch();
}