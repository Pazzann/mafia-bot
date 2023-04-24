import {ButtonInteraction, EmbedBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function premium(interaction: ButtonInteraction, user: User, locale: ILangProps) {

    const embed = new EmbedBuilder()
        .setTitle("💸Premium")
        .setColor("#b8ee90")
        .addFields([
            {
                name: "📑General Info:",
                value: "Cost: 1$/month\nPremium helps us to improve bot, make new features and a lot more.\nBenefits you receive:\n ◈ Custom Roles\n ◈ Custom Games\n ◈ Custom winning conditions"
            },
            {
                name: "❓FAQ:",
                value: "If I didn't receive a premium after purchase?\n - Just write support a dm in official server or simply with a button in profile."
            },
            {
                name: "📋Instruction:",
                value: "1. Join official server: https://discord.gg/ZWnx8rqGTD\n2. Buy patreon premium level: https://www.patreon.com/MafiaBot775\n3. Link your discord account to patreon.\n4. Wait a bit and enjoy:3"
            }
        ]);

    interaction.reply({ephemeral: true, embeds: [embed]})
}