import {ButtonInteraction, EmbedBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function premium(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    const embed = new EmbedBuilder()
        .setTitle(locale.premium_title)
        .setDescription(locale.premium_description)
        .setColor("#b8ee90")
        .addFields([
            {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: locale.premium_howDoIGet_name,
                value: locale.premium_howDoIGet_value
            }, {
                name: '\u200B',
                value: '\u200B'
            },
            {
                name: locale.premium_faq_name,
                value: locale.premium_faq_value
            }
        ]);

    interaction.reply({ephemeral: true, embeds: [embed]}).catch()
}