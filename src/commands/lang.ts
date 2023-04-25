import {ButtonInteraction, ChatInputCommandInteraction} from "discord.js";
import User from "../Entities/User.entity";
import {ILangProps} from "../types/interfaces/ILang";
import getLangButtons from "../Functions/getLangButtons";

export default  async function lang (interaction: ChatInputCommandInteraction, gameid = 0, user: User, locale: ILangProps){
    interaction.reply({content: "Please select a language!", components: getLangButtons(), ephemeral: true}).catch(()=>{});
}