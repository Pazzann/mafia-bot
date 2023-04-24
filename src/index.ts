import {
    ButtonInteraction,
    ChatInputCommandInteraction,
    Client,
    EmbedBuilder,
    GatewayIntentBits, GuildMember,
    Interaction, ModalSubmitInteraction,
    Partials, SelectMenuInteraction
} from "discord.js";
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
import profile from "./commands/profile";
import lang from "./commands/lang";
import create from "./commands/create";
import help from "./commands/help";
import join from "./commands/gameCommands/join";
import cancel from "./commands/gameCommands/cancel";
import leave from "./commands/gameCommands/leave";
import start from "./commands/gameCommands/start";
import end from "./commands/gameCommands/end";
import edit from "./commands/gameCommands/edit";
import editconditiongamelist from "./commands/gameCommands/editconditiongamelist";
import editrolegamelist from "./commands/gameCommands/editrolegamelist";
import createcondition from "./commands/profileCommands/createcondition";
import createrole from "./commands/profileCommands/createrole";
import custom from "./commands/profileCommands/custom";
import deletecondition from "./commands/profileCommands/deletecondition";
import deleteconditionselect from "./commands/profileCommands/deleteconditionselect";
import deleterole from "./commands/profileCommands/deleterole";
import deleteroleselect from "./commands/profileCommands/deleteroleselect";
import editcondition from "./commands/profileCommands/editcondition";
import editconditionselect from "./commands/profileCommands/editconditionselect";
import editrole from "./commands/profileCommands/editrole";
import editrolecomplete from "./commands/profileCommands/editrolecomplete";
import editroleselectmenu from "./commands/profileCommands/editroleselectmenu";
import helpmessage from "./commands/profileCommands/helpmessage";
import newconditionhalfbut from "./commands/profileCommands/newconditionhalfbut";
import newrolehalfbut from "./commands/profileCommands/newrolehalfbut";
import news from "./commands/profileCommands/news";
import premium from "./commands/profileCommands/premium";
import rules from "./commands/profileCommands/rules";
import scripting from "./commands/profileCommands/scripting";
import viewcondition from "./commands/profileCommands/viewcondition";
import viewrole from "./commands/profileCommands/viewrole";
import editCondition from "./commands/modals/editCondition";
import editRole from "./commands/modals/editRole";
import newConditionPartOne from "./commands/modals/newConditionPartOne";
import newConditionPartTwo from "./commands/modals/newConditionPartTwo";
import newRolePartOne from "./commands/modals/newRolePartOne";
import newRolePartTwo from "./commands/modals/newRolePartTwo";
import textToModeration from "./commands/modals/textToModeration";
import langSet from "./commands/langSet";
import includeFromArray from "./Functions/includeFromArray";

dotenv.config();

const TOKEN = process.env.TOKEN;

export interface ILocalProps {
    EN: ILangProps;
    RU: ILangProps;
    UA: ILangProps;
}

export const localisations: ILocalProps = {
    EN: require('./langs/en.json'),
    UA: require('./langs/ua.json'),
    RU: require('./langs/ru.json')
}


export const discordBot = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageTyping,
        GatewayIntentBits.DirectMessageReactions,
        GatewayIntentBits.MessageContent
    ],
    partials: [
        Partials.Channel
    ]
});

const commands = {
    common: {
        profile,
        lang,
        help,
        create,
        langSet
    },
    gameCommands: {
        j: join,
        c: cancel,
        l: leave,
        s: start,
        e: end,
        r: edit,
        editconditiongamelist,
        editrolegamelist
    },
    profileCommands: {
        createcondition,
        createrole,
        custom,
        deletecondition,
        deleteconditionselect,
        deleterole,
        deleteroleselect,
        editcondition,
        editconditionselect,
        editrole,
        editrolecomplete,
        editroleselectmenu,
        helpmessage,
        newconditionhalfbut,
        newrolehalfbut,
        news,
        premium,
        rules,
        scripting,
        viewcondition,
        viewrole,
    },
    modals: {
        editCondition,
        editRole,
        newConditionPartOne,
        newConditionPartTwo,
        newRolePartOne,
        newRolePartTwo,
        textToModeration

    }
}

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

discordBot.on("guildMemberUpdate", async (oldMember: GuildMember, newMember: GuildMember) => {
    if (newMember.guild.id != process.env.GUILD_ID) {
        return;
    }
    let dataUser = await User.findOne({
        where: {userid: newMember.user.id},
        relations: ["customRoles", "conditions"]
    });
    if (!dataUser) {
        dataUser = await User.create({
            userid: newMember.user.id,
            lang: Langs.EN,
            totalGames: 0,
            totalWins: 0,
            since: dateParser(new Date())
        }).save();
    }
    dataUser.premium = newMember.roles.cache.has(process.env.ROLE_ID);
    await dataUser.save();
});


