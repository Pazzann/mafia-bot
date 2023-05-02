import {
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ChatInputCommandInteraction,
    EmbedBuilder,
    RestOrArray, StringSelectMenuBuilder, StringSelectMenuOptionBuilder
} from "discord.js";
import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";
import {dbDateToDate} from "../Functions/dateParser";
import getProfileButtons from "../Functions/getProfileButtons";


export default async function profile (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {
    const target = interaction.options.getUser('user');

    let title = locale.profile_title;
    let totalGames =  String(user.totalGames);
    let totalWins = String(user.totalWins);
    let premium = user.premium ? locale.profile_premium_purchased : locale.profile_premium_notPurchased;
    let thumbnail = interaction.user.avatarURL();
    let buttons = true;
    let date = user.since;
    let dsDate = interaction.user.createdAt.getTime();
    let componentsTarget: ActionRowBuilder<StringSelectMenuBuilder>[] = [];
    if(target){
        let targetDB =  await User.findOne({
            where: {userid: target.id},
            relations: ["customRoles", "conditions"]
        });
        if(targetDB){
            title = target.tag;
            totalGames = String(targetDB.totalGames);
            totalWins = String(targetDB.totalWins);
            premium = targetDB.premium ? locale.profile_premium_purchased : locale.profile_premium_notPurchased;
            thumbnail = target.avatarURL();
            buttons = false;
            date = targetDB.since;
            dsDate = target.createdAt.getTime();

            if(targetDB.customRoles.length > 0){
                const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];
                for (let role of targetDB.customRoles){
                    const roleOption = new StringSelectMenuOptionBuilder()
                        .setLabel(role.name)
                        .setValue("viewrole"  + String(role.id));
                    chooseArr.push(roleOption)
                }
                const row = new ActionRowBuilder<StringSelectMenuBuilder>()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("viewrole")
                            .setPlaceholder('choose role to view')
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions(chooseArr)
                    );
                componentsTarget.push(row)
            }
            if(targetDB.conditions.length > 0){
                const chooseArr: RestOrArray<StringSelectMenuOptionBuilder> = [];
                for (let condition of targetDB.conditions){
                    const conditionOption = new StringSelectMenuOptionBuilder()
                        .setLabel(condition.name)
                        .setValue("viewcondition"  + String(condition.id));
                    chooseArr.push(conditionOption)
                }
                const row = new ActionRowBuilder<StringSelectMenuBuilder>()
                    .addComponents(
                        new StringSelectMenuBuilder()
                            .setCustomId("viewcondition")
                            .setPlaceholder('choose condition to view')
                            .setMinValues(1)
                            .setMaxValues(1)
                            .addOptions(chooseArr)
                    );
                componentsTarget.push(row)
            }
        }else {
            interaction.reply({content: "This user doesn't have mafia profile yet.", ephemeral: true}).catch();
            return;
        }

    }

    const embed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(`⌛**${locale.profile_mafiaAccountSince}** <t:${Math.round(dbDateToDate(date) / 1000)}:d>\n⌚**${locale.profile_accountSince}** <t:${Math.round(dsDate / 1000)}:d>`)
        .setColor('#b73131')
        .addFields([
            {
                name: locale.profile_totalGames,
                value: totalGames,
                inline: true
            },
            {
                name: locale.profile_totalWins,
                value: totalWins,
                inline: true
            },
            {
                name: locale.profile_premium,
                value: premium,
                inline: true
            },
        ])
        .setThumbnail(thumbnail)

    if (buttons){
        interaction.reply({embeds: [embed], components: [getProfileButtons(user, locale)], ephemeral: true}).catch();
    }else{
        interaction.reply({embeds: [embed], components: componentsTarget, ephemeral: true}).catch();
    }

}