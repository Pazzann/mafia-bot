import {Client, EmbedBuilder, GatewayIntentBits, Interaction, Partials} from "discord.js";
import IMafiaGameProps from "./types/interfaces/IGame";
import IHostGameProps from "./types/interfaces/IHost";
import IUserProps from "./types/interfaces/IUser";
import {IRolesProps} from "./types/interfaces/IRoles";
import MafiaEmbedBuilder from "./Classes/MafiaEmbedBuilder";
import getVoteRow from "./Functions/SelectRows/getVoteRow";
import endChooseMoveHandler from "./Functions/endChooseMoveHandler";
import * as dotenv from 'dotenv'
import {DataSource} from "typeorm";
import User from "./Entities/User";
import getLangButtons from "./Functions/getLangButtons";
import {Langs} from "./types/Langs";
import {ILangProps} from "./types/interfaces/ILang";
import dateParser from "./Functions/dateParser";
import MafiaGame from "./Classes/MafiaGame";
import MafiaUser from "./Classes/MafiaUser";

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
    logging: true,
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
        /*let game: MafiaGame | null = null;
        let user: MafiaUser | null = null;

        for (let g of curHandlingGames.values()) {
            if (g.HasPlayer(interaction.user.id)) {
                game = g;
                user = g.GetUser(interaction.user.id);
            }
        }
        if (user && game) {
            if (user.isKilled) {
                interaction.reply({content: "Вы мертв", ephemeral: true}).catch(() => {
                });
                return;
            }
            const voteForId = interaction.values[0];
            let res = await game.Choose(user, voteForId);
            switch (game.stage) {
                case "chossing": {
                    switch (user.role) {
                        case IRolesProps.MAFIA: {
                            if (game.users.filter(item => item.isKilled === false).filter(item => msgCon == item.userid).length > 0 && game.votedToCheck.mafia.filter(item => item.mafia == user.userid).length === 0) {
                                let userMafiaSelect = game.users.filter((item) => msgCon == item.userid)[0];
                                game.votedToCheck.mafia.push({mafia: user.userid, target: userMafiaSelect.userid});
                                interaction.reply(`Вы выбрали ${userMafiaSelect.userTag}!`).catch(() => {
                                });
                                interaction.message.edit({components: [getMafiaRow(game.users, true)]});
                                game = endChooseMoveHandler(game);
                                if (!game.finished)
                                    curHandlingGames.set(game.id, game);
                            } else {
                                interaction.reply({content: `Вы уже выбрали!`, ephemeral: true}).catch(() => {
                                });
                            }
                            break;
                        }
                        case IRolesProps.POLICE: {
                            if (game.users.filter(item => item.isKilled === false).filter(item => msgCon == item.userid).length > 0 && game.votedToCheck.police === null) {
                                let userSel: IUserProps;
                                game.users.map((item) => msgCon == item.userid ? userSel = item : null);
                                interaction.reply(`Pоль ${userSel.userTag} - ${userSel.role === IRolesProps.MAFIA ? "мафия" : "не мафия"}`).catch(() => {
                                });
                                interaction.message.edit({components: [getPoliceRow(game.users, true)]});
                                game.votedToCheck.police = userSel.userid;
                                game = endChooseMoveHandler(game);
                                if (!game.finished)
                                    curHandlingGames.set(game.id, game);
                            } else {
                                interaction.reply({content: `Вы уже выбрали!`, ephemeral: true}).catch(() => {
                                });
                            }
                            break;
                        }
                        case IRolesProps.DOCTOR: {
                            if (game.users.filter(item => item.isKilled === false).filter(item => msgCon == item.userid).length > 0 && game.votedToCheck.doctor === null) {
                                let userSel: IUserProps;
                                game.users.map((item, index) => msgCon == item.userid ? userSel = item : null);
                                interaction.reply(`${userSel.userTag} будет вылечен!`).catch(() => {
                                });
                                interaction.message.edit({components: [getDoctorRow(game.users, true)]});
                                game.votedToCheck.doctor = userSel.userid;
                                game = endChooseMoveHandler(game);
                                if (!game.finished)
                                    curHandlingGames.set(game.id, game);
                            } else {
                                interaction.reply({content: `Вы уже выбрали!`, ephemeral: true}).catch(() => {
                                });
                            }
                            break;
                        }
                        case IRolesProps.KILLER: {
                            if (game.users.filter(item => item.isKilled === false).filter(item => msgCon == item.userid).length > 0 && game.votedToCheck.killer === null) {
                                let userSel: IUserProps;
                                game.users.map((item, index) => msgCon == item.userid ? userSel = item : null);
                                interaction.reply(`Вы выбрали что хотите убить ${userSel.userTag}!`).catch(() => {
                                });
                                interaction.message.edit({components: [getKillerRow(game.users, true)]});
                                game.votedToCheck.killer = userSel.userid;
                                game = endChooseMoveHandler(game);
                                if (!game.finished)
                                    curHandlingGames.set(game.id, game);
                            } else {
                                interaction.reply({content: `Вы уже выбрали!`, ephemeral: true}).catch(() => {
                                });
                            }

                            break;
                        }
                    }

                    break;
                }
                case "discussion": {

                    if (game.users.filter(item => item.isKilled === false).filter(item => msgCon == item.userid).length > 0 || msgCon == "skip_vote") {
                        if (msgCon != "skip_vote") {
                            let userSel: IUserProps;
                            game.users.map((item) => msgCon == item.userid ? userSel = item : null);
                            if (game.votedToKick.filter(item => item.userid === interaction.user.id).length !== 0) {
                                interaction.reply({content: 'Вы уже проголосовали', ephemeral: true}).catch(() => {
                                });
                                return;
                            } else {
                                game.votedToKick.push({
                                    userid: interaction.user.id,
                                    forwhom: userSel.userid
                                });
                                let votes = `${game.votedToKick.length}/${game.users.filter(item => item.isKilled === false).length}: \n`;
                                game.votedToKick.map(item => {
                                    votes += `<@${item.userid}> - ${item.forwhom === "skip_vote" ? `Пропуск` : `<@${item.forwhom}>`}\n`
                                })
                                game.users.map(item => {
                                    discordBot.users.fetch(item.userid).then(async user => {
                                        const dm = user?.dmChannel ?? await user.createDM();
                                        dm.send(`${votes}`);
                                    });
                                });
                                interaction.reply("Вы успешно проголосовали").catch(() => {
                                });
                                interaction.message.edit({components: [getVoteRow(game.users, true)]});
                            }

                        } else {
                            if (game.votedToKick.filter(item => item.userid === interaction.user.id).length !== 0) {
                                interaction.reply({content: 'Вы уже проголосовали', ephemeral: true}).catch(() => {
                                });
                                return;
                            } else {
                                game.votedToKick.push({
                                    userid: interaction.user.id,
                                    forwhom: "skip_vote"
                                });
                                let votes = `${game.votedToKick.length}/${game.users.filter(item => item.isKilled === false).length}: \n`;
                                game.votedToKick.map(item => {
                                    votes += `<@${item.userid}> - ${item.forwhom === "skip_vote" ? `Пропуск` : `<@${item.forwhom}>`}\n`
                                })
                                game.users.map(item => {
                                    discordBot.users.fetch(item.userid).then(async user => {
                                        const dm = user?.dmChannel ?? await user.createDM();
                                        dm.send(`${votes}`);
                                    });
                                });
                                interaction.reply("Вы успешно проголосовали").catch(() => {
                                });
                                interaction.message.edit({components: [getVoteRow(game.users, true)]});
                            }

                        }


                        if (game.votedToKick.length === game.users.filter(item => item.isKilled === false).length) {

                            let votedForUsers: Array<{ userid: string; numbersOfVotes: number; tag: string; }> = [];
                            game.users.filter(item => item.isKilled === false).map(item => {
                                votedForUsers.push({
                                    tag: item.userTag,
                                    userid: item.userid,
                                    numbersOfVotes: game.votedToKick.filter(vote => vote.forwhom === item.userid).length
                                });
                            });
                            votedForUsers.push({
                                tag: "скип",
                                userid: 'skip',
                                numbersOfVotes: game.votedToKick.filter(vote => vote.forwhom === "skip_vote").length
                            })
                            votedForUsers = votedForUsers.sort((item, item2) => item2.numbersOfVotes - item.numbersOfVotes);
                            const voteEmded = new EmbedBuilder();
                            voteEmded.setColor(0xa4fd8a);
                            voteEmded.setTitle("Результаты голосования")
                            let votes: string = "";
                            for (let value of votedForUsers) {
                                votes += value.tag + ": " + value.numbersOfVotes + "\n"
                            }
                            voteEmded.setDescription(votes);
                            game.users.map(item => {
                                discordBot.users.fetch(item.userid).then(async user => {
                                    const dm = user?.dmChannel ?? await user.createDM();
                                    dm.send({embeds: [voteEmded]});
                                });
                            });
                            game.votedToKick = [];
                            if (votedForUsers[0].numbersOfVotes === votedForUsers[1].numbersOfVotes || votedForUsers[0].userid == "skip") {
                                game.users.map(item => {
                                    discordBot.users.fetch(item.userid).then(async user => {
                                        const dm = user?.dmChannel ?? await user.createDM();
                                        dm.send(`Выбрать никого не удалось или произошел пропуск голосования`);
                                    });
                                });
                            } else {
                                let curVoted = votedForUsers[0];
                                let indexOfVotedFor: number;
                                game.users.map((item, index) => item.userid == curVoted.userid ? indexOfVotedFor = index : null);
                                game.users[indexOfVotedFor].isKilled = true;
                                if (game.users.filter(user => user.role === IRolesProps.MAFIA).filter(mafia => mafia.isKilled === false).length === 0 && game.users.filter(user => user.role === IRolesProps.KILLER).filter(killer => killer.isKilled === false).length === 0) {
                                    game.users.map(item => {
                                        discordBot.users.fetch(item.userid).then(async user => {
                                            const dm = user?.dmChannel ?? await user.createDM();
                                            dm.send({embeds: [MafiaEmbedBuilder.peacefulWin()]});
                                            curHandlingGames.delete(game.id);
                                        });
                                    });
                                    return;
                                }
                                const alive = game.users.filter(item => item.isKilled == false);
                                if (game.users.length > 7 && game.users.filter(item => item.role === IRolesProps.KILLER)[0]?.isKilled === false && alive.length < 3) {
                                    game.users.map(item => {
                                        discordBot.users.fetch(item.userid).then(async user => {
                                            const dm = user?.dmChannel ?? await user.createDM();
                                            dm.send({embeds: [MafiaEmbedBuilder.killerWin(game.users.filter(item => item.role === IRolesProps.KILLER)[0].userTag)]});
                                        });
                                        curHandlingGames.delete(game.id);
                                        return;
                                    });
                                } else if (alive.length < alive.filter(item => item.role == IRolesProps.MAFIA).length * 2 + 1) {
                                    game.users.map(item => {
                                        discordBot.users.fetch(item.userid).then(async user => {
                                            const dm = user?.dmChannel ?? await user.createDM();
                                            dm.send({embeds: [MafiaEmbedBuilder.mafiaWin(game.users.filter(item => item.role === IRolesProps.MAFIA))]});
                                        });
                                    });
                                    curHandlingGames.delete(game.id);
                                    return;
                                }
                            }
                            game.stage = 'chossing';
                            game.day++;
                            game.votedToCheck = {
                                mafia: [],
                                doctor: game.users.filter(item => item.role == IRolesProps.DOCTOR)[0].isKilled ? "noDoctor" : null,
                                police: game.users.filter(item => item.role == IRolesProps.POLICE)[0].isKilled ? "noPolice" : null,
                                mistress: "noMistress",
                                killer: game.users.length > 7 ? game.users.filter(item => item.role == IRolesProps.KILLER)[0].isKilled ? "noKiller" : null : "noKiller"
                            }
                            game.users.map(item => {
                                discordBot.users.fetch(item.userid).then(async user => {
                                    const dm = user?.dmChannel ?? await user.createDM();
                                    dm.send({embeds: [MafiaEmbedBuilder.sleepTime(item.local)]});
                                });
                            });
                            game.users.filter(item => item.role === IRolesProps.MAFIA && item.isKilled === false).map((item) => {
                                discordBot.users.fetch(item.userid).then(async user => {
                                    const dm = user?.dmChannel ?? await user.createDM();
                                    dm.send({components: [getMafiaRow(game.users)]});
                                });
                            });
                            if (game.users.filter(item => item.role === IRolesProps.DOCTOR && item.isKilled === false).length > 0)
                                discordBot.users.fetch(game.users.filter(item => item.role === IRolesProps.DOCTOR && item.isKilled === false)[0].userid).then(async user => {
                                    const dm = user?.dmChannel ?? await user.createDM();
                                    dm.send({components: [getDoctorRow(game.users)]});
                                });
                            if (game.users.filter(item => item.role === IRolesProps.POLICE && item.isKilled === false).length > 0)
                                discordBot.users.fetch(game.users.filter(item => item.role === IRolesProps.POLICE && item.isKilled === false)[0].userid).then(async user => {
                                    const dm = user?.dmChannel ?? await user.createDM();
                                    dm.send({components: [getPoliceRow(game.users)]});
                                });
                            if (game.users.filter(item => item.role === IRolesProps.KILLER && item.isKilled === false).length > 0)
                                discordBot.users.fetch(game.users.filter(item => item.role === IRolesProps.KILLER && item.isKilled === false)[0].userid).then(async user => {
                                    const dm = user?.dmChannel ?? await user.createDM();
                                    dm.send({components: [getKillerRow(game.users)]});
                                });
                        }
                    }
                    curHandlingGames.set(game.id, game);
                    break;
                }
            }

        } else {
            interaction.reply({ephemeral: true, content: "Неправильные данные"}).catch(()=>{});
            return;
        }
        */
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
