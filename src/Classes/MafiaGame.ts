import MafiaUser from "./MafiaUser";
import {curHandlingGames, discordBot} from "../index";
import User from "../Entities/User.entity";
import BaseRole from "./Roles/BaseRole";
import shuffle from "../Functions/shuffle";
import ScriptEngine from "./ScriptEngine";
import {Langs} from "../types/Langs";
import BaseCondition from "./WinningConditions/BaseCondition";
import MafiaRole from "./Roles/MafiaRole";
import {
    ActionRowBuilder,
    EmbedBuilder,
    SelectMenuBuilder,
    SelectMenuComponent,
    SelectMenuInteraction
} from "discord.js";
import MafiaEmbedBuilder from "./MafiaEmbedBuilder";


export default class MafiaGame {
    public Players: MafiaUser[];
    private readonly _author: string;
    private _day: number;
    private readonly _id: number;
    private _stage: "choosing" | "discussion";
    private _finished: boolean;
    private _roles: BaseRole[];
    private _winCond: BaseCondition[];

    constructor(id: number, author: string) {
        this._id = id;
        this._author = author;
        this._day = 1;
        this._stage = "choosing";
        this._finished = false;
    }

    public CheckEndGame(): boolean {
        for(let condition of this._winCond) {
            if (ScriptEngine.WinningEngine(condition.Condition, this.Players)){
                this.Players.map(item=>{
                    item.dsUser.dmChannel.send({
                        embeds: [condition.GetEmbed(item.lang)]
                    });
                });
                if(condition.WinRole == "innocent"){
                    this.GetPeacefulUsers().map(item =>{
                        item.dbUser.totalWins++;
                        item.dbUser.save();
                    });
                }else {
                    this.Players.filter(item =>{item.role.RoleName == condition.WinRole}).map(item=>{
                        item.dbUser.totalWins++;
                        item.dbUser.save();
                    });
                }
                this.Players.map(item =>{
                    item.dbUser.totalGames++;
                    item.dbUser.save();
                })
                return true;

            }
        }
        return false;
    }

    public async EndChooseMoveHandler() {
        if (this.GetAliveUsers().filter((item) =>
            item.actionsOnUser.hasDoneAction == false
        ).length == 0) {
            this._roles.map(item => {
                if (item.ActionOnSelect == "no_activity" || item.ActionOnSelect == "full_check" || item.ActionOnSelect == "check")
                    return;
                const arrChoose: { user: MafiaUser, times: number }[] = [];
                item.Selection.map(user => {
                    let l = arrChoose.filter(it => it.user.id == user.id).length;
                    if (l == 0) {
                        arrChoose.push({user: user, times: 1});
                    } else {
                        arrChoose.map((itemSel, index) => {
                            if (itemSel.user.id == user.id) {
                                arrChoose[index].times++;
                            }
                        });
                    }
                });
                let SelectedUser: MafiaUser = arrChoose.sort((a, b) => b.times - a.times)[0].user;
                switch (item.ActionOnSelect) {
                    case "kill": {
                        SelectedUser.actionsOnUser.kill = true;
                        break;
                    }
                    case "heal": {
                        SelectedUser.actionsOnUser.heal = true;
                        break;
                    }
                    case "alibi": {
                        SelectedUser.actionsOnUser.alibi = true;
                        break;
                    }
                }
                item.clearSelection();
            });
            let tags: string[] = [];
            this.GetAliveUsers().map(item => {
                if (item.actionsOnUser.kill && !item.actionsOnUser.heal) {
                    tags.push(item.dsUser.tag);
                    item.isKilled = true;
                }
            });

            let killEmbed = (tags.length == 0) ? MafiaEmbedBuilder.nokills() : MafiaEmbedBuilder.kills(tags);
            this.Players.map(item => {
                item.dsUser.dmChannel.send({
                    embeds: [MafiaEmbedBuilder.wakeUp(), killEmbed],
                });
            });
            if(this.CheckEndGame()){
                this._finished = true;

                curHandlingGames.delete(this._id);
                return;
            }
            this.GetAliveUsers().map(item => {
                item.dsUser.dmChannel.send({
                    components: [item.role.GetVoteRow(this.GetAliveUsers(), false)]
                });
            });
            this._stage = "discussion";
        }
    }

