import MafiaUser from "./MafiaUser";

export default class ScriptEngine {


    private _eqv: string;
    constructor(eqv: string) {
        this._eqv = eqv;
    }


    //validates a non harmful environment
    public validate(eqv: string): boolean {
        if (eqv.includes('require'))
            return false;
        if (eqv.includes("import"))
            return false;
        if (eqv.includes("process"))
            return false;
        return true;

    }


    //runs equation
    public runEquation(): unknown | number {
        if (!this.validate(this._eqv))
            return NaN;
        try {
            let func = new Function("return (()=>" + this._eqv + ")()");
            let res = func();
            return res;
        } catch (err) {
            return NaN;
        }
    }


    //{pCount} - total count of players
    public setPlayerCount(pCount: number) {
        this._eqv = this._eqv.replace("{pCount}", String(pCount));
        return this;
    }

    //{oRolesPCount} - other roles that had been generated
    public setOtherPlayerCount(oRolesPCount: number) {
        this._eqv = this._eqv.replace("{oRolesPCount}", String(oRolesPCount));
        return this;
    }
    // % - string identifier by default
    public setStringIdentifier(stringIdentifier: string = "%") {
        this._eqv = this._eqv.split(stringIdentifier).join("`");
        return this;
    }
    //{yRoleCount} - total count of your role players
    public setYourRolePlayersCount(owner: MafiaUser, players: MafiaUser[]){
        this._eqv = this._eqv.replace("{yRoleCount}", String(players.filter(item => item.role.RoleName == owner.role.RoleName).length));
        return this;
    }

    //{oPlayersTRole} - other people of his role in format {player}, {player}...
    public setOtherPlayersThatRole(owner: MafiaUser, players: MafiaUser[]){
        if (this._eqv.includes("{aPlayersTRole}")) {
            let aPlayers = "";
            players.filter(item => item.role.RoleName == owner.role.RoleName).map(item => {
                aPlayers += item.dsUser?.tag + ", ";
            })
            if (players.filter(item => item.role.RoleName == owner.role.RoleName).length > 0) {
                aPlayers = aPlayers.slice(0, aPlayers.length - 3);
            }
            this._eqv = this._eqv.replace("{aPlayersTRole}", aPlayers);
        }
        return this;
    }
    //{aPlayersTRole} - all people of his role in format {player}, {player}...
    public setAllPlayersThatRole(owner:MafiaUser, players: MafiaUser[]){
        if (this._eqv.includes("{oPlayersTRole}")) {
            let aPlayers = "";
            players.filter(item => item.role.RoleName == owner.role.RoleName && item.id != owner.id).map(item => {
                aPlayers += item.dsUser?.tag + ", ";
            })
            if (players.filter(item => item.role.RoleName == owner.role.RoleName && item.id != owner.id).length > 0) {
                aPlayers = aPlayers.slice(0, aPlayers.length - 3);
            }
            this._eqv = this._eqv.replace("{oPlayersTRole}", aPlayers);
        }
        return this;
    }

    //{oPlayersAllRoles} - all people roles in format {player} - {role}, \n
    public setAllPlayersAllRoles(owner: MafiaUser, players: MafiaUser[]){
        if (this._eqv.includes("{oPlayersAllRoles}")) {
            let aPlayers = "";
            players.map(item => {
                aPlayers += item.dsUser?.tag + " - " + item.role.RoleName + " \n";
            })
            this._eqv = this._eqv.replace("{oPlayersAllRoles}", aPlayers);
        }
        return this;
    }

    //{aPlayerCount} - total alive players
    public setAlivePlayers(players: MafiaUser[]){
        this._eqv = this._eqv.replace("{aPlayerCount}", String(players.filter((item) => item.isKilled === false).length));
        return this;
    }

    //{r:<rolename>:count} - count of one role people e.g. {r:mafia:count}
    public setRoleCountByName(players: MafiaUser[]){
        let arr = this._eqv.split('{r:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':count}')[0].replace("<", "").replace(">", "");
                const count = players.filter(item => item.role.RoleName == name).length;
                arr[i] = count + arr[i].split(':count}')[1];

            }
        }
        this._eqv = arr.join('');
        return this;
    }

    //{a:<actionname>:count} - count of people with action e.g. {a:kill:count}
    public setActionCountByName(players: MafiaUser[]){
        let arr = this._eqv.split('{a:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':count}')[0].replace("<", "").replace(">", "");
                const count = players.filter(item => item.role.ActionOnSelect == name).length;
                arr[i] = count + arr[i].split(':count}')[1]

            }
        }
        this._eqv = arr.join('');
        return this;
    }

    //{aa:<actionname>:count} - count of alive people with action e.g. {aa:kill:count}
    public setAliveActionCountByName(players: MafiaUser[]){
        let arr = this._eqv.split('{aa:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':count}')[0].replace("<", "").replace(">", "");
                const count = players.filter(item => item.role.ActionOnSelect == name && item.isKilled == false).length;
                arr[i] = count + arr[i].split(':count}')[1];


            }
        }
        this._eqv = arr.join('');
        return this;
    }

    //{ar:<rolename>:count} - count of one role alive people e.g. {ar:mafia:count}
    public setAliveRoleCountByName(players: MafiaUser[]){
        let arr = this._eqv.split('{ar:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':count}')[0].replace("<", "").replace(">", "");
                const count = players.filter(item => item.role.RoleName == name && item.isKilled == false).length;
                arr[i] = count + arr[i].split(':count}')[1];

            }
        }
        this._eqv = arr.join('');
        return this;
    }

    //{pCount}
    //{oRolesPCount}
    public static RoleCountCalc(eqv: string, pCount: number, oRolesPCount: number) : number {
        return new ScriptEngine(eqv)
            .setPlayerCount(pCount)
            .setOtherPlayerCount(oRolesPCount)
            .runEquation() as number;
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
        return new ScriptEngine(eqv)
            .setStringIdentifier()
            .setPlayerCount(players.length)
            .setYourRolePlayersCount(owner, players)
            .setOtherPlayersThatRole(owner, players)
            .setAllPlayersThatRole(owner, players)
            .setAllPlayersAllRoles(owner, players)
            .setRoleCountByName(players)
            .setActionCountByName(players)
            .runEquation() as string | number;
    }



    //{pCount}
    //{aPlayerCount}
    //{r:<rolename>:count}
    //{a:<actionname>:count}
    //{aa:<actionname>:count}
    //{ar:<rolename>:count}
    public static WinningEngine(eqv: string, players: MafiaUser[]): boolean | number {
        return new ScriptEngine(eqv)
            .setPlayerCount(players.length)
            .setAlivePlayers(players)
            .setRoleCountByName(players)
            .setActionCountByName(players)
            .setAliveActionCountByName(players)
            .setAliveRoleCountByName(players)
            .runEquation() as boolean | number;
    }
}