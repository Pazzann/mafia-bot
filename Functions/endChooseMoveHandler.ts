import {Roles} from "../types/roles";
import MafiaEmbedBuilder from "../Classes/MafiaEmbedBuilder";
import getVoteRow from "./SelectRows/getVoteRow";
import {curHandlingGames, discordBot} from "../bot";
import MafiaGame from "../types/game";

export default function endChooseMoveHandler(game: MafiaGame) {
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
    if (game.users[targetIndex].userid !== game.votedToCheck.doctor) {
        game.users[targetIndex].isKilled = true;
        const alive = game.users.filter(item => item.isKilled === false);
        if (alive.length < alive.filter(item => item.role == Roles.MAFIA).length * 2 + 1) {
            game.users.map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send({embeds: [MafiaEmbedBuilder.mafiaWin(game.users.filter(item => item.role === Roles.MAFIA)[0].userTag)]});
                    curHandlingGames.delete(game.id);
                    return;
                });
            });
        } else {
            game.users.map(item => {
                discordBot.users.fetch(item.userid).then(async user => {
                    const dm = user?.dmChannel ?? await user.createDM();
                    dm.send(`Мафия убила ${game.users[targetIndex].userTag}`);
                });
            });
        }
    } else {
        game.users.map(item => {
            discordBot.users.fetch(item.userid).then(async user => {
                const dm = user?.dmChannel ?? await user.createDM();
                dm.send(`Мафия не убила никого`);
            });
        });
    }

    game.stage = 'discussion'
    game.users.map(item => {
        discordBot.users.fetch(item.userid).then(async user => {
            const dm = user?.dmChannel ?? await user.createDM();
            dm.send({
                components: [getVoteRow(game.users)]
            });
        });
    });

    return game;
}