import {
    ActionRowBuilder,
    ButtonInteraction,
    ModalBuilder,
    SelectMenuInteraction,
    TextInputBuilder,
    TextInputStyle
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";

module.exports.execute = async function (interaction: SelectMenuInteraction, user: User, locale: ILangProps) {
    try {
        if(!user.premium){
            interaction.followUp({content: "You don't have premium to create custom roles and conditions, sorry!", ephemeral: true})
            return;
        }

        let roleId = +interaction.values[0].match(/[0-9]+/)[0];
        let action = interaction.values[0].split("editrole").join('').split(String(roleId)).join('');
        const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
        if (role == null) {
            interaction.followUp({content: "No role found!", ephemeral: true})
            return;
        }
        if (role.user.userid != user.userid) {
            interaction.followUp({content: "You don't have permission to edit this role, sorry!", ephemeral: true})
            return;
        }
        const modal = new ModalBuilder()
            .setCustomId('editRole' + String(roleId))
            .setTitle('Edit Role');


        switch (action){
            case "name":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("Name")
                            .setPlaceholder("What is the name of your role?")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                            .setValue(role.name)
                        )
                )
                break;
            }
            case "description":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("NewDescription")
                            .setPlaceholder("New Description. For more information see /help Scripting")
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                            .setValue(role.description)
                        )
                )
                break;
            }
            case "image":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("New Image link")
                            .setPlaceholder("Enter new image link for thumbnail")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                            .setValue(role.imageLink)
                        )
                )
                break;
            }
            case "action":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("Action")
                            .setPlaceholder("Set the action")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        )
                )
                break;
            }
            case "delay":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("Delay")
                            .setValue(role.delay.toString())
                            .setPlaceholder("Delay between actions in days\"")
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        )
                )
                break;
            }
            case "groupdec":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("Group selection")
                            .setPlaceholder("true or false")
                            .setValue(String(role.groupDec))
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        )
                )
                break;
            }
            case "placeholder":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("Place holder")
                            .setPlaceholder("New place holder for selecting player to action")
                            .setStyle(TextInputStyle.Short)
                            .setMaxLength(100)
                            .setValue(role.placeHolder)
                            .setRequired(true)
                        )
                )
                break;
            }
            case "selfselectable":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("SelfSelectable")
                            .setPlaceholder("true or false")
                            .setValue(String(role.selfSelectable))
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        )
                )
                break;
            }
            case "spawnfrom":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("Spawn From")
                            .setPlaceholder("Spawn from player count")
                            .setValue(String(role.spawnFrom))
                            .setStyle(TextInputStyle.Short)
                            .setRequired(true)
                        )
                )
                break;
            }
            case "count":{
                modal.addComponents(
                    new ActionRowBuilder<TextInputBuilder>()
                        .addComponents(new TextInputBuilder()
                            .setCustomId('editRole' + action)
                            .setLabel("Count")
                            .setPlaceholder("Enter count. For more information see /help Scripting")
                            .setValue(role.count)
                            .setStyle(TextInputStyle.Paragraph)
                            .setRequired(true)
                        )
                )
                break;
            }

        }


        await interaction.showModal(modal);

    }catch (err){
        console.log(err)
    }
}