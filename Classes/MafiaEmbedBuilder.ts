import {EmbedBuilder} from "discord.js";
import {Roles} from "../types/roles";
import MafiaGame from "../types/game";

export default class MafiaEmbedBuilder {
    public static mafiaWin(mafia: string) {
        const embed = new EmbedBuilder()
            .setTitle("Мафия победила!")
            .setColor("#ff8484")
            .setDescription(`Игра закончилась победой мафии, то есть ${mafia.split('#')[0]} победил!`)
            .setThumbnail("https://media.discordapp.net/attachments/1008571069797507102/1015711526553911456/Mafia_don_vs_Shrek_b61ff9c7-9ffc-4001-a4ab-8f7f49b3d98c.png?width=566&height=566")
        return embed;
    }
    public static peacefulWin(){
        const embed = new EmbedBuilder()
            .setTitle("Мирные победили!")
            .setColor("#88ff84")
            .setDescription(`Игра закончилась победой мирных, все игроки мафии были выброщены голосованием!`)
            .setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1016412374049243276/Boy_From_God_happy_shreks_team_mafia_4K_cinematic_f5a1d0da-49ed-4158-94b0-510ebcc89d1e.png?width=566&height=566");
        return embed;
    }


    public static roleGiver(role: Roles, playerCount: number, theme: string, mafiaCount: number, game: MafiaGame) {
        const embed = new EmbedBuilder()
            .setTitle(`Ваша роль: ${role}`)
            .setColor("#c468ff")
            .addFields([{name: "Информация", value: `Тема: \`\`${theme}\`\` \n Кол-во игроков: \`\`${playerCount}\`\` \n Кол-во мафий: \`\`${mafiaCount}\`\` \n Доктор: \`\`1\`\` \n Полицейский: \`\`1\`\``}])
        let mafias = "";
        game.users.filter(item=>item.role==Roles.MAFIA).map(item=>mafias+= item.userTag + " ")
        switch (role) {
            case Roles.DOCTOR: {
                embed.setDescription("Ваша задача попытаться не дать никому умереть!");
                embed.setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1015959932228616242/unknown.png?width=469&height=469");
                return embed;
            }
            case Roles.POLICE: {
                embed.setDescription("Ваша задача вычислить мафию и убедить всех проголосовать за мафию!");
                embed.setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1015960696850223134/unknown.png?width=469&height=469");
                return embed;
            }
            case Roles.MAFIA: {
                embed.setDescription(`Ваша убить всех и самому остаться в живых! \n Ваши мафиозные друзья: ${mafias}`);
                embed.setThumbnail("https://media.discordapp.net/attachments/1015944207220879370/1015961438021488781/unknown.png?width=469&height=469");
                return embed;
            }
            case Roles.INNOCENT: {
                embed.setDescription("Ваша задача выжить!");
                embed.setThumbnail("https://cdn.discordapp.com/attachments/1015944207220879370/1015962010728538272/unknown.png");
                return embed;
            }
        }
    }
}