import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

module.exports.execute = async function (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {


    const embed = new EmbedBuilder()
        .setTitle("🛠Scripting")
        .setDescription("This is a quick look through the scripting in the bot.")
        .setColor("#1751bd")

    interaction.followUp({embeds: [embed]});
}