const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { CLIENT_ID, TOKEN } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('create')
        .setNameLocalization("ru", "создать")
        .setNameLocalization("uk", "створити")
        .setDescription('Create mafia game!')
        .setDescriptionLocalization("ru", "Создать игру в мафию!")
        .setDescriptionLocalization("uk", "Створити гру в мафію!"),
    new SlashCommandBuilder()
        .setName('join')
        .setNameLocalization("ru", "присоединится")
        .setNameLocalization("uk", "приєднатися")
        .setDescription('Join to the game by id!')
        .setDescriptionLocalization("ru", "Присоединится к игре в мафию при помощи айди!")
        .setDescriptionLocalization("uk", "Приєднатися до гри в мафію за допомогою айді!")
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setNameLocalization("ru", "айдиигры")
                .setNameLocalization("uk", "айдігри")
                .setDescription('Game id!')
                .setDescriptionLocalization("ru", "Айди игры!")
                .setDescriptionLocalization("uk", "Айді гри!")
                .setRequired(true);
            return option;
        }),
    new SlashCommandBuilder('end')
        .setName('end')
        .setNameLocalization("ru", "закончить")
        .setNameLocalization("uk", "завершити")
        .setDescription('End the game')
        .setDescriptionLocalization("ru", "Закончить внепланово игру!")
        .setDescriptionLocalization("uk", "Завершити гру в мафію!")
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setNameLocalization("ru", "айдиигры")
                .setNameLocalization("uk", "айдігри")
                .setDescription('Game id!')
                .setDescriptionLocalization("ru", "Айди игры!")
                .setDescriptionLocalization("uk", "Айді гри!")
                .setRequired(true);
            return option;
        }),
    new SlashCommandBuilder('end')
        .setName('cancel')
        .setNameLocalization("ru", "отменить")
        .setNameLocalization("uk", "відмінити")
        .setDescription('Cancel the game!')
        .setDescriptionLocalization("ru", "Отменить хост игры!")
        .setDescriptionLocalization("uk", "Відмінити хост гри!")
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setNameLocalization("ru", "айдиигры")
                .setNameLocalization("uk", "айдігри")
                .setDescription('Game id!')
                .setDescriptionLocalization("ru", "Айди игры!")
                .setDescriptionLocalization("uk", "Айді гри!")
                .setRequired(true);
            return option;
        }),
    new SlashCommandBuilder()
        .setName('leave')
        .setNameLocalization("ru", "выйти")
        .setNameLocalization("uk", "вийти")
        .setDescription('Leave from the game!')
        .setDescriptionLocalization("ru", "Выйти из хоста игры!")
        .setDescriptionLocalization("uk", "Вийти з хоста гри!")
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setNameLocalization("ru", "айдиигры")
                .setNameLocalization("uk", "айдігри")
                .setDescription('Game id!')
                .setDescriptionLocalization("ru", "Айди игры!")
                .setDescriptionLocalization("uk", "Айді гри!")
                .setRequired(true);
            return option;
        }),
    new SlashCommandBuilder()
        .setName('start')
        .setNameLocalization("ru", "старт")
        .setNameLocalization("uk", "старт")
        .setDescription('Start the hosted game')
        .setDescriptionLocalization("ru", "Старт игры!")
        .setDescriptionLocalization("uk", "Старт гри!")
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setNameLocalization("ru", "айдиигры")
                .setNameLocalization("uk", "айдігри")
                .setDescription('Game id!')
                .setDescriptionLocalization("ru", "Айди игры!")
                .setDescriptionLocalization("uk", "Айді гри!")
                .setRequired(true);
            return option;
        })
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);


rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
