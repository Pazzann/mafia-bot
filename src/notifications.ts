import * as dotenv from "dotenv";
import {Client, EmbedBuilder, GatewayIntentBits, Partials} from "discord.js";
import User from "./Entities/User.entity";
import {DataSource} from "typeorm";
import Role from "./Entities/Role.entity";
import WinningCondition from "./Entities/WinningCondition.entity";

dotenv.config();
async function Test(){
    const TOKEN = process.env.TOKEN;
    const discordBot = new Client({
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
    const AppDataSource = new DataSource({
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
        .then(async () => {
            discordBot.login(TOKEN).then(async ()=>{
                const users = await User.findBy({notifications: true});


                //building message;

                const embed = new EmbedBuilder()
                    .setTitle("Test News")
                    .setDescription("HOHo")
                    .setColor("#e76565")

                //


                for(let user of users) {
                    discordBot.users.fetch(user.userid).then(async user=>{
                        const dm = user.dmChannel ?? await user.createDM();
                        dm.send({embeds: [embed]})
                    })
                }
                console.log("done");
            })
        })
        .catch((err) => {
            console.error("Error during Data Source initialization", err)
        });


}
Test();