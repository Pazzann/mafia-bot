import {Client, EmbedBuilder, GatewayIntentBits, Interaction, Partials} from "discord.js";
import IHostGameProps from "./types/interfaces/IHost";
import * as dotenv from 'dotenv'
import {DataSource} from "typeorm";
import User from "./Entities/User";
import getLangButtons from "./Functions/getLangButtons";
import {Langs} from "./types/Langs";
import {ILangProps} from "./types/interfaces/ILang";
import dateParser from "./Functions/dateParser";
import MafiaGame from "./Classes/MafiaGame";

dotenv.config();

const TOKEN = process.env.TOKEN;
export interface ILocalProps{
    EN: ILangProps;
    RU: ILangProps;
    UA: ILangProps
}
export const localisations: ILocalProps = {
    EN: require('./langs/en.json'),
    UA: require('./langs/ua.json'),
    RU: require('./langs/ru.json')
}


export const discordBot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel
    ]
});
export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.SQLHOST,
    port: +process.env.SQLPORT,
    username: process.env.SQLUSERNAME,
    password: process.env.SQLPASSWORD,
    database: process.env.SQLDATABASE,
    synchronize: true,
    logging: false,
    entities: [User],
    subscribers: [],
    migrations: [],
});
AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization", err)
    });

export const curHostGames: Map<number, IHostGameProps> = new Map();
export const curHandlingGames: Map<number, MafiaGame> = new Map();

discordBot.on('interactionCreate', async (interaction: Interaction) => {
    const dataUser = await User.findOneBy({userid: interaction.user.id})
    if (interaction.isChatInputCommand()) {
        if(!dataUser){
            interaction.reply({content: "To use the bot, select the language, first", ephemeral: true, components: getLangButtons()}).catch(()=>{});
            return;
        }
        const {commandName} = interaction;
        if (interaction.channel.isDMBased() && commandName === "create"){
            interaction.reply({content:'Создать игру в мафию вы можете только на сервере!', ephemeral: true}).catch(()=>{});
            return;
        }
        const commandObj = require(`./commands/${commandName}`);
        commandObj.execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
    } else if (interaction.isSelectMenu()) {
        let mafGame: MafiaGame = null;
        for (let game of curHandlingGames.values()){
            if (game.HasPlayer(interaction.user.id)){
                mafGame = game;
            }
        }
        if(!mafGame) {
            interaction.reply("You are not playing a game").catch(()=>{});
            return;
        }
        const voteForId = interaction.values[0];
        mafGame.Choose(mafGame.GetUser(interaction.user.id), voteForId, interaction);



    }else if (interaction.isButton()){
        try {
            switch (interaction.customId){
                case "en":{
                    if(!dataUser){
                        await User.create({
                            userid: interaction.user.id,
                            lang: Langs.EN,
                            totalGames: 0,
                            totalWins: 0,
                            since: dateParser(new Date())
                        }).save();
                    }else{
                        dataUser.lang = Langs.EN;
                        await dataUser.save();
                    }
                    interaction.reply({content: "Successfully set english!", ephemeral: true}).catch(()=>{});
                    return;
                }
                case "ru": {
                    if(!dataUser){
                        await User.create({
                            userid: interaction.user.id,
                            lang: Langs.RU,
                            totalGames: 0,
                            totalWins: 0,
                            since: dateParser(new Date())
                        }).save();
                    }else{
                        dataUser.lang = Langs.RU;
                        await dataUser.save();
                    }
                    interaction.reply({content: "Язык изменён на русский!", ephemeral: true}).catch(()=>{});
                    return;
                }
                case "ua":{
                    if(!dataUser){
                        await User.create({
                            userid: interaction.user.id,
                            lang: Langs.UA,
                            totalGames: 0,
                            totalWins: 0,
                            since: dateParser(new Date())
                        }).save();
                    }else{
                        dataUser.lang = Langs.UA;
                        await dataUser.save();
                    }
                    interaction.reply({content: "Успішно встановлено українську!", ephemeral: true}).catch(()=>{});
                    return;
                }

            }
            if(!dataUser){
                interaction.reply({content: "To use the bot, select the language, first", ephemeral: true, components: getLangButtons()}).catch(()=>{});
                return;
            }
            if(interaction.customId === "createnew"){
                require('./commands/create').execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps])
                return;
            }
            if(interaction.customId === "premium"){
                require('./commands/premium').execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps])
                return;
            }
            const gameId = Number(interaction.customId.split('').splice(1, 5).join(''))
            switch (interaction.customId[0]){
                case 'j':{
                    require('./commands/join').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
                case 'c':{
                    require('./commands/cancel').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
                case 's':{
                    require('./commands/start').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
                case 'l':{
                    require('./commands/leave').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
                case 'e':{
                    require('./commands/end').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
            }
        }catch (err){

        }
    }
});

discordBot.on('ready', () => {
    console.log("started");
});

discordBot.login(TOKEN);
