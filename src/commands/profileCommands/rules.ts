import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function rules(interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {


    const embed = new EmbedBuilder()
        .setTitle("📚 Game Rules")
        .setDescription("The rules of the game.")
        .setColor("#329fff")

    interaction.reply({embeds: [embed]});
}