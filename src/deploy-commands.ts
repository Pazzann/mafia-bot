const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
import * as dotenv from 'dotenv';
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID, TOKEN = process.env.TOKEN;


const commands = [
    new SlashCommandBuilder()
        .setName('create')
        .setNameLocalization("ru", "создать")
        .setNameLocalization("uk", "створити")
        .setDescription('Create mafia game!')
        .setDescriptionLocalization("ru", "Создать игру в мафию!")
        .setDescriptionLocalization("uk", "Створити гру в мафію!"),
    new SlashCommandBuilder()
        .setName('lang')
        .setNameLocalization('ru', 'язык')
        .setNameLocalization('uk', "мова")
        .setDescription('Change the bot language')
        .setDescriptionLocalization('ru', 'Выберите язык в боте')
        .setDescriptionLocalization('uk', 'Виберіть мову в боті')
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);


rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