    public async EndVoteMoveHandler() {
        if (this.GetAliveUsers().length == this.GetVotedLength()) {

            let votedForUsers: Array<{ userid: string; numbersOfVotes: number; }> = [];
            this.GetAliveUsers().map(item => {
                votedForUsers.push({userid: item.id, numbersOfVotes: item.actionsOnUser.voted});
            })
            votedForUsers.sort((a, b) => b.numbersOfVotes - a.numbersOfVotes);
            const voteEmded = new EmbedBuilder();
            voteEmded.setColor(0xa4fd8a);
            voteEmded.setTitle("Результаты голосования")
            let votes: string = "";
            for (let value of votedForUsers) {
                votes += this.GetUser(value.userid).dsUser.tag + ": " + value.numbersOfVotes + "\n"
            }

            voteEmded.setDescription(votes);
            this.Players.map(item => {
                item.dsUser.dmChannel.send({embeds: [voteEmded]});
            });
            if(votedForUsers[0].numbersOfVotes == votedForUsers[1].numbersOfVotes){
                this.Players.map(item => {
                    item.dsUser.dmChannel.send("Стол попилили");
                });
            }else{
                this.Players.map(item => {
                    item.dsUser.dmChannel.send(this.GetUser(votedForUsers[0].userid).dsUser.tag + " выгнан голосованием");
                });
                this.GetUser(votedForUsers[0].userid).isKilled = true;
            }
            if(this.CheckEndGame()){
                this._finished = true;
                curHandlingGames.delete(this._id);
                return;
            }


            this.Players.map(item => {
                item.dsUser.dmChannel.send({
                    embeds: [MafiaEmbedBuilder.sleepTime(item.local)],
                });
                item.clearActions();
            })
            this.GetAliveUsers().map(item => {
                let row = item.role.GetNightVoteRow(this.GetAliveUsers(), false, item);
                if(row) {
                    item.dsUser.dmChannel.send({
                        components: [row]
                    });
                }
            });


            this._stage = "choosing";
            this._day++;


        }
    }


    public async Choose(who: MafiaUser, whom: string, interaction: SelectMenuInteraction) {
        if (!this.HasPlayer(whom))
            return interaction.reply("invalid player");
        let whomU = this.GetUser(whom);
        if(whomU.isKilled)
            return interaction.reply("invalid player");
        if (!this._validateSelection(who, whomU))
            return interaction.reply("invalid player");
        const row = new SelectMenuBuilder((interaction.component as SelectMenuComponent).data).setDisabled(true);
        interaction.message.edit({components: [ new ActionRowBuilder<SelectMenuBuilder>().addComponents(row)]});
        switch (this._stage) {
            case "choosing": {
                const role = this.GetRole(who);
                switch (who.role.ActionOnSelect) {
                    case "check": {
                        interaction.reply(whomU.role.RoleName == "mafia" ? "mafia" : "not mafia");
                        who.actionsOnUser.hasDoneAction = true;
                        break;
                    }

                    case "full_check": {
                        interaction.reply(whomU.role.RoleName);
                        who.actionsOnUser.hasDoneAction = true;
                        break;
                    }
                    case "no_activity": {
                        interaction.reply("Who are you?");
                        break;
                    }
                    default: {
                        role.Selection.push(whomU);
                        interaction.reply("ok");
                        who.actionsOnUser.hasDoneAction = true;
                        break;
                    }
                }

                this.EndChooseMoveHandler();
                return;
            }
            case "discussion": {
                whomU.actionsOnUser.voted++;
                who.actionsOnUser.hasVoted = true;
                interaction.reply("ok");
                this.SendToAll(this.GetVotedLength() + "/" + this.GetAliveUsers().length + "\n" + who.dsUser.tag + " - " + whomU.dsUser.tag);
                this.EndVoteMoveHandler();
                return;
            }
        }
        return true;
    }

