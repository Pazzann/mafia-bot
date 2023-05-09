import {ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import MafiaEmbedBuilder from "../../Classes/MafiaEmbedBuilder";

export default async function viewrole(interaction: SelectMenuInteraction, user: User, locale: ILangProps, roleId: number) {

    const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
    if (role == null) {
        interaction.reply({content: locale.role_view_error_notFound, ephemeral: true}).catch();
        return;
    }
    const buttonRow: ActionRowBuilder<ButtonBuilder> =
        new ActionRowBuilder<ButtonBuilder>()
            .addComponents(
                new ButtonBuilder()
                    .setLabel(locale.role_view_button_clone)
                    .setCustomId("cloneRole" + roleId)
                    .setEmoji("🌀")
                    .setStyle(ButtonStyle.Success)
            );
    const embed = MafiaEmbedBuilder.roleEmbed(role, locale);

    interaction.reply({ephemeral: true, embeds: [embed], components: [buttonRow]}).catch();
}