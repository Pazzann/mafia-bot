import {ButtonInteraction} from "discord.js";
import {Langs} from "../types/Langs";
import User from "../Entities/User.entity";
import dateParser from "../Functions/dateParser";

export default async function langSet(interaction: ButtonInteraction, dataUser: User){
    switch (interaction.customId) {
        case "en": {
            if (!dataUser) {
                await User.create({
                    userid: interaction.user.id,
                    lang: Langs.EN,
                    totalGames: 0,
                    totalWins: 0,
                    since: dateParser(new Date())
                }).save();
            } else {
                dataUser.lang = Langs.EN;
                await dataUser.save();
            }

            interaction.reply({content: "Successfully set english!", ephemeral: true}).catch(() => {
            });
            return;
        }
        case "ru": {
            if (!dataUser) {
                await User.create({
                    userid: interaction.user.id,
                    lang: Langs.RU,
                    totalGames: 0,
                    totalWins: 0,
                    since: dateParser(new Date())
                }).save();
            } else {
                dataUser.lang = Langs.RU;
                await dataUser.save();
            }

            interaction.reply({content: "Язык изменён на русский!", ephemeral: true}).catch(() => {
            });
            return;
        }
        case "ua": {
            if (!dataUser) {
                await User.create({
                    userid: interaction.user.id,
                    lang: Langs.UA,
                    totalGames: 0,
                    totalWins: 0,
                    since: dateParser(new Date())
                }).save();
            } else {
                dataUser.lang = Langs.UA;
                await dataUser.save();
            }

            interaction.reply({
                content: "Успішно встановлено українську!",
                ephemeral: true
            }).catch(() => {
            });
            return;
        }

    }
}