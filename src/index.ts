import {Client, EmbedBuilder, GatewayIntentBits, Interaction, Partials} from "discord.js";
import IHostGameProps from "./types/interfaces/IHost";
import * as dotenv from 'dotenv'
import {DataSource} from "typeorm";
import User from "./Entities/User.entity";
import getLangButtons from "./Functions/getLangButtons";
import {Langs} from "./types/Langs";
import {ILangProps} from "./types/interfaces/ILang";
import dateParser from "./Functions/dateParser";
import MafiaGame from "./Classes/MafiaGame";
import WinningCondition from "./Entities/WinningCondition.entity";
import Role from "./Entities/Role.entity";

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
    entities: [User, Role, WinningCondition],
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
    const dataUser = await User.findOne({where: {userid: interaction.user.id }, relations: ["customRoles", "conditions"]})
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
        if(interaction.customId == "editrole"){
            let roleId = interaction.values[0].split("editrole").join("");
            require('./commands/profileCommands/editroleselectmenu').execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps], roleId)
            return;
        }
        if(interaction.customId == "editroleselection"){
            require('./commands/profileCommands/editrolecomplete').execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps])
            return;
        }

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
                require('./commands/gameCommands/create').execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps])
                return;
            }
            if(["premium", "editrole", "editcondition", "custom", "createrole", "deleterole", "createcondition", "deletecondition"].includes(interaction.customId)){
                require(`./commands/profileCommands/${interaction.customId}`).execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                return;
            }
            if(interaction.customId.includes("newrolehalfbut")){
                let id = Number(interaction.customId.split("newrolehalfbut").join(''));
                require(`./commands/profileCommands/newrolehalfbut`).execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps], id);
                return;
            }

            const gameId = Number(interaction.customId.split('').splice(1, 5).join(''))
            switch (interaction.customId[0]){
                case 'j':{
                    require('./commands/gameCommands/join').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
                case 'c':{
                    require('./commands/gameCommands/cancel').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
                case 's':{
                    require('./commands/gameCommands/start').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
                case 'l':{
                    require('./commands/gameCommands/leave').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
                case 'e':{
                    require('./commands/gameCommands/end').execute(interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                    break;
                }
            }
        }catch (err){

        }
    }else if(interaction.isModalSubmit()){
        try {
            if(interaction.customId.includes("newRolePartTwo")){
                let id = Number(interaction.customId.split("newRolePartTwo").join(''));
                require(`./commands/modals/newRolePartTwo`).execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps], id);
                return;
            }
            if(["newRolePartOne"].includes(interaction.customId)){
                require(`./commands/modals/${interaction.customId}`).execute(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                return;
            }
        }catch (err){}

    }
});

discordBot.on('ready', () => {
    console.log("started");
});

discordBot.login(TOKEN);
