import MafiaUser from "./MafiaUser";
import {curHandlingGames, curHostGames, discordBot} from "../index";
import User from "../Entities/User.entity";
import BaseRole from "./Roles/BaseRole";
import shuffle from "../Functions/shuffle";
import ScriptFactory from "./ScriptFactory";
import BaseCondition from "./WinningConditions/BaseCondition";
import {
    ActionRowBuilder,
    EmbedBuilder,
    StringSelectMenuBuilder,
    SelectMenuComponent,
    SelectMenuInteraction
} from "discord.js";
import MafiaEmbedFactory from "./MafiaEmbedFactory";
import PeacefulRole from "./Roles/PeacefulRole";
import Game from "../Entities/Game.entity";


export default class MafiaGame {
    public players: MafiaUser[];
    private readonly _id: number;
    private readonly _author: string;
    private readonly _voteSelect: boolean;
    private readonly _guildId: string;
    private _roles: BaseRole[];
    private _winCond: BaseCondition[];
    private _day: number = 1;
    private _stage: "choosing" | "discussion" = "choosing";
    private _finished: boolean = false;

    constructor(id: number, author: string, voteSelect: boolean, guildId: string) {
        this._id = id;
        this._author = author;
        this._voteSelect = voteSelect;
        this._guildId = guildId;
    }

    public async CheckEndGame(): Promise<boolean> {
        for (let condition of this._winCond) {
            if (ScriptFactory.WinningEngine(condition.Condition, this.players)) {
                const game = await Game.create({
                    id: this._id,
                    guildId: this._guildId,
                    players: this.players.reduce((users: User[], i) => {
                        users.push(i.dbUser);
                        return users;
                    }, []) as User[],
                    winners: []
                });
                if (condition.WinRole == "innocent") {
                    this.GetPeacefulUsers().map(item => {
                        item.dbUser.totalWins++;
                        game.winners.push(item.dbUser);
                    });
                } else {
                    this.players.filter(item => item.role.name == condition.WinRole).map(item => {
                        item.dbUser.totalWins++;
                        game.winners.push(item.dbUser);
                    });
                }

                this.players.map(item => {
                    item.dbUser.totalGames++;
                    item.dbUser.save();
                    item.dsUser.dmChannel.send({
                        embeds: [condition.GetEmbed(item.lang, this.players)]
                    });
                });
                game.save();
                return true;
            }
        }
        return false;
    }


