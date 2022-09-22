import {ButtonInteraction, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import {curHostGames} from "../bot";

module.exports.execute = function (interaction: ButtonInteraction, gameid = 0) {
    // if (!gameid)
    //     gameid = interaction.options.getNumber('gameid');
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (host.users.includes(interaction.user.id)){
            const embed = interaction.message.embeds[0];
            const newEmbed = new EmbedBuilder()
                .setTitle(embed.title)
                .setColor(embed.color)
                .setDescription(embed.description.split('').splice(0, embed.description.indexOf(interaction.user.id)-4).join('') + embed.description.split('').splice(embed.description.indexOf(interaction.user.id)+19,embed.description.length).join(''))
                .setThumbnail(embed.thumbnail.url);
            host.users.splice(host.users.indexOf(interaction.user.id), 1);
            curHostGames.set(gameid, host);
            interaction.message.edit({embeds: [newEmbed]});
            interaction.reply({content:`<@${interaction.user.id}> покинул игру \`\`${host.id}\`\`, всего в игре \`\`${host.users.length}\`\` участников!`, ephemeral: false});
        }else{
            interaction.reply({content: "Вас там итак нет!", ephemeral: true});
        }
    }else{
        interaction.reply({content: "Неправильный ID игры!", ephemeral: true});
    }
}