discordBot.on('interactionCreate', async (interaction: ChatInputCommandInteraction | ButtonInteraction | SelectMenuInteraction | ModalSubmitInteraction) => {
    try {
        // await interaction.deferReply();
        const dataUser = await User.findOne({
            where: {userid: interaction.user.id},
            relations: ["customRoles", "conditions"]
        })
        if (!dataUser) {
            interaction.reply({
                content: "To use the bot, select the language, first:",
                ephemeral: true,
                components: getLangButtons()
            }).catch();
            return;
        }
        if (interaction.isChatInputCommand()) {
            const {commandName} = interaction;
            if (interaction.channel.isDMBased() && commandName === "create") {

                interaction.reply({
                    content: 'Create a game you can only on the server!',
                    ephemeral: true
                }).catch(() => {
                });
                return;
            }
            // @ts-ignore
            commands.common[commandName](interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
        } else if (interaction.isSelectMenu()) {
            if (interaction.customId == "editrole")
                return commands.profileCommands.editroleselectmenu(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps], +interaction.values[0].split("editrole").join("")).catch();
            if (interaction.customId == "viewrole")
                return commands.profileCommands.viewrole(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps], +interaction.values[0].split("viewrole").join("")).catch();
            if (interaction.customId == "deleterole")
                return commands.profileCommands.deleteroleselect(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps], +interaction.values[0].split("deleterole").join("")).catch();
            if (interaction.customId == "viewcondition")
                return commands.profileCommands.viewcondition(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps], +interaction.values[0].split("viewcondition").join("")).catch();
            if (interaction.customId == "deletecondition")
                return commands.profileCommands.deleteconditionselect(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps], +interaction.values[0].split("deletecondition").join("")).catch();
            if (interaction.customId == "editcondition")
                return commands.profileCommands.editconditionselect(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps], +interaction.values[0]).catch();
            if (interaction.customId == "editroleselection")
                return commands.profileCommands.editrolecomplete(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch();
            if (interaction.customId == "editrolegamelist")
                return commands.gameCommands.editrolegamelist(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch();
            if (interaction.customId == "editcondtiongamelist")
                return commands.gameCommands.editconditiongamelist(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch();
            let mafGame: MafiaGame = null;
            for (let game of curHandlingGames.values()) {
                if (game.HasPlayer(interaction.user.id)) {
                    mafGame = game;
                }
            }
            if (!mafGame) {

                interaction.reply("You are not playing a game").catch(() => {
                });
                return;
            }
            const voteForId = interaction.values[0];
            mafGame.Choose(mafGame.GetUser(interaction.user.id), voteForId, interaction);
        } else if (interaction.isButton()) {
            try {
                if (["en", "ua", "ru"].includes(interaction.customId))
                    commands.common.langSet(interaction, dataUser);

                if (interaction.customId === "createnew")
                    return commands.common.create(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch();
                if (["premium", "editrole", "editcondition", "custom", "createrole", "deleterole", "createcondition", "deletecondition", "news", "helpmessage", "rules", "scripting"].includes(interaction.customId))
                    // @ts-ignore
                    return commands.profileCommands[interaction.customId](interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch()
                if (interaction.customId.includes("newrolehalfbut"))
                    return commands.profileCommands.newrolehalfbut(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch();
                if (interaction.customId.includes("newconditionhalfbut"))
                    return commands.profileCommands.newconditionhalfbut(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch();
                if (['j', 'c', 's', 'l', 'e', 'r'].includes(interaction.customId[0])) {
                    const gameId = Number(interaction.customId.split('').splice(1, 5).join(''));
                    // @ts-ignore
                    commands.gameCommands[interaction.customId[0]](interaction, gameId, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]);
                }
            } catch (err) {

            }
        } else if (interaction.isModalSubmit()) {
            try {
                if(interaction.customId.includes("newConditionPartTwo"))
                    return commands.modals.newConditionPartTwo(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch();
                if(interaction.customId.includes("newRolePartTwo"))
                    return commands.modals.newRolePartTwo(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch();
                if(interaction.customId.includes("editRole"))
                    return commands.modals.editRole(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof  ILocalProps]).catch();
                if(interaction.customId.includes("editCondition"))
                    return commands.modals.editCondition(interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof  ILocalProps]).catch();
                if (includeFromArray(interaction.customId, ["newRolePartOne", "newConditionPartOne", "textToModeration", "editCondition"])){
                    // @ts-ignore
                    commands.modals[interaction.customId.match(/\w+/)[0]](interaction, dataUser, localisations[dataUser.lang.toUpperCase() as keyof ILocalProps]).catch();

                }


            } catch (err) {

            }
        }
    } catch (err) {
        console.log(err);
    }

});

discordBot.on('ready', () => {
    console.log("started");
});

discordBot.login(TOKEN);
