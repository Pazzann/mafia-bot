import {EmbedBuilder} from "discord.js";
import {IRolesProps} from "../types/interfaces/IRoles";
import IMafiaGameProps from "../types/interfaces/IGame";
import IUserProps from "../types/interfaces/IUser";
import {ILangProps} from "../types/interfaces/ILang";
import {Langs} from "../types/Langs";
import IThemeProps from "../types/interfaces/ITheme";

export default class MafiaEmbedBuilder {
    public static mafiaWin(mafia: IUserProps[]) {
        const mafiaNames: string[] = [];
        mafia.map(item=>mafiaNames.push(item.userTag))
        const embed = new EmbedBuilder()
            .setTitle("Мафия победила!")
            .setColor("#ff8484")
            .setDescription(`Игра закончилась победой мафии, то есть ${mafiaNames.join(", ")} победил!`)
            .setThumbnail("https://media.discordapp.net/attachments/1008571069797507102/1015711526553911456/Mafia_don_vs_Shrek_b61ff9c7-9ffc-4001-a4ab-8f7f49b3d98c.png?width=566&height=566")
        return embed;
    }

    public static killerWin(killer: string) {
        const embed = new EmbedBuilder()
            .setTitle("Маньяк победил!")
            .setColor("#ff8484")
            .setDescription(`Игра закончилась победой маньяка, то есть ${killer.split('#')[0]} победил!`)
            .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1017716202400911410/Boy_From_God_Killer_win_390235dc-e631-4da2-8eb5-d3d29d4b8147.png?width=566&height=566")
        return embed;
    }

    public static peacefulWin() {
        const embed = new EmbedBuilder()
            .setTitle("Мирные победили!")
            .setColor("#88ff84")
            .setDescription(`Игра закончилась победой мирных, все убийцы были выброщены голосованием или застрелились!`)
            .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016412374049243276/Boy_From_God_happy_shreks_team_mafia_4K_cinematic_f5a1d0da-49ed-4158-94b0-510ebcc89d1e.png?width=566&height=566");
        return embed;
    }

    public static wakeUp() {
        const embed = new EmbedBuilder()
            .setTitle("Город просыпается!")
            .setColor("#ffeb84")
            .setDescription(`Пора голосовать!`)
            .setThumbnail("https://media.discordapp.net/attachments/1008571116241047642/1017719727092674641/Boy_From_God_sunshine_afia_f4721756-c9e6-458d-91e3-59fdd9db50c8.png?width=566&height=566");
        return embed;
    }

    public static sleepTime(local: ILangProps) {
        const embed = new EmbedBuilder()
            .setTitle("Город засыпает!")
            .setColor("#8a1616")
            .setDescription(`Надеемся никто не умрёт!`)
            .setThumbnail("https://cdn.discordapp.com/attachments/1008571116241047642/1017720507816226878/Boy_From_God_sunset_mafia_1beea8f2-1460-4e7a-b503-b1745e76ff51.png");
        return embed;
    }

    public static kills(kills: string[]) {
        const embed = new EmbedBuilder()
            .setTitle("Произошли убийства!")
            .setColor("#8f2727")
            .setDescription(`Убили ${kills.join(", ")}!`)
            .setThumbnail("https://media.discordapp.net/attachments/1008571116241047642/1017760387191554069/Boy_From_God_killed_person_in_the_room_f2c4bd1a-6d87-4fcd-9fa8-3aec48ed626d.png?width=566&height=566");
        return embed;
    }

    public static nokills() {
        const embed = new EmbedBuilder()
            .setTitle("Никто не умер!")
            .setColor("#63ff4f")
            .setDescription(`Никого не убили за минувшую ночь, возможно стоит отблагодарить доктора?😯`)
            .setThumbnail("https://media.discordapp.net/attachments/1008571116241047642/1017760387191554069/Boy_From_God_killed_person_in_the_room_f2c4bd1a-6d87-4fcd-9fa8-3aec48ed626d.png?width=566&height=566");
        return embed;
    }

    public static roleGiver(role: IRolesProps, playerCount: number, theme: IThemeProps, mafiaCount: number, game: IMafiaGameProps, local: ILangProps, lang: Langs) {
        const embed = new EmbedBuilder()
            .setTitle(`${local.start_your_role}: ${local[role]}`)
            .setColor("#c468ff")
            .addFields([{
                name: local.start_game_info,
                value: `${local.start_theme}: \`\`${theme[lang.toUpperCase() as keyof IThemeProps]}\`\` \n ${local.start_player_count}: \`\`${playerCount}\`\` \n ${local.start_mafia_count}: \`\`${mafiaCount}\`\` \n ${local.start_doctor_count}: \`\`1\`\` \n ${local.start_police_count}: \`\`1\`\` \n ${local.start_killer_count}: \`\`${playerCount > 7 ? "1" : "0"}\`\``
            }])
        let mafias = "";
        game.users.filter(item => item.role == IRolesProps.MAFIA).map(item => mafias += item.userTag + " ")
        switch (role) {
            case IRolesProps.DOCTOR: {
                embed.setDescription(local.start_role_doctor);
                embed.setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469");
                return embed;
            }
            case IRolesProps.POLICE: {
                embed.setDescription(local.start_role_police);
                embed.setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1015960696850223134/unknown.png?width=469&height=469");
                return embed;
            }
            case IRolesProps.MAFIA: {
                embed.setDescription(`${local.start_role_mafia} ${mafias}`);
                embed.setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1015961438021488781/unknown.png?width=469&height=469");
                return embed;
            }
            case IRolesProps.INNOCENT: {
                embed.setDescription(local.start_role_innocent);
                embed.setThumbnail("https://cdn.discordapp.com/attachments/1015944207220879370/1015962010728538272/unknown.png");
                return embed;
            }
            case IRolesProps.KILLER: {
                embed.setDescription(local.start_role_killer);
                embed.setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016410832793522297/Boy_From_God_Shrek_peaky_blinders_b11654fb-93f3-4b4a-8389-fbf016d7cc2e.png?width=566&height=566");
                return embed;
            }
        }
    }
}