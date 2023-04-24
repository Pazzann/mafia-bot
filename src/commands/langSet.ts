import {ButtonInteraction} from "discord.js";
import {Langs} from "../types/Langs";
import User from "../Entities/User.entity";
import dateParser from "../Functions/dateParser";
import {localisations} from "../index";
import {ILangProps} from "../types/interfaces/ILang";

export default async function langSet(interaction: ButtonInteraction, dataUser: User) {
    if (["en", "de", "ru", "ua", "pl", "fu", "sp", "ee", "se"].includes(interaction.customId)) {
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
            // @ts-ignore
            content: localisations[interaction.customId.toUpperCase() as keyof ILangProps].lang_has_been_set,
            ephemeral: true
        }).catch(() => {
        });
        return;
    }
}