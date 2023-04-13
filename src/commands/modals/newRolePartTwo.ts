import {EmbedBuilder, ModalSubmitInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

module.exports.execute = async function (interaction: ModalSubmitInteraction, user: User, locale: ILangProps, id: number) {
    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }
    try{
        const role = await Role.findOne({where: {id: id}, relations: ["user"]});
        if(role == null){
            interaction.reply({content: "No role found!", ephemeral: true})
            return;
        }
        if(role.user.userid != user.userid){
            interaction.reply({content: "You don't have permission to edit this role, sorry!", ephemeral: true})
            return;
        }

        if(role.action == "kill" || role.action == "heal" || role.action == "alibi" || role.action == "check" || role.action == "full_check" || role.action == "no_activity")
            role.action = interaction.fields.getTextInputValue("roleAction");
        else
            role.action = "no_activity";
        role.selfSelectable = Boolean(interaction.fields.getTextInputValue("roleSelectable"));
        role.delay = +interaction.fields.getTextInputValue("roleDelay");
        role.spawnFrom = +interaction.fields.getTextInputValue("roleSpawnFrom");
        role.groupDec = Boolean(interaction.fields.getTextInputValue("roleGroupSelection"));
        await role.save();

        const embed = MafiaEmbedBuilder.roleEmbed(role, locale);
        await interaction.reply({content: "Successfully", embeds: [embed]});
    }catch (err) {
        await interaction.reply("Error: " + err.message);
    }

}