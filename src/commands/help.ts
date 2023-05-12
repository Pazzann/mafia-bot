import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";

export default async function help (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {

    const embed = new EmbedBuilder()
        .setTitle(locale.help_title)
        .setDescription(locale.help_description)
        .setColor("#b0ff9c")
        .setThumbnail("https://cdn.discordapp.com/attachments/1055494696291532851/1106706041271484547/Untitled.png")
        .addFields([{
            name: '\u200B',
            value: '\u200B'
        },{
            name: locale.help_commands_name,
            value: locale.help_commands_value
        }, {
            name: '\u200B',
            value: '\u200B'
        },{
            name: locale.help_faq_name,
            value: locale.help_faq_value
        }, {
            name: '\u200B',
            value: '\u200B'
        },{
            name: locale.help_plans_name,
            value: locale.help_plans_value
        }, {
            name: '\u200B',
            value: '\u200B'
        }, {
            name: locale.help_about_name,
            value: locale.help_about_value
        }])


    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("📙")
                .setLabel(locale.help_button_rules)
                .setStyle(ButtonStyle.Primary)
                .setCustomId("rules")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("🛠")
                .setLabel(locale.help_button_scripting)
                .setStyle(ButtonStyle.Primary)
                .setCustomId("scripting")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("📨")
                .setLabel(locale.help_button_helpmessage)
                .setStyle(ButtonStyle.Primary)
                .setCustomId("helpmessage")
                .setDisabled(false)
        );

    interaction.reply({embeds: [embed], components: [buttons], ephemeral: true}).catch();
}