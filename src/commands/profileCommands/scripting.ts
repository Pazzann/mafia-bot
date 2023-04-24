import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function scripting(interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {


    const embed = new EmbedBuilder()
        .setTitle("🛠Scripting")
        .setDescription("This is a quick look through the scripting in the bot.")
        .setColor("#1751bd")

    interaction.reply({embeds: [embed]});
}