    public async EndChooseMoveHandler() {
        if (this.GetActionAliveUser().filter((item) =>
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
                if (arrChoose.length === 0) {
                    item.clearSelection();
                    return;
                }
                if (item.GroupDecision) {
                    let SelectedUser: MafiaUser = arrChoose.sort((a, b) => b.times - a.times)[0]?.user;
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
                } else {
                    arrChoose.map(selection => {
                        switch (item.ActionOnSelect) {
                            case "kill": {
                                selection.user.actionsOnUser.kill = true;
                                break;
                            }
                            case "heal": {
                                selection.user.actionsOnUser.heal = true;
                                break;
                            }
                            case "alibi": {
                                selection.user.actionsOnUser.alibi = true;
                                break;
                            }
                        }
                    });
                }

                item.clearSelection();
            });

            let tags: string[] = [];
            this.getAliveUsers().map(item => {
                if (item.actionsOnUser.kill && !item.actionsOnUser.heal) {
                    tags.push(item.dsUser.tag);
                    item.isKilled = true;
                }
            });


            this.players.map(item => {
                let killEmbed = (tags.length == 0) ? MafiaEmbedFactory.nokills(item.local) : MafiaEmbedFactory.kills(tags, item.local);
                item.dsUser.dmChannel.send({
                    embeds: [MafiaEmbedFactory.wakeUp(item.local), killEmbed],
                });
            });
            if (await this.CheckEndGame()) {
                this._finished = true;

                curHandlingGames.delete(this._id);
                return;
            }
            this.getAliveUsers().map(item => {
                item.dsUser.dmChannel.send({
                    components: [item.role.GetVoteRow(this.getAliveUsers(), false, item.local)]
                });
            });
            this._stage = "discussion";
        }
    }

    public async EndVoteMoveHandler() {
        if (this.getAliveUsers().length == this.GetVotedLength()) {

            let votedForUsers: Array<{ userid: string; numbersOfVotes: number; }> = [];
            this.getAliveUsers().map(item => {
                votedForUsers.push({userid: item.id, numbersOfVotes: item.actionsOnUser.voted});
            })
            votedForUsers.sort((a, b) => b.numbersOfVotes - a.numbersOfVotes);

            this.players.map(item => {
                const voteEmded = new EmbedBuilder();
                voteEmded.setColor(0xa4fd8a);
                voteEmded.setTitle(item.local.role_vote_results_title)
                let votes: string = "";
                for (let value of votedForUsers) {
                    votes += this.GetUser(value.userid).dsUser.tag + ": " + value.numbersOfVotes + "\n"
                }

                voteEmded.setDescription(votes);
                item.dsUser.dmChannel.send({embeds: [voteEmded]});
            });
            if (votedForUsers[0].numbersOfVotes == votedForUsers[1].numbersOfVotes) {
                this.players.map(item => {
                    item.dsUser.dmChannel.send(item.local.role_vote_results_tie);
                });
            } else {
                this.players.map(item => {
                    item.dsUser.dmChannel.send(item.local.role_vote_results_ban1 + this.GetUser(votedForUsers[0].userid).dsUser.tag + item.local.role_vote_results_ban2);
                });
                this.GetUser(votedForUsers[0].userid).isKilled = true;
            }
            if (await this.CheckEndGame()) {
                this._finished = true;
                curHandlingGames.delete(this._id);
                return;
            }

            this._stage = "choosing";
            this._day++;


            this.players.map(item => {
                item.dsUser.dmChannel.send({
                    embeds: [MafiaEmbedFactory.sleepTime(item.local)],
                });
                item.clearActions();
            })
            this.GetActionAliveUser().map(item => {
                let row = item.role.getNightVoteRow(this.getAliveUsers(), item);
                if (row) {
                    item.dsUser.dmChannel.send({
                        components: [row]
                    });
                }
            });
            this.EndChooseMoveHandler();
        }
    }

    public async Choose(who: MafiaUser, whom: string, interaction: SelectMenuInteraction) {
        if (!this.HasPlayer(whom))
            return interaction.reply(who.local.role_select_error_notFound).catch();
        let whomU = this.GetUser(whom);
        if (!this._validateSelection(who, whomU))
            return interaction.reply(who.local.role_select_error_invalidSelection).catch();
        const row = new StringSelectMenuBuilder((interaction.component as SelectMenuComponent).data).setDisabled(true);
        interaction.message.edit({components: [new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(row)]}).catch();
        switch (this._stage) {
            case "choosing": {
                const role = this.GetRole(who);
                switch (who.role.ActionOnSelect) {
                    case "check": {
                        interaction.reply(whomU.role.name == "mafia" ? who.local.role_check_reply_mafia1 + whomU.dsUser.tag + who.local.role_check_reply_mafia2 : who.local.role_check_reply_notMafia1 + whomU.dsUser.tag + who.local.role_check_reply_notMafia2).catch();
                        who.actionsOnUser.hasDoneAction = true;
                        break;
                    }
                    case "full_check": {
                        interaction.reply(who.local.role_fullCheck_reply1 + whomU.dsUser.tag + who.local.role_fullCheck_reply2 + whomU.role.name + who.local.role_fullCheck_reply3).catch();
                        who.actionsOnUser.hasDoneAction = true;
                        break;
                    }
                    case "no_activity": {
                        interaction.reply(who.local.role_select_error_noActivity).catch();
                        break;
                    }
                    default: {
                        role.Selection.push(whomU);
                        interaction.reply(who.local.role_select_success_message1 + whomU.dsUser.tag + who.local.role_select_success_message2).catch();
                        who.actionsOnUser.hasDoneAction = true;
                        break;
                    }
                }

                await this.EndChooseMoveHandler();
                return;
            }
            case "discussion": {
                whomU.actionsOnUser.voted++;
                who.actionsOnUser.hasVoted = true;
                interaction.reply(who.local.role_vote_select_success_message1 + whomU.dsUser.tag + who.local.role_vote_select_success_message2).catch();
                this.SendToAll(this.GetVotedLength() + "/" + this.getAliveUsers().length + (this._voteSelect ? "\n" + who.dsUser.tag + " - " + whomU.dsUser.tag : ""));
                await this.EndVoteMoveHandler();
                return;
            }
        }
        return true;
    }

    public GetVotedLength() {
        return this.players.filter(item => item.actionsOnUser.hasVoted == true).length;
    }

    public SendToAll(msg: string = " ", embeds: EmbedBuilder[] = []) {
        this.players.map(item => {
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
        if (this._day % who.role.DelayForActivity !== 0 && this._stage === "choosing")
            return false;
        if (!who.role.SelfSelectable && whom.id === who.id && this._stage === "choosing")
            return false;
        if (who.actionsOnUser.hasVoted == true && this._stage === "discussion")
            return false;
        return true;
    }

    public GetUser(id: string): MafiaUser {
        return this.players.filter((p) => p.id === id)[0];
    }

    public HasPlayer(id: string): boolean {
        return this.players.filter((player) => player.id === id).length > 0;
    }

    private GetRole(usr: MafiaUser) {
        return this._roles.filter(item => item.name == usr.role.name)[0];
    }

    get author() {
        return this._author;
    }

    get id() {
        return this._id;
    }

    public GetActionAliveUser(): MafiaUser[] {
        return this.getAliveUsers().filter(item => this._day % item.role.DelayForActivity === 0);
    }

    public getAliveUsers(): MafiaUser[] {
        return this.players.filter((player) => player.isKilled === false);
    }

    public GetPeacefulUsers(): MafiaUser[] {
        return this.players.filter((player) => player.role.ActionOnSelect !== "kill");
    }

    public static GenerateId(): number {
        let id = Math.round(Math.random() * 10000);
        if (curHostGames.has(id) || curHandlingGames.has(id) || id < 1000) {
            return MafiaGame.GenerateId();
        } else {
            return id;
        }
    }

    public async registerConditions(conditions: BaseCondition[]): Promise<BaseCondition[]> {
        conditions = conditions.filter(item => typeof ScriptFactory.WinningEngine(item.Condition, this.players) === "boolean");
        this._winCond = conditions;
        return conditions;
    }

    public async generatePlayers(users: string[], roles: BaseRole[]): Promise<BaseRole[]> {
        const totalUsers = users.length;
        users = shuffle(users);
        users = shuffle(users);
        users = shuffle(users);

        roles = roles.filter(item => totalUsers >= item.SpawnFrom);
        if (roles.filter(item => typeof item.Count === "string" && item.Count.includes("{oRolesPCount}")).length > 0) {
            const arr = roles.filter(item => typeof item.Count === "string" && item.Count.includes("{oRolesPCount}"));
            roles = roles.filter(item => !(typeof item.Count === "string" && item.Count.includes("{oRolesPCount}")));
            roles.push(arr[0]);
        }
        roles.push(new PeacefulRole());
        let totalRoleCount = 0;
        for (let i = 0; i < roles.length; i++) {
            if (typeof roles[i].Count === "string") {
                roles[i].Count = ScriptFactory.RoleCountCalc(roles[i].Count as string, users.length, totalRoleCount);
            }
            roles[i].Count = Math.max(roles[i].Count as number, totalUsers - totalRoleCount);
            if (!isNaN(roles[i].Count as number)) {
                totalRoleCount += roles[i].Count as number;
            }
            if (totalRoleCount >= totalUsers) {
                roles.splice(i + 1);
            }
        }
        roles = roles.filter(item => (item.Count as number) > 0 && !isNaN(item.Count as number));

        let players: MafiaUser[] = [];
        let totalRoleHandledCount = 0;
        for (let role of roles) {
            for (let i = 0; i < (role.Count as number) && totalRoleHandledCount < totalUsers; i++, totalRoleHandledCount++) {
                const dsUser = await discordBot.users.fetch(users[totalRoleHandledCount]);
                const dbUser = await User.findOne({where: {userid: users[totalRoleHandledCount]}, relations: ["games"]});
                const lang = dbUser.lang;
                const player = new MafiaUser(users[totalRoleHandledCount], dsUser, dbUser, lang, role);
                players.push(player);
            }
        }

        this.players = players;
        this._roles = roles;
        return roles;
    }
}