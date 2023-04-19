import {EmbedBuilder} from "discord.js";
import {ILangProps} from "../types/interfaces/ILang";
import {Langs} from "../types/Langs";
import BaseRole from "./Roles/BaseRole";
import ScriptEngine from "./ScriptEngine";
import MafiaUser from "./MafiaUser";
import Role from "../Entities/Role.entity";
import WinningCondition from "../Entities/WinningCondition.entity";
import {Theme} from "../Functions/themes";

export default class MafiaEmbedBuilder {

    public static wakeUp(locale: ILangProps) {
        const embed = new EmbedBuilder()
            .setTitle(locale.wake_up_title)
            .setColor("#ffeb84")
            .setDescription(locale.wake_up_description)
            .setThumbnail("https://media.discordapp.net/attachments/1008571116241047642/1017719727092674641/Boy_From_God_sunshine_afia_f4721756-c9e6-458d-91e3-59fdd9db50c8.png?width=566&height=566");
        return embed;
    }

    public static sleepTime(locale: ILangProps) {
        const embed = new EmbedBuilder()
            .setTitle(locale.sleep_time_title)
            .setColor("#8a1616")
            .setDescription(locale.sleep_time_description)
            .setThumbnail("https://cdn.discordapp.com/attachments/1008571116241047642/1017720507816226878/Boy_From_God_sunset_mafia_1beea8f2-1460-4e7a-b503-b1745e76ff51.png");
        return embed;
    }

    public static kills(kills: string[], locale: ILangProps) {
        const embed = new EmbedBuilder()
            .setTitle(locale.kills_title)
            .setColor("#8f2727")
            .setDescription(kills.length > 1 ? `${kills.join(", ")} ${locale.kills_description_many}` : `${kills.join(", ")} ${locale.kills_description_one}`)
            .setThumbnail("https://media.discordapp.net/attachments/1008571116241047642/1017760387191554069/Boy_From_God_killed_person_in_the_room_f2c4bd1a-6d87-4fcd-9fa8-3aec48ed626d.png?width=566&height=566");
        return embed;
    }

    public static nokills(locale: ILangProps) {
        const embed = new EmbedBuilder()
            .setTitle(locale.no_kills_title)
            .setColor("#63ff4f")
            .setDescription(locale.no_kills_description)
            .setThumbnail("https://media.discordapp.net/attachments/1008571116241047642/1017760387191554069/Boy_From_God_killed_person_in_the_room_f2c4bd1a-6d87-4fcd-9fa8-3aec48ed626d.png?width=566&height=566");
        return embed;
    }

    public static roleGiver(owner: MafiaUser, players: MafiaUser[], theme: Theme, locale: ILangProps, lang: Langs, roles: BaseRole[]) {
        let rolesValue = "";
        for (let role of roles) {
            rolesValue += `${role.GetRoleName(owner.lang)}: \`\`${players.filter(item => item.role.RoleName == role.RoleName).length}\`\` \n `
        }
        const embed = new EmbedBuilder()
            .setTitle(`${locale.start_your_role}: ${owner.role.GetRoleName(owner.lang)}`)
            .setColor("#c468ff")
            .addFields([{
                name: locale.start_game_info,
                value: `${locale.start_theme}: \`\`${theme.GetTheme(lang)}\`\` \n ${locale.start_player_count}: \`\`${players.length}\`\` \n  ${rolesValue}`
            }]);

            embed.setDescription(String(ScriptEngine.DescriptionEngine(owner.role.GetDescription(owner.lang), players, owner)));


        embed.setThumbnail(owner.role.ImageLink);
        return embed;
    }
    public static roleEmbed(role: Role, locale: ILangProps){
        const embed = new EmbedBuilder()
            .setTitle(role.name)
            .setDescription(role.description)
            .addFields(
                {
                    name: locale.role_embed_action_name,
                    value: role.action,
                },
                {
                    name: locale.role_embed_groupDec_name,
                    value: role.groupDec.toString(),
                },
                {
                    name: locale.role_embed_spawnFrom_name,
                    value: role.spawnFrom.toString(),
                },
                {
                    name: locale.role_embed_selfSelectable_name,
                    value: role.selfSelectable.toString(),
                },
                {
                    name: locale.role_embed_count_name,
                    value: role.count,
                },
                {
                    name: locale.role_embed_placeHolder_name,
                    value: role.placeHolder,
                },
                {
                    name: locale.role_embed_delay_name,
                    value: role.delay.toString(),
                },)
            .setColor("#ffb0b0")
            .setThumbnail(role.imageLink);
        return embed;
    }
    public static conditionEmbed(condition: WinningCondition, locale: ILangProps){
        const embed = new EmbedBuilder()
            .setTitle(condition.name)
            .addFields([{
                name: locale.condition_embed_condition_name,
                value: condition.condition
            }, {
                name: locale.condition_embed_embedTitle_name,
                value: condition.embedTitle
            }, {
                name: locale.condition_embed_embedDescription_name,
                value: condition.embedDescription
            }, {
                name: locale.condition_embed_winRole_name,
                value: condition.winRole
            } ])
            .setThumbnail(condition.embedThumbnail)
            .setColor('#d96565')

        return embed;
    }
}
