import {CommandInteractionOption, SlashCommandUserOption} from "discord.js";

const { SlashCommandBuilder, Routes, CommandInteractionOption } = require('discord.js');
const { REST } = require('@discordjs/rest');
import * as dotenv from 'dotenv';
dotenv.config();
const CLIENT_ID = process.env.CLIENT_ID, TOKEN = process.env.TOKEN;


const commands = [
    new SlashCommandBuilder()
        .setName("create")
        .setNameLocalization("ru", "создать")
        .setNameLocalization("uk", "створити")
        .setDescription("Create a new game")
        .setDescriptionLocalization("ru", "Создать новую игру")
        .setDescriptionLocalization("uk", "Створити нову гру"),
    new SlashCommandBuilder()
        .setName("lang")
        .setNameLocalization("ru", "язык")
        .setNameLocalization("uk", "мова")
        .setDescription("Change the bot language")
        .setDescriptionLocalization("ru", "Изменить язык бота")
        .setDescriptionLocalization("uk", "Змінити мову бота"),
    new SlashCommandBuilder()
        .setName("profile")
        .setNameLocalization("ru", "профиль")
        .setNameLocalization("uk", "профіль")
        .setDescription("View your profile")
        .setDescriptionLocalization("ru", "Просмотреть свой профиль")
        .setDescriptionLocalization("uk", "Переглянути свій профіль")
        .addUserOption((option: SlashCommandUserOption) =>
            option.setName("user")
                .setDescription("The user whose profile you want to view")
                .setDescriptionLocalization("ru", "Пользователь, чей профиль вы хотите просмотреть")
                .setDescriptionLocalization("uk", "Користувач, чий профіль ви хочете переглянути")
                .setRequired(false)),
    new SlashCommandBuilder()
        .setName("help")
        .setNameLocalization("ru", "помощь")
        .setNameLocalization("uk", "допомога")
        .setDescription("View help")
        .setDescriptionLocalization("ru", "Просмотреть справку")
        .setDescriptionLocalization("uk", "Переглянути довідку")
]
    .map(command => command.toJSON());

const rest = new REST().setToken(TOKEN);


rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
