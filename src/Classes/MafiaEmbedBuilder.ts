import {Base, EmbedBuilder} from "discord.js";
import {IRolesProps} from "../types/interfaces/IRoles";
import IMafiaGameProps from "../types/interfaces/IGame";
import IUserProps from "../types/interfaces/IUser";
import {ILangProps} from "../types/interfaces/ILang";
import {Langs} from "../types/Langs";
import IThemeProps from "../types/interfaces/ITheme";
import BaseRole from "./Roles/BaseRole";
import ScriptEngine from "./ScriptEngine";
import MafiaUser from "./MafiaUser";
import Role from "../Entities/Role.entity";

export default class MafiaEmbedBuilder {

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

    public static roleGiver(owner: MafiaUser, players: MafiaUser[], theme: IThemeProps, local: ILangProps, lang: Langs, roles: BaseRole[]) {
        let rolesValue = "";
        for (let role of roles) {
            rolesValue += `${role.RoleName}: \`\`${players.filter(item => item.role.RoleName == role.RoleName).length}\`\` \n `
        }
        const embed = new EmbedBuilder()
            .setTitle(`${local.start_your_role}: ${owner.role.NameLocals?owner.role.NameLocals[lang.toUpperCase() as keyof {EN: string, UA: string, RU: string}] : owner.role.RoleName}`)
            .setColor("#c468ff")
            .addFields([{
                name: local.start_game_info,
                value: `${local.start_theme}: \`\`${theme[lang.toUpperCase() as keyof IThemeProps]}\`\` \n ${local.start_player_count}: \`\`${players.length}\`\` \n  ${rolesValue}`
            }])
        embed.setDescription(ScriptEngine.DescriptionEngine(owner.role.Description, players, owner));
        embed.setThumbnail(owner.role.ImageLink);
        return embed;
    }
    public static roleEmbed(role: Role, land: ILangProps){
        const embed = new EmbedBuilder()
            .setTitle(role.name)
            .setDescription(role.description)
            .addFields(
                {
                    name: "Action",
                    value: role.action,
                },
                {
                    name: "Group Decision",
                    value: role.groupDec.toString(),
                },
                {
                    name: "Spawn From",
                    value: role.spawnFrom.toString(),
                },
                {
                    name: "Self Selectable",
                    value: role.selfSelectable.toString(),
                },
                {
                    name: "Count",
                    value: role.count,
                },
                {
                    name: "PlaceHolder",
                    value: role.placeHolder,
                },
                {
                    name: "Delay",
                    value: role.delay.toString(),
                },)
            .setColor("#ffb0b0")
            .setThumbnail(role.imageLink);
        return embed;
    }
}