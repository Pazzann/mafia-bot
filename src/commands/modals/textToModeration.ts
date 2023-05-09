import {
    Client, EmbedBuilder,
    ModalSubmitInteraction
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function textToModeration (interaction: ModalSubmitInteraction, user: User, locale: ILangProps, bot: Client) {
    await bot.users.fetch("390561515054563328").then(async me => {
        const dm = me.dmChannel ?? await me.createDM();
        const embed = new EmbedBuilder()
            .setTitle("Message")
            .setDescription(interaction.fields.getTextInputValue("text"))
            .setColor("#ffffff")
            .setAuthor({iconURL: interaction.user.avatarURL(), name: interaction.user.tag})
        await dm.send({embeds: [embed]});
        await interaction.reply({content: "sended", ephemeral: true}).catch();
    }).catch(async () => {
        await interaction.reply({content: "unsuccessful", ephemeral: true}).catch();
    });
}