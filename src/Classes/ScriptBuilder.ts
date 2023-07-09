import MafiaUser from "./MafiaUser";

const {VM} = require("vm2");


export default class ScriptBuilder {
    private _eqv: string;

    constructor(eqv: string) {
        this._eqv = eqv;
    }


/*    /!**Validates a non-harmful environment. Returns true if the equation doesn't include forbidden words, and false otherwise.*!/
    public validate(): boolean {
        return !this._eqv.includes("require") &&
            !this._eqv.includes("import") &&
            !this._eqv.includes("process") &&
            !this._eqv.includes("eval") &&
            !this._eqv.includes("Function") &&
            !this._eqv.includes("async") &&
            !this._eqv.includes("await") &&
            !this._eqv.includes("vm") &&
            !this._eqv.includes("new");
    }*/

    /**Runs an equation. Returns the result if the equation is valid and no errors have happened, and NaN otherwise.*/
    public runEquation(): number | string | boolean {
        /*if (!this.validate())
            return NaN;*/
        try {
            const vm = new VM({
                timeout: 100,
                allowAsync: false,
                sandbox: {}
            });
            const result = vm.run("(()=>" + this._eqv + ")()");
            return (typeof result === "number" || typeof result === "string" || typeof result === "boolean" ? result : NaN);
        } catch (err) {
            return NaN;
        }
    }


    /**Replaces {pCount} — total player count.*/
    public setPlayerCount(pCount: number) {
        this._eqv = this._eqv.replace("{pCount}", String(pCount));
        return this;
    }

    //{oRolesPCount} - count of players with other roles that had been generated
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
            let fPlayers = players.filter(item => item.role.RoleName == owner.role.RoleName);
            let aPlayers: string = fPlayers.reduce((p, i) => p + i.dsUser?.tag + ", ", "");
            if (fPlayers.length > 0)
                aPlayers = aPlayers.slice(0, aPlayers.length - 3);
            this._eqv = this._eqv.replace("{aPlayersTRole}", aPlayers);
        }
        return this;
    }

    //{aPlayersTRole} - all people of his role in format {player}, {player}...
    public setAllPlayersThatRole(owner: MafiaUser, players: MafiaUser[]) {
        if (this._eqv.includes("{oPlayersTRole}")) {
            let fPlayers = players.filter(item => item.role.RoleName == owner.role.RoleName && item.id != owner.id);
            let aPlayers: string = fPlayers.reduce((p, i) => p + i.dsUser?.tag + ", ", "");
            if (fPlayers.length > 0)
                aPlayers = aPlayers.slice(0, aPlayers.length - 3);
            this._eqv = this._eqv.replace("{oPlayersTRole}", aPlayers);
        }
        return this;
    }

    //{oPlayersAllRoles} - all people roles in format {player} — {role}, \n
    public setAllPlayersAllRoles(players: MafiaUser[]) {
        if (this._eqv.includes("{oPlayersAllRoles}")) {
            let aPlayers: string = players.reduce((p, i) => p + i.dsUser?.tag + " — " + i.role.RoleName + " \n", "");
            this._eqv = this._eqv.replace("{oPlayersAllRoles}", aPlayers);
        }
        return this;
    }

    /**Replaces {aPlayerCount} — alive players count.*/
    public setAlivePlayers(players: MafiaUser[]) {
        this._eqv = this._eqv.replace("{aPlayerCount}", String(players.filter((item) => item.isKilled === false).length));
        return this;
    }

    /**Replaces {r:<rolename>:count} — players with <rolename> role count, e.g. mafia players count for {r:mafia:count}.*/
    public setRoleCountByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{r:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":count}");
            const roleName = subArr[0].replace("<", "").replace(">", "");
            const count = players.filter(item => item.role.RoleName === roleName).length;
            arr[i] = count + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }

    //{sr:<rolename>:string} - string of one role people e.g. {sr:mafia:string} - {player}, {player}...
    public setRoleStringByName(players: MafiaUser[]) {
        let arr = this._eqv.split('{sr:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':string}')[0].replace("<", "").replace(">", "");
                const playersNames = players.filter(item => item.role.RoleName == name);
                let a: string = playersNames.reduce((p, i) => a + i.dsUser.tag, "");
                a = a.slice(0, a.length - 2);
                arr[i] = a + arr[i].split(':string}')[1];
            }
        }
        this._eqv = arr.join('');
        return this;
    }


    /**Replaces {a:<actionname>:count} — players with <actionname> action count, e.g. players with kill action count for {a:kill:count}.*/
    public setActionCountByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{a:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":count}");
            const actionName = subArr[0].replace("<", "").replace(">", "");
            const count = players.filter(item => item.role.ActionOnSelect === actionName).length;
            arr[i] = count + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }

    //{sa:<actionname>:string} - string of people with action e.g. {sa:kill:string} - {player}, {player}...
    public setActionStringByName(players: MafiaUser[]) {
        let arr = this._eqv.split('{sa:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':string}')[0].replace("<", "").replace(">", "");
                const playersNames = players.filter(item => item.role.ActionOnSelect == name);
                let a: string = playersNames.reduce((p, i) => a + i.dsUser.tag, "");
                a = a.slice(0, a.length - 2);
                arr[i] = a + arr[i].split(':string}')[1];
            }
        }
        this._eqv = arr.join('');
        return this;
    }

    /**Replaces {aa:<actionname>:count} — alive players with <actionname> action count, e.g. alive players with kill action count for {aa:kill:count}.*/
    public setAliveActionCountByName(players: MafiaUser[]) {
        let arr = this._eqv.split("{aa:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":count}");
            const actionName = subArr[0].replace("<", "").replace(">", "");
            const count = players.filter(item => item.role.ActionOnSelect === actionName && item.isKilled === false).length;
            arr[i] = count + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }

    //{saa:<actionname>:string} - string of one action alive people e.g. {saa:kill:string} - {player}, {player}...
    public setAliveActionStringByName(players: MafiaUser[]) {
        let arr = this._eqv.split('{saa:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':string}')[0].replace("<", "").replace(">", "");
                const playersNames = players.filter(item => item.role.ActionOnSelect == name && item.isKilled == false);
                let a: string = playersNames.reduce((p, i) => a + i.dsUser.tag, "");
                a = a.slice(0, a.length - 2);
                arr[i] = a + arr[i].split(':string}')[1];
            }
        }
        this._eqv = arr.join('');
        return this;
    }


    /**Replaces {ar:<rolename>:count} — alive players with <rolename> role count, e.g. alive mafia players count for {ar:mafia:count}.*/
    public setAliveRoleCountByName(players: MafiaUser[]) {
        let arr = this._eqv.split("{ar:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":count}");
            const roleName = subArr[0].replace("<", "").replace(">", "");
            const count = players.filter(item => item.role.RoleName === roleName && item.isKilled === false).length;
            arr[i] = count + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }

    //{sr:<rolename>:string} - string of one role alive people e.g. {sr:mafia:string} - {player}, {player}...
    public setAliveRoleStringByName(players: MafiaUser[]) {
        let arr = this._eqv.split('{sr:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':string}')[0].replace("<", "").replace(">", "");
                const playersNames = players.filter(item => item.role.RoleName == name && item.isKilled == false);
                let a: string = playersNames.reduce((p, i) => a + i.dsUser.tag, "");
                a = a.slice(0, a.length - 2);
                arr[i] = a + arr[i].split(':string}')[1];
            }
        }
        this._eqv = arr.join('');
        return this;
    }
}