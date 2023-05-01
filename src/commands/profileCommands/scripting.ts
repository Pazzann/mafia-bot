import {ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function scripting(interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {


    const embed = new EmbedBuilder()
        .setTitle("🛠Scripting")
        .setDescription("__**Base Concepts:**__")
        .addFields(
            {
                name: "Runtime and Environment Restrictions:",
                value: "Scripting engine uses JavaScript with some simple restrictions:\n- There is script execution time limit of 100 ms.\n-You cannot use this list of keywords: \`import\`, \`require\`, \`eval\`, \`Function\`, \`async\`, \`await\`, \`process\`, \`vm\`, \`new\`."
            }, {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: "Base Variables Concepts:",
                value: "sss"
            }, {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: "Other fields in custom Conditions:",
                value: "sss"
            })
        .setColor("#1751bd")

    const embed2 = new EmbedBuilder()
        .setTitle("Custom Roles")
        .setDescription("Description is very simple")
        .addFields({
                name: "__Fields in custom Roles:__",
                value: "- **Group Decision:** *describes how does selection of the role works. \`true\` for many people selecting 1 person per move, \`false\` for each person selects one player.*\n"
                    + "- **Self Selectable:** *defines if player can select itself. (\`true\` means yes, \`false\` means no)*\n"
                    + "- **Count:** *defines players count of your role. Can be simply number or script, see below.*\n"
                    + "- **Image:** *just a thumbnail in embed when receiving a role. Paste a valid link or it will be replaced.*\n"
                    + "- **Description:** *defines a description for role, when player receives one. Must be scripted, see below for instruction and example.*\n"
                    + "- **Spawn from:** *defines a minimal count of players for your role to spawn.*\n"
                    + "- **Action:** *defines an action at night. See the list of all actions below.*\n"
                    + "- **Placeholder:** *defines a placeholder in action select menu (kill, heal, etc.).*\n"
                    + "- **Delay:** *defines a delay between actions of one role, counts in days, if set to 1, action will be each day, if > 1 each count of days. Must be a number > 0.*\n"
            },
            {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: "__Actions:__",
                value: "\`no_activity\` - doesn't do anything.\n\`kill\` - kill a certain player.\n\`heal\` - cure somebody from death.\n\`check\` - check if this player is mafia or not.\n\`alibi\` - no one will be able to vote for this player for 1 day.\n\`full_check\` - shows a role of a selected player."
            },
            {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: "__Count Scripts__:",
                value: "Your equation must return number or it won't work. You can use this variables: \n\`{pCount}\` - a total count of players,\n\`{oRolesPCount}\` - a total count of generated roles, you must have only one role with this field or engine will automatically select only one of them.\n **Examples:**\nMafia role: \`Math.floor({pCount}/3)\`, Innocent role: \`{pCount}-{oRolesPCount}\`."
            }, {
                name: '\u200B',
                value: '\u200B'
            }, {
                name: "__Description Scripts__:",
                value: "Your equation must return string or it won't work. To define string use %. List of variables: \n\`{pCount}\` - a total count of players.\n\`{yRoleCount}\` - total count of players with your role.\n\`{oPlayersTRole}\` - all people that have the same role as player in format of {player}, {player}, etc.\n\`{aPlayersTRole}\` - all people that have the same role as player (including player) in format of {player}, {player}, etc.\n\`{oPlayersAllRoles}\` - all players with their roles in format of {player} — {role}, etc.\n\`{r:<rolename>:count}\` - count of one role people e.g. {r:mafia:count}\n\`{a:<actionname>:count}\` - count of people with action e.g. {a:kill:count}.\nExamples:\n\`mafia\` - \`\`\`js\n%KILL AND SURVIVE!\\n..*text*.. active players.% + ({r:maniac:count} > 0 ? % Exception: if there are two players left — a mafia member and the maniac — the maniac wins.% : %%) + ({r:mafia:count} > 1 ? %\n:busts_in_silhouette:  Your teammates: % + %{oPlayersTRole}% : %%)\`\`\`"
            })
        .setColor("#8aee88")

    const embed3 = new EmbedBuilder()
        .setTitle("Condition Scripting")
        .setDescription("Conditions is very simple")
        .setColor("#f813ff");


    interaction.reply({ephemeral: true, embeds: [embed, embed2, embed3]});
}