const { SlashCommandBuilder, Routes } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { CLIENT_ID, TOKEN } = require('./config.json');

const commands = [
    new SlashCommandBuilder()
        .setName('create')
        .setDescription('Create mafia game!'),
    new SlashCommandBuilder()
        .setName('join')
        .setDescription('join game')
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setDescription('Game id!')
                .setRequired(true);
            return option;
        }),
    new SlashCommandBuilder('end')
        .setName('end')
        .setDescription('End the game')
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setDescription('Game id!')
                .setRequired(true);
            return option;
        }),
    new SlashCommandBuilder('end')
        .setName('cancel')
        .setDescription('Cancel the game!')
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setDescription('Game id!')
                .setRequired(true);
            return option;
        }),
    new SlashCommandBuilder()
        .setName('leave')
        .setDescription('Leave from the game!')
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setDescription('Game id!')
                .setRequired(true);
            return option;
        }),
    new SlashCommandBuilder()
        .setName('start')
        .setDescription('Start the hosted game')
        .addNumberOption((option: any)=>{
            option
                .setName('gameid')
                .setDescription('Game id!')
                .setRequired(true);
            return option;
        })
]
    .map(command => command.toJSON());

const rest = new REST({ version: '10' }).setToken(TOKEN);


rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
