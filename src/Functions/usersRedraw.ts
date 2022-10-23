import {Embed, EmbedBuilder} from "discord.js";

export default function usersRedraw(users: string[], embed: Embed){
    let a = embed.description.split('<t:')[0] + `<t:${Math.floor(Date.now()/1000) + 600}:R>` + embed.description.split(':R>')[1];
    a = a.split('**__')[0] + '**__ \n';
    users.map(item=>{
        a += `<@${item}> \n`
    })

    const newEmbed = new EmbedBuilder()
        .setTitle(embed.title)
        .setColor(embed.color)
        .setDescription(a)
        .setThumbnail(embed.thumbnail.url);
    return newEmbed;
}