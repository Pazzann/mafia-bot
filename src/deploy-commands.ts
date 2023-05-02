import {CommandInteractionOption, SlashCommandUserOption} from "discord.js";

const { SlashCommandBuilder, Routes, CommandInteractionOption } = require('discord.js');
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
        .setDescriptionLocalization('uk', 'Виберіть мову в боті'),
    new SlashCommandBuilder()
        .setName('profile')
        .setNameLocalization('ru', 'профиль')
        .setNameLocalization('uk', "профіль")
        .setDescription('See your profile')
        .setDescriptionLocalization('ru', 'Увидеть свой профиль')
        .setDescriptionLocalization('uk', 'Побачити свій профіль')
        .addUserOption((option: SlashCommandUserOption) =>
            option.setName('user')
                .setDescription('User profile that you want to see.')
                .setRequired(false)),
    new SlashCommandBuilder()
        .setName('help')
        .setNameLocalization('ru', 'помощь')
        .setNameLocalization('uk', "допомога")
        .setDescription('Get help by topics')
        .setDescriptionLocalization('ru', 'Помощь по темам')
        .setDescriptionLocalization('uk', 'Допомога по темам')
]
    .map(command => command.toJSON());

const rest = new REST().setToken(TOKEN);


rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
