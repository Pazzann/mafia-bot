import MafiaUser from "./MafiaUser";

const {VM} = require("vm2");


export default class ScriptBuilder {
    private _eqv: string;

    constructor(eqv: string) {
        this._eqv = eqv;
    }


    /**Validates a non-harmful environment. Returns true if the equation doesn't include forbidden words, and false otherwise.*/
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
    }

    /**Runs an equation. Returns the result if the equation is valid and no errors have happened, and NaN otherwise.*/
    public runEquation(): unknown | number{
        if (!this.validate()) {
            return NaN;
        }
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
        this._eqv = this._eqv.replaceAll("{pCount}", String(pCount));
        return this;
    }

    /**Replaces {oRolesPCount} — generated players with other roles count.*/
    public setOtherPlayerCount(oRolesPCount: number) {
        this._eqv = this._eqv.replaceAll("{oRolesPCount}", String(oRolesPCount));
        return this;
    }

    // % - string identifier by default
    public setStringIdentifier(stringIdentifier: string = "%") {
        this._eqv = this._eqv.split(stringIdentifier).join("`");
        return this;
    }

    /**Replaces {yRoleCount} — players with the owner's role count.*/
    public setYourRolePlayersCount(owner: MafiaUser, players: MafiaUser[]) {
        this._eqv = this._eqv.replaceAll("{yRoleCount}", String(players.filter(item => item.role.name == owner.role.name).length));
        return this;
    }

    /**Replaces {oPlayersTRole} — a string of other players with the owner's role of type "<player>, <player>, ..., <player>".*/
    public setOtherPlayersThatRole(owner: MafiaUser, players: MafiaUser[]) {
        if (!this._eqv.includes("{oPlayersTRole}")) {
            return this;
        }
        const playersFiltered = players.filter(item => item.role.name === owner.role.name && item.id !== owner.id);
        const oPlayersTRole = playersFiltered.reduce((p, i) => p + i.dsUser?.tag + ", ", "").slice(0, -2);
        this._eqv = this._eqv.replaceAll("{oPlayersTRole}", oPlayersTRole);
        return this;
    }

    /**Replaces {aPlayersTRole} — a string of all players with the owner's role (including the owner) of type "<player>, <player>, ..., <player>".*/
    public setAllPlayersThatRole(owner: MafiaUser, players: MafiaUser[]) {
        if (!this._eqv.includes("{aPlayersTRole}")) {
            return this;
        }
        const playersFiltered = players.filter(item => item.role.name === owner.role.name);
        const aPlayersTRole = playersFiltered.reduce((p, i) => p + i.dsUser?.tag + ", ", "").slice(0, -2);
        this._eqv = this._eqv.replaceAll("{aPlayersTRole}", aPlayersTRole);
        return this;
    }

    /**Replaces {oPlayersAllRoles} — a string of all players with their roles of type "<player> — <role>\n<player> — <role>\n...\n<player> — <role>".*/
    public setAllPlayersAllRoles(players: MafiaUser[]) {
        if (!this._eqv.includes("{oPlayersAllRoles}")) {
            return this;
        }
        const oPlayersAllRoles: string = players.reduce((p, i) => p + i.dsUser?.tag + " — " + i.role.name + "\n", "").slice(0, -1);
        this._eqv = this._eqv.replaceAll("{oPlayersAllRoles}", oPlayersAllRoles);
        return this;
    }

    /**Replaces {aPlayerCount} — live players count.*/
    public setAlivePlayers(players: MafiaUser[]) {
        this._eqv = this._eqv.replaceAll("{aPlayerCount}", String(players.filter((item) => item.isKilled === false).length));
        return this;
    }

    /**Replaces {r:<rolename>:count} — players with <rolename> role count, e.g. mafia players count for {r:mafia:count}.*/
    public setRoleCountByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{r:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":count}");
            const roleName = subArr[0];
            const count = players.filter(item => item.role.name === roleName).length;
            arr[i] = count + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }

    /**Replaces {sr:<rolename>:string} — a string of players with <rolename> role of type "<player>, <player>, ..., <player>", e.g. a string of mafia players for {sr:mafia:string}.*/
    public setRoleStringByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{sr:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":string}");
            const roleName = subArr[0];
            const playersFiltered = players.filter(item => item.role.name === roleName);
            const str = playersFiltered.reduce((p, i) => p + i.dsUser?.tag + ", ", "").slice(0, -2);
            arr[i] = str + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }


    /**Replaces {a:<actionname>:count} — players with <actionname> action count, e.g. players with kill action count for {a:kill:count}.*/
    public setActionCountByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{a:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":count}");
            const actionName = subArr[0];
            const count = players.filter(item => item.role.ActionOnSelect === actionName).length;
            arr[i] = count + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }

    /**Replaces {sa:<actionname>:string} — a string of players with <actionname> action of type "<player>, <player>, ..., <player>", e.g. a string of players with kill action for {sa:kill:string}.*/
    public setActionStringByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{sa:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":string}");
            const actionName = subArr[0];
            const playersFiltered = players.filter(item => item.role.ActionOnSelect === actionName);
            const str = playersFiltered.reduce((p, i) => p + i.dsUser?.tag + ", ", "").slice(0, -2);
            arr[i] = str + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }

    /**Replaces {aa:<actionname>:count} — live players with <actionname> action count, e.g. live players with kill action count for {aa:kill:count}.*/
    public setAliveActionCountByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{aa:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":count}");
            const actionName = subArr[0];
            const count = players.filter(item => item.role.ActionOnSelect === actionName && item.isKilled === false).length;
            arr[i] = count + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }

    /**Replaces {saa:<actionname>:string} — a string of live players with <actionname> action of type "<player>, <player>, ..., <player>", e.g. a string of live players with kill action for {saa:kill:string}.*/
    public setAliveActionStringByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{saa:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":string}");
            const actionName = subArr[0];
            const playersFiltered = players.filter(item => item.role.ActionOnSelect === actionName && item.isKilled === false);
            const str = playersFiltered.reduce((p, i) => p + i.dsUser?.tag + ", ", "").slice(0, -2);
            arr[i] = str + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }


    /**Replaces {ar:<rolename>:count} — live players with <rolename> role count, e.g. live mafia players count for {ar:mafia:count}.*/
    public setAliveRoleCountByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{ar:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":count}");
            const roleName = subArr[0];
            const count = players.filter(item => item.role.name === roleName && item.isKilled === false).length;
            arr[i] = count + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }

    /**Replaces {sar:<rolename>:string} — a string of live players with <rolename> role of type "<player>, <player>, ..., <player>", e.g. a string of live mafia players for {sar:mafia:string}.*/
    public setAliveRoleStringByName(players: MafiaUser[]) {
        const arr = this._eqv.split("{sar:");
        for (let i = 1; i < arr.length; i++) {
            const subArr = arr[i].split(":string}");
            const roleName = subArr[0];
            const playersFiltered = players.filter(item => item.role.name === roleName && item.isKilled === false);
            const str = playersFiltered.reduce((p, i) => p + i.dsUser?.tag + ", ", "").slice(0, -2);
            arr[i] = str + subArr[1];
        }
        this._eqv = arr.join("");
        return this;
    }
}