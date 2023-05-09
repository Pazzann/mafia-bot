import {ButtonInteraction} from "discord.js";
import User from "../../Entities/User.entity";
import {ILangProps} from "../../types/interfaces/ILang";
import Role from "../../Entities/Role.entity";
import WinningCondition from "../../Entities/WinningCondition.entity";

export default async function clone(interaction: ButtonInteraction, user: User, locale: ILangProps) {
    if (interaction.customId.includes("Role")) {
        let roleId: number = +interaction.customId.split("cloneRole").join("");
        const role = await Role.findOne({where: {id: roleId}, relations: ["user"]});
        if (role == null) {
            interaction.reply({content: locale.role_clone_error_notFound, ephemeral: true}).catch();
            return;
        }
        if (user.customRoles.length >= 19) {
            interaction.reply({content: locale.role_clone_error_number, ephemeral: true}).catch();
            return;
        }

        await Role.create({
            user: user,
            name: role.name,
            action: role.action,
            delay: role.delay,
            groupDec: role.groupDec,
            count: role.count,
            spawnFrom: role.spawnFrom,
            placeHolder: role.placeHolder,
            imageLink: role.imageLink,
            selfSelectable: role.selfSelectable,
            description: role.description
        }).save();

        interaction.reply({content: locale.role_clone_success_message, ephemeral: true}).catch();
    } else if (interaction.customId.includes("Condition")) {
        let conditionId: number = +interaction.customId.split("cloneCondition").join("");
        const condition = await WinningCondition.findOne({where: {id: conditionId}, relations: ["user"]});
        if (condition == null) {
            interaction.reply({content: locale.condition_clone_error_number, ephemeral: true}).catch();
            return;
        }
        if (user.conditions.length >= 21) {
            interaction.reply({content: locale.condition_clone_error_notFound, ephemeral: true}).catch();
            return;
        }
        await WinningCondition.create({
            name: condition.name,
            user,
            condition: condition.condition,
            embedTitle: condition.embedTitle,
            embedDescription: condition.embedDescription,
            embedThumbnail: condition.embedThumbnail,
            winRole: condition.winRole
        }).save();
        interaction.reply({content: locale.role_clone_success_message, ephemeral: true}).catch();
    }
}