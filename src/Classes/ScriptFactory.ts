import MafiaUser from "./MafiaUser";
import ScriptBuilder from "./ScriptBuilder";

export default class ScriptFactory {
    //{pCount}
    //{oRolesPCount}
    public static RoleCountCalc(eqv: string, pCount: number, oRolesPCount: number): number {
        const res = new ScriptBuilder(eqv)
            .setPlayerCount(pCount)
            .setOtherPlayerCount(oRolesPCount)
            .runEquation();
        return (typeof res == "number" ? res : NaN);
    }

    // %
    //{pCount}
    //{yRoleCount}
    //{oPlayersTRole}
    //{aPlayersTRole}
    //{oPlayersAllRoles}
    //{r:<rolename>:count}
    //{a:<actionname>:count}
    public static DescriptionEngine(eqv: string, players: MafiaUser[], owner: MafiaUser): string | number {
        return new ScriptBuilder(eqv)
            .setStringIdentifier()
            .setPlayerCount(players.length)
            .setYourRolePlayersCount(owner, players)
            .setOtherPlayersThatRole(owner, players)
            .setAllPlayersThatRole(owner, players)
            .setAllPlayersAllRoles(players)
            .setRoleCountByName(players)
            .setActionCountByName(players)
            .runEquation() as string | number;
    }

    // %
    //{pCount}
    //{aPlayerCount}
    //{oPlayersAllRoles}
    //{sr:<rolename>:string}
    //{sa:<actionname>:string}
    //{saa:<actionname>:string}
    //{sar:<rolename>:string}
    //{r:<rolename>:count}
    //{a:<actionname>:count}
    //{aa:<actionname>:count}
    //{ar:<rolename>:count}
    public static ConditionEmbedDescription(eqv: string, players: MafiaUser[]): string | number {
        return new ScriptBuilder(eqv)
            .setStringIdentifier()
            .setPlayerCount(players.length)
            .setAlivePlayers(players)
            .setAllPlayersAllRoles(players)
            .setRoleStringByName(players)
            .setActionStringByName(players)
            .setAliveActionStringByName(players)
            .setAliveRoleStringByName(players)
            .setRoleCountByName(players)
            .setActionCountByName(players)
            .setAliveActionCountByName(players)
            .setAliveRoleCountByName(players)
            .runEquation() as string | number;
    }

    //{pCount}
    //{aPlayerCount}
    //{r:<rolename>:count}
    //{a:<actionname>:count}
    //{aa:<actionname>:count}
    //{ar:<rolename>:count}
    public static WinningEngine(eqv: string, players: MafiaUser[]): boolean | number {
        const res = new ScriptBuilder(eqv)
            .setPlayerCount(players.length)
            .setAlivePlayers(players)
            .setRoleCountByName(players)
            .setActionCountByName(players)
            .setAliveActionCountByName(players)
            .setAliveRoleCountByName(players)
            .runEquation();
        return (typeof res == "boolean" ? res : NaN);
    }
}