import {
    ActionRowBuilder,
    ButtonInteraction,
    RestOrArray, SelectMenuBuilder,
    SelectMenuInteraction,
    SelectMenuOptionBuilder
} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

export default  async function editroleselectmenu(interaction: SelectMenuInteraction, user: User, locale: ILangProps, roleId: number) {

    if (!user.premium) {
        interaction.reply({
            content: "You don't have premium to create custom roles and conditions, sorry!",
            ephemeral: true
        })
        return;
    }
    const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
    if (role == null) {
        interaction.reply({content: "No role found!", ephemeral: true})
        return;
    }
    if (role.user.userid != user.userid) {
        interaction.reply({content: "You don't have permission to edit this role, sorry!", ephemeral: true})
        return;
    }
    const embed = MafiaEmbedBuilder.roleEmbed(role, locale);

    const row = new ActionRowBuilder<SelectMenuBuilder>()
        .addComponents(
            new SelectMenuBuilder()
                .setCustomId("editroleselection")
                .setPlaceholder('choose role to edit')
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    new SelectMenuOptionBuilder()
                        .setLabel("Name")
                        .setValue("editrolename" + String(role.id)),
                    new SelectMenuOptionBuilder()
                        .setLabel("Description")
                        .setValue("editroledescription" + String(role.id)),
                    new SelectMenuOptionBuilder()
                        .setLabel("ImageLink")
                        .setValue("editroleimage" + String(role.id)),
                    new SelectMenuOptionBuilder()
                        .setLabel("Action")
                        .setValue('editroleaction' + String(role.id)),
                    new SelectMenuOptionBuilder()
                        .setLabel("Delay")
                        .setValue("editroledelay" + String(role.id)),
                    new SelectMenuOptionBuilder()
                        .setLabel("Group Decision")
                        .setValue("editrolegroupdec" + String(role.id)),
                    new SelectMenuOptionBuilder()
                        .setLabel("Place Holder")
                        .setValue("editroleplaceholder" + String(role.id)),
                    new SelectMenuOptionBuilder()
                        .setLabel("Self Selectable")
                        .setValue("editroleselfselectable"  + String(role.id)),
                    new SelectMenuOptionBuilder()
                        .setLabel("Spawn From")
                        .setValue("editrolespawnfrom" + String(role.id)),
                    new SelectMenuOptionBuilder()
                        .setLabel("Count")
                        .setValue("editrolecount" + String(role.id))
                ])
        );

    interaction.reply({content: "Choose option to edit", ephemeral: true, embeds: [embed], components: [row]})
}