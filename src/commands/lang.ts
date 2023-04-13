import {ButtonInteraction, ChatInputCommandInteraction} from "discord.js";
import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";
import getLangButtons from "../Functions/getLangButtons";

module.exports.execute = async function (interaction: ChatInputCommandInteraction, gameid = 0, user: User, locale: ILangProps){
    interaction.reply({content: "Choose please!", components: getLangButtons(), ephemeral: true}).catch(()=>{}).catch(()=>{});
}