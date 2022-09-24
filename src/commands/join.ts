import {BaseInteraction, ButtonInteraction, ChatInputCommandInteraction, EmbedBuilder} from "discord.js";
import {curHostGames} from "../index";

module.exports.execute = function (interaction: ButtonInteraction, gameid = 0) {
    // if (!gameid)
    //     gameid = interaction?.options.getNumber('gameid');
    if(curHostGames.has(gameid))
    {
        const host = curHostGames.get(gameid);
        if (!host.users.includes(interaction.user.id)){
            host.timeout.refresh();
            const embed = interaction.message.embeds[0];
            const newEmbed = new EmbedBuilder()
                .setTitle(embed.title)
                .setColor(embed.color)
                .setDescription(embed.description.split('<t:')[0] + `<t:${Math.floor(Date.now()/1000) + 600}:T>` + embed.description.split(':T>')[1] + `\n<@${interaction.user.id}>`)
                .setThumbnail(embed.thumbnail.url);

            host.users.push(interaction.user.id);
            curHostGames.set(gameid, host);
            interaction.message.edit({embeds: [newEmbed]});
            interaction.reply({content: `<@${interaction.user.id}> вошёл в игру \`\`${gameid}\`\`, всего в игре \`\`${host.users.length}\`\` участников!`, ephemeral: true});
        }else{
            interaction.reply({content:"Вы уже в этой игре!", ephemeral: true});
        }
    }else{
        interaction.reply({content: "Неправильный ID игры!", ephemeral: true});
    }
}