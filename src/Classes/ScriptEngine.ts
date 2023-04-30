import MafiaUser from "./MafiaUser";
const {
    Worker, isMainThread, parentPort, workerData,
} = require('node:worker_threads');

const {VM} = require('vm2');



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
        if (eqv.includes("eval"))
            return false;
        if (eqv.includes("Function"))
            return false;
        if (eqv.includes("async"))
            return false;
        if (eqv.includes("await"))
            return false;
        return true;
    }


    //runs equation
    public runEquation(): unknown | number {
        if (!this.validate(this._eqv))
            return NaN;
        try {
            const vm = new VM({
                timeout: 100,
                allowAsync: false,
                sandbox: {}
            });
            return vm.run(" (()=>" + this._eqv + ")()");
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
    public setYourRolePlayersCount(owner: MafiaUser, players: MafiaUser[]) {
        this._eqv = this._eqv.replace("{yRoleCount}", String(players.filter(item => item.role.RoleName == owner.role.RoleName).length));
        return this;
    }

    //{oPlayersTRole} - other people of his role in format {player}, {player}...
    public setOtherPlayersThatRole(owner: MafiaUser, players: MafiaUser[]) {
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
    public setAllPlayersThatRole(owner: MafiaUser, players: MafiaUser[]) {
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

    //{oPlayersAllRoles} - all people roles in format {player} — {role}, \n
    public setAllPlayersAllRoles(players: MafiaUser[]) {
        if (this._eqv.includes("{oPlayersAllRoles}")) {
            let aPlayers = "";
            players.map(item => {
                aPlayers += item.dsUser?.tag + " — " + item.role.RoleName + " \n";
            })
            this._eqv = this._eqv.replace("{oPlayersAllRoles}", aPlayers);
        }
        return this;
    }

    //{aPlayerCount} - total alive players
    public setAlivePlayers(players: MafiaUser[]) {
        this._eqv = this._eqv.replace("{aPlayerCount}", String(players.filter((item) => item.isKilled === false).length));
        return this;
    }

    //{r:<rolename>:count} - count of one role people e.g. {r:mafia:count}
    public setRoleCountByName(players: MafiaUser[]) {
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

    //{sr:<rolename>:string} - string of one role people e.g. {sr:mafia:string} - {player}, {player}...
    public setRoleStringByName(players: MafiaUser[]) {
        let arr = this._eqv.split('{sr:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':string}')[0].replace("<", "").replace(">", "");
                const playersNames = players.filter(item => item.role.RoleName == name);
                let a = "";
                playersNames.map(item => {
                    a += item.dsUser.tag + ", ";
                })
                a = a.slice(0, a.length - 2);
                arr[i] = a + arr[i].split(':string}')[1];
            }
        }
        this._eqv = arr.join('');
        return this;
    }


    //{a:<actionname>:count} - count of people with action e.g. {a:kill:count}
    public setActionCountByName(players: MafiaUser[]) {
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
    //{sa:<actionname>:string} - string of people with action e.g. {sa:kill:string} - {player}, {player}...
    public setActionStringByName(players: MafiaUser[]) {
        let arr = this._eqv.split('{sa:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':string}')[0].replace("<", "").replace(">", "");
                const playersNames = players.filter(item => item.role.ActionOnSelect == name);
                let a = "";
                playersNames.map(item => {
                    a += item.dsUser.tag + ", ";
                })
                a = a.slice(0, a.length - 2);
                arr[i] = a + arr[i].split(':string}')[1];
            }
        }
        this._eqv = arr.join('');
        return this;
    }

    //{aa:<actionname>:count} - count of alive people with action e.g. {aa:kill:count}
    public setAliveActionCountByName(players: MafiaUser[]) {
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

    //{saa:<actionname>:string} - string of one action alive people e.g. {saa:kill:string} - {player}, {player}...
    public setAliveActionStringByName(players: MafiaUser[]) {
        let arr = this._eqv.split('{saa:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':string}')[0].replace("<", "").replace(">", "");
                const playersNames = players.filter(item => item.role.ActionOnSelect == name  && item.isKilled == false);
                let a = "";
                playersNames.map(item => {
                    a += item.dsUser.tag + ", ";
                });
                a = a.slice(0, a.length - 2);
                arr[i] = a + arr[i].split(':string}')[1];
            }
        }
        this._eqv = arr.join('');
        return this;
    }


    //{ar:<rolename>:count} - count of one role alive people e.g. {ar:mafia:count}
    public setAliveRoleCountByName(players: MafiaUser[]) {
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
    //{sar:<rolename>:string} - string of one role alive people e.g. {sar:mafia:string} - {player}, {player}...
    public setAliveRoleStringByName(players: MafiaUser[]) {
        let arr = this._eqv.split('{sr:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':string}')[0].replace("<", "").replace(">", "");
                const playersNames = players.filter(item => item.role.RoleName == name && item.isKilled == false);
                let a = "";
                playersNames.map(item => {
                    a += item.dsUser.tag + ", ";
                });
                a = a.slice(0, a.length - 2);
                arr[i] = a + arr[i].split(':string}')[1];
            }
        }
        this._eqv = arr.join('');
        return this;
    }

    //{pCount}
    //{oRolesPCount}
    public static RoleCountCalc(eqv: string, pCount: number, oRolesPCount: number): number {
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
        return new ScriptEngine(eqv)
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