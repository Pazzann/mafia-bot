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
import WinningCondition from "../Entities/WinningCondition.entity";

export default class MafiaEmbedBuilder {

    public static wakeUp(local: ILangProps) {
        const embed = new EmbedBuilder()
            .setTitle(local.wake_up_title)
            .setColor("#ffeb84")
            .setDescription(local.wake_up_description)
            .setThumbnail("https://media.discordapp.net/attachments/1008571116241047642/1017719727092674641/Boy_From_God_sunshine_afia_f4721756-c9e6-458d-91e3-59fdd9db50c8.png?width=566&height=566");
        return embed;
    }

    public static sleepTime(local: ILangProps) {
        const embed = new EmbedBuilder()
            .setTitle(local.sleep_time_title)
            .setColor("#8a1616")
            .setDescription(local.sleep_time_description)
            .setThumbnail("https://cdn.discordapp.com/attachments/1008571116241047642/1017720507816226878/Boy_From_God_sunset_mafia_1beea8f2-1460-4e7a-b503-b1745e76ff51.png");
        return embed;
    }

    public static kills(kills: string[], local: ILangProps) {
        const embed = new EmbedBuilder()
            .setTitle(local.kills_title)
            .setColor("#8f2727")
            .setDescription(kills.length > 1 ? `${kills.join(", ")} ${local.kills_description_many}` : `${kills.join(", ")} ${local.kills_description_one}`)
            .setThumbnail("https://media.discordapp.net/attachments/1008571116241047642/1017760387191554069/Boy_From_God_killed_person_in_the_room_f2c4bd1a-6d87-4fcd-9fa8-3aec48ed626d.png?width=566&height=566");
        return embed;
    }

    public static nokills(local: ILangProps) {
        const embed = new EmbedBuilder()
            .setTitle(local.no_kills_title)
            .setColor("#63ff4f")
            .setDescription(local.no_kills_description)
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
    public static roleEmbed(role: Role, local: ILangProps){
        const embed = new EmbedBuilder()
            .setTitle(role.name)
            .setDescription(role.description)
            .addFields(
                {
                    name: local.role_embed_action_name,
                    value: role.action,
                },
                {
                    name: local.role_embed_groupDec_name,
                    value: role.groupDec.toString(),
                },
                {
                    name: local.role_embed_spawnFrom_name,
                    value: role.spawnFrom.toString(),
                },
                {
                    name: local.role_embed_selfSelectable_name,
                    value: role.selfSelectable.toString(),
                },
                {
                    name: local.role_embed_count_name,
                    value: role.count,
                },
                {
                    name: local.role_embed_placeHolder_name,
                    value: role.placeHolder,
                },
                {
                    name: local.role_embed_delay_name,
                    value: role.delay.toString(),
                },)
            .setColor("#ffb0b0")
            .setThumbnail(role.imageLink);
        return embed;
    }
    public static conditionEmbed(condition: WinningCondition, local: ILangProps){
        const embed = new EmbedBuilder()
            .setTitle(condition.name)
            .addFields([{
                name: "Condition",
                value: condition.condition
            }, {
                name: "Embed Title",
                value: condition.embedTitle
            }, {
                name: "Embed Description",
                value: condition.embedDescription
            }, {
                name: "Win Role",
                value: condition.winRole
            } ])
            .setThumbnail(condition.embedThumbnail)
            .setColor('#d96565')

        return embed;
    }
}
