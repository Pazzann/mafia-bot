import {ActionRowBuilder, ButtonInteraction, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

module.exports.execute = async function (interaction: ButtonInteraction, user: User, locale: ILangProps) {

    if (!user.premium) {
        interaction.followUp({
            content: "You don't have premium to create custom roles and conditions, sorry!",
            ephemeral: true
        })
        return;
    }
    if(user.customRoles.length > 0){
        const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
        for (let role of user.customRoles){
            const roleOption = new SelectMenuOptionBuilder()
                .setLabel(role.name)
                .setValue(String(role.id));
            chooseArr.push(roleOption)
        }
        const row = new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId("deleterole")
                    .setPlaceholder('choose role to delete')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
            );
        interaction.followUp({ ephemeral: true, components: [row]});
    }else{
        interaction.followUp({ephemeral: true, content: "You don't have roles"})
    }

}