    public GetVotedLength() {
        return this.Players.filter(item => item.actionsOnUser.hasVoted == true).length;
    }

    public SendToAll(msg: string = " ", embeds: EmbedBuilder[] = []) {
        this.Players.map(item => {
            item.dsUser.dmChannel.send({content: msg, embeds: embeds}).catch()
        })
    }

    private _validateSelection(who: MafiaUser, whom: MafiaUser): boolean {
        if (whom.isKilled == true)
            return false;
        if (who.isKilled == true)
            return false;
        if (who.actionsOnUser.hasDoneAction == true && this._stage === "choosing")
            return false;
        if (who.actionsOnUser.hasVoted == true && this._stage === "discussion")
            return false;
        return true;
    }

    public GetUser(id: string): MafiaUser {
        return this.Players.filter((p) => p.id === id)[0];
    }

    public HasPlayer(id: string): boolean {
        return this.Players.filter((player) => player.id === id).length > 0;
    }

    private GetRole(usr: MafiaUser) {
        return this._roles.filter(item => item.RoleName == usr.role.RoleName)[0];
    }

    get author() {
        return this._author;
    }

    get id() {
        return this._id;
    }

    public GetAliveUsers(): MafiaUser[] {
        return this.Players.filter((player) => player.isKilled == false);
    }
    public GetPeacefulUsers(): MafiaUser[] {
        return this.Players.filter((player) => player.role.ActionOnSelect != "kill" );
    }

    public static GenerateId(): number {
        return Math.round(Math.random() * 10000);
    }

    public RegisterWins(wins: BaseCondition[]): BaseCondition[] {
        let validetadWins: BaseCondition[] = []
        for (let winCon of wins) {
            if (typeof ScriptEngine.WinningEngine(winCon.Condition, this.Players) === "boolean") {
                validetadWins.push(winCon);
            }

        }
        this._winCond = validetadWins;
        return validetadWins;
    }

    public async GenerateUsers(users: string[], roles: BaseRole[]): Promise<BaseRole[]> {
        let players: MafiaUser[] = [];
        users = shuffle(users);
        users = shuffle(users);
        users = shuffle(users);
        const totalUsers = users.length;
        let totalRoleCount = 0;
        for (let i = 0; i < roles.length; i++) {
            if (users.length >= roles[i].SpawnFrom) {
                if (typeof roles[i].Count == "string") {
                    roles[i].Count = ScriptEngine.RoleCountCalc(roles[i].Count as string, users.length, totalRoleCount)
                    if (isNaN(roles[i].Count as number)) {
                        roles.splice(i, 1);
                        i--;
                    } else {
                        totalRoleCount += roles[i].Count as number;
                    }
                } else {
                    totalRoleCount += roles[i].Count as number;
                }
                if (totalRoleCount > totalUsers) {
                    totalRoleCount = totalUsers;
                    roles.splice(i + 1, roles.length);
                }
            } else {
                roles.splice(i, 1);
                i--;
            }

        }
        for (let role of roles) {
            for (let i = 0; i < (role.Count as number); i++) {
                const dsUser = await discordBot.users.fetch(users[0])
                const dbUser = await User.findOneBy({userid: users[0]});
                let lang: Langs;
                lang = dbUser.lang;
                const player = new MafiaUser(users[0], lang, role, dsUser, dbUser)
                players.push(player);
                users.splice(0, 1);
                if (users.length == 0)
                    break;
            }
        }
        this.Players = players;
        this._roles = roles;
        return roles;
    }
}