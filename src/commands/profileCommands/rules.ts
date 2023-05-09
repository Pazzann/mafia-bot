import {ActionRowBuilder, ButtonBuilder, ButtonStyle, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";

export default async function rules(interaction: ChatInputCommandInteraction, user: User, locale: ILangProps) {


    const embed = new EmbedBuilder()
        .setTitle("📚 Game Rules")
        .setDescription("The rules of the game.")
        .setFields({
            name: "Basic rules",
            value: "The flow of the game is controlled by bot, who also gives roles to players."
        }, {
            name: "Night time",
            value: "At night roles select their own actions. See details below about roles.",
        }, {
            name: "Daytime",
            value: "At daytime everybody selects who to vote for. Who has the most votes wins a place in a jail and suffers to death.",
        })
        .setColor("#329fff")
    const embed2 = new EmbedBuilder()
        .setTitle("Roles")
        .setDescription("This includes description only for standard roles, for the custom roles see in scripting help and profiles of owners.")
        .setFields({
            name: locale.role_mafia_name,
            value: "This is a group role, each night they kill one person together. Wins when their count of players multiplied by and added 1 is more than total count of alive players."
        },{
            name: locale.role_mistress_name,
            value: "You are the true fancy woman😉. Someone who was chosen by you at night can't be voted at the daytime."
        },{
            name: locale.role_police_name,
            value: "When you choose someone to check, you receive whether player is mafia or not."
        },{
            name: locale.role_killer_name,
            value: "You are alone. Kill a player once per 2 days and win by eliminating everybody."
        },{
            name: locale.role_doctor_name,
            value: "Oh, is somebody in danger😨??? You can heal player if he was chosen to die at night."
        },{
            name: locale.role_peaceful_name,
            value: "You are just an innocent inhabitant. Decide who wants to kill you and kick him at the daytime."
        })
        .setColor("#5dff82");
    const embed3 = new EmbedBuilder()
        .setTitle("Winning Conditions")
        .setDescription("This includes description only for standard conditions, for the custom conditions see in scripting help and profiles of owners.")
        .addFields({
            name: locale.condition_mafiaWin_name,
            value: "fsdfds",
        },{
            name: locale.condition_peacefulWin_name,
            value: "fsdfs"
        },{
            name: locale.condition_killerWin_name,
            value: "sdfs"
        })
        .setColor("#8697ff")

    interaction.reply({ephemeral: true, embeds: [embed, embed2, embed3]});
}