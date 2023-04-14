import {
    ActionRowBuilder, ActionRowComponent,
    EmbedBuilder,
    ModalSubmitInteraction,
    TextInputBuilder,
    TextInputComponent,
    TextInputStyle
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";
import {getTreeRepository} from "typeorm";

module.exports.execute = async function (interaction: ModalSubmitInteraction, user: User, locale: ILangProps, customid: string) {
    if(!user.premium){
        interaction.reply({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
        return;
    }
    let id = +customid.match(/[0-9]+/)[0];
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
        let IdOfInput = (interaction.components[0].components[0] as TextInputComponent).customId;
        // interaction.reply(JSON.stringify(interaction.components[0], null, 2));
        switch (IdOfInput){
            case "editRolename":{
                role.name = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoledescription":{
                role.description = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoleimage":{
                role.imageLink = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoleaction":{
                role.action = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoledelay":{
                role.delay = +(interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRolegroupdec":{
                role.groupDec = Boolean((interaction.components[0].components[0] as TextInputComponent).value);
                break;
            }
            case "editRoleplaceholder":{
                role.placeHolder = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRoleselfselectable":{
                role.selfSelectable = Boolean((interaction.components[0].components[0] as TextInputComponent).value);
                break;
            }
            case "editRolespawnfrom":{
                role.spawnFrom = +(interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }
            case "editRolecount":{
                role.count = (interaction.components[0].components[0] as TextInputComponent).value;
                break;
            }

        }
        role.save();
        interaction.reply({ephemeral: false, content: "succesfully", embeds:[MafiaEmbedBuilder.roleEmbed(role, locale)]})


    }catch (err) {
    }

}