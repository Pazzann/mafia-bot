import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";

module.exports.execute = async function (interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {

    const embed = new EmbedBuilder()
        .setTitle("📄Help")


        .addFields([{
            name: "📋Commands:",
            value: "\`create\` - Create a new mafia game.\n\`lang\` - Change language *(__\`EN\`__, __\`RU\`__, __\`UA\`__)*.\n\`profile\` - Shows your profile.\n\`help\` - You are here ^_^."
        }, {
            name: '\u200B',
            value: '\u200B'
        },{
            name: "❓FAQ:",
            value: "__*Can I play for free?*__\nYes, you can play vanilla mafia for free.\n\n__*Are all the players required to have premium to play with custom stuff?*__\nNo, only one person needs premium.\n\n__*If something goes wrong, what should I do?*__\nRestart the game and if you want, send what happened to developer with the button below."
        }, {
            name: '\u200B',
            value: '\u200B'
        },{
            name: "🌍Plans for Future:",
            value: "Create a custom game stages, more actions and fix bugs with updating script engine."
        }, {
            name: '\u200B',
            value: '\u200B'
        }, {
            name: "🗒Credentials and Tech Info:",
            value: "\`Version:\` 2.0.5.\n\`Source code:\` https://github.com/Pazzann/mafia-bot.\n\`Developer:\` Boy From God#2772\n\`Localization:\` denyshon#9143\n\`Art:\` Midjourney, popa_sani#4041"
        }])
        .setDescription(`Mafia bot is bot to create and customize your mafia games, enjoy!`)
        .setColor('#b0ff9c')
        .setThumbnail('https://media.discordapp.net/attachments/1008571116241047642/1017336428365099008/Boy_From_God_mafia_vote_424735d6-e773-4ac5-9731-5fa2fcfba119.png?width=566&height=566')

    const buttons = new ActionRowBuilder<ButtonBuilder>()
        .addComponents(
            new ButtonBuilder()
                .setEmoji("💵")
                .setLabel("Premium")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("premium")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("📙")
                .setLabel("Game Rules")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("rules")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("🛠")
                .setLabel("Scripting")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("scripting")
                .setDisabled(false),
            new ButtonBuilder()
                .setEmoji("📨")
                .setLabel("Message to support")
                .setStyle(ButtonStyle.Primary)
                .setCustomId("helpmessage")
                .setDisabled(false)
        );
    interaction.reply({embeds: [embed], components: [buttons]});
}