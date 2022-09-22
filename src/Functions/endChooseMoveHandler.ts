import {Roles} from "../types/roles";
import MafiaEmbedBuilder from "../Classes/MafiaEmbedBuilder";
import getVoteRow from "./SelectRows/getVoteRow";
import {curHandlingGames, discordBot} from "../bot";
import MafiaGame from "../types/game";

export default function endChooseMoveHandler(game: MafiaGame): MafiaGame {
    if (!(
        game.votedToCheck.mafia.length === game.users.filter(item => item.isKilled === false).filter(item => item.role == Roles.MAFIA).length &&
        (game.votedToCheck.doctor === "noDoctor" || game.votedToCheck.doctor != null) &&
        (game.votedToCheck.police === "noPolice" || game.votedToCheck.police != null) &&
        (game.votedToCheck.beautiful === "noBeautiful" || game.votedToCheck.beautiful !== null) &&
        (game.votedToCheck.mistress === "noMistress" || game.votedToCheck.mistress !== null) &&
        (game.votedToCheck.killer === "noKiller" || game.votedToCheck.killer !== null)
    ))
        return game;
    let votesCount: Array<{ id: string; numberOfVotes: number; }> = []
    game.votedToCheck.mafia.map(vote => {
        if (votesCount.filter(allvote => vote.target === allvote.id).length > 0) {
            let voteIndex: number = 0;
            votesCount.filter((curVote, index) => curVote.id == vote.target ? voteIndex = index : null);
            votesCount[voteIndex].numberOfVotes++;
        } else {
            votesCount.push({id: vote.target, numberOfVotes: 1});
        }
    })
    votesCount.sort((a, b) => b.numberOfVotes - a.numberOfVotes);
    let mafiaTarget = votesCount[0];
    let targetIndex = 0;
    game.users.filter((id, curIndex) => id.userid == mafiaTarget.id ? targetIndex = curIndex : null);
    let peopleKilled: Set<string> = new Set<string>();

    if (game.users[targetIndex].userid !== game.votedToCheck.doctor) {
        peopleKilled.add(game.users[targetIndex].userTag);
        game.users[targetIndex].isKilled = true;
    }
    if (game.users.filter(item => item.role === Roles.KILLER).length > 0) {
        if (!game.users.filter(item => item.role === Roles.KILLER)[0].isKilled) {
            let killerTarget = game.users.filter(item => item.userid === game.votedToCheck.killer)[0];
            if (killerTarget.userid !== game.votedToCheck.doctor) {
                peopleKilled.add(killerTarget.userTag);
                for (let i=0; i<game.users.length; i++){
                    if(game.users[i].userid === killerTarget.userid){
                        game.users[i].isKilled = true;
                    }
                }
            }
        }
    }

    let killed: string[] = [];
    for (let v of peopleKilled.values()){
        killed.push(v);
    }
    if (killed.length > 0) {
        const alive = game.users.filter(item => item.isKilled === false);
        if (game.users.length > 7 && game.users.filter(item => item.role === Roles.KILLER)[0]?.isKilled === false && alive.length < 3) {
            game.users.map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({embeds: [MafiaEmbedBuilder.killerWin(game.users.filter(item => item.role === Roles.KILLER)[0].userTag)]});
                });
                curHandlingGames.delete(game.id);
                game.finished = true;
                return game;
            });
        }else if (alive.filter(item => item.role == Roles.MAFIA).length === 0 && alive.filter(item => item.role == Roles.KILLER).length === 0){
            game.users.map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({embeds: [MafiaEmbedBuilder.peacefulWin()]});
                });
            });
            curHandlingGames.delete(game.id);
            game.finished = true;
            return game;
        } else if (alive.length < alive.filter(item => item.role == Roles.MAFIA).length * 2 + 1) {
            game.users.map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({embeds: [MafiaEmbedBuilder.mafiaWin(game.users.filter(item => item.role === Roles.MAFIA))]});
                });
            });
            curHandlingGames.delete(game.id);
            game.finished = true;
            return game;
        } else {
            game.users.map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({embeds: [MafiaEmbedBuilder.kills(killed)]});
                });
            });
        }
    } else {
        game.users.map(item => {
            discordBot.users.fetch(item.userid).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                dm.send({embeds: [MafiaEmbedBuilder.nokills()]});
            });
        });
    }


    game.stage = 'discussion';
    game.users.map(item => {
        discordBot.users.fetch(item.userid).then(async user => {
            const dm = user?.dmChannel ?? await user.createDM();
            dm.send({
                embeds: [MafiaEmbedBuilder.wakeUp()]
            });
        });
    });
    game.users.filter(item => item.isKilled === false).map(item => {
        discordBot.users.fetch(item.userid).then(async user => {
            const dm = user?.dmChannel ?? await user.createDM();
            dm.send({
                components: [getVoteRow(game.users)]
            });
        });
    });

    return game;
}