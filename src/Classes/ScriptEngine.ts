import MafiaUser from "./MafiaUser";

export default class ScriptEngine {
    //validates a non harmful environment
    public static Validator(eqv: string): boolean {
        if (eqv.includes('require'))
            return false;
        if (eqv.includes("import"))
            return false;
        if (eqv.includes("process"))
            return false;
        return true;

    }

    //{pCount} - total count of players
    //{oRolesPCount} - other roles that had been generated
    public static RoleCountCalc(eqv: string, pCount: number, oRolesPCount: number) {
        eqv = eqv.replace("{pCount}", String(pCount));
        eqv = eqv.replace("{oRolesPCount}", String(oRolesPCount));
        if (!this.Validator(eqv))
            return NaN;

        try {
            let func = new Function("return (()=>" + eqv + ")()");
            let res = func();
            return Math.floor(Number(res));
        } catch (err) {
            return NaN;
        }
    }

    // % - string identifier
    //{pCount} - total player count
    //{yRoleCount} - total count of your role players
    //{oPlayersTRole} - other people of his role in format {player}, {player}...
    //{aPlayersTRole} - all people of his role in format {player}, {player}...
    //{oPlayersAllRoles} - all people roles in format {player} - {role}, \n
    public static DescriptionEngine(eqv: string, players: MafiaUser[], owner: MafiaUser): string {
        eqv = eqv.replace("{pCount}", String(players.length));
        eqv = eqv.split("%").join("`");
        eqv = eqv.replace("{yRoleCount}", String(players.filter(item => item.role.RoleName == owner.role.RoleName).length));
        if (eqv.includes("{aPlayersTRole}")) {
            let aPlayers = "";
            players.filter(item => item.role.RoleName == owner.role.RoleName).map(item => {
                aPlayers += item.dsUser?.tag + ", ";
            })
            if (players.filter(item => item.role.RoleName == owner.role.RoleName).length > 0) {
                aPlayers = aPlayers.slice(0, aPlayers.length - 3);
            }
            eqv = eqv.replace("{aPlayersTRole}", aPlayers);
        }
        if (eqv.includes("{oPlayersTRole}")) {
            let aPlayers = "";
            players.filter(item => item.role.RoleName == owner.role.RoleName && item.id != owner.id).map(item => {
                aPlayers += item.dsUser?.tag + ", ";
            })
            if (players.filter(item => item.role.RoleName == owner.role.RoleName && item.id != owner.id).length > 0) {
                aPlayers = aPlayers.slice(0, aPlayers.length - 3);
            }
            eqv = eqv.replace("{oPlayersTRole}", aPlayers);
        }

        if (eqv.includes("{oPlayersAllRoles}")) {

            let aPlayers = "";
            players.map(item => {
                aPlayers += item.dsUser?.tag + " - " + item.role.RoleName + " \n";
            })
            eqv = eqv.replace("{oPlayersAllRoles}", aPlayers);
        }


        if (!this.Validator(eqv))
            return "NaN";
        try {
            console.log(eqv);

            let func = new Function("return (()=>" + eqv + ")()");
            let res = func();
            return res;

        } catch (err) {
            console.log(err);
            return "NaN";
        }
    }

    //{aPlayerCount} - total alive players
    //{pCount} - total players count
    //{r:<rolename>:count} - count of one role people e.g. {r:mafia:count}
    //{a:<actionname>:count} - count of people with action e.g. {a:kill:count}
    //{aa:<actionname>:count} - count of alive people with action e.g. {aa:kill:count}
    //{ar:<rolename>:count} - count of one role alive people e.g. {ar:mafia:count}
    public static WinningEngine(eqv: string, players: MafiaUser[]): boolean | number {
        eqv = eqv.replace("{pCount}", String(players.length));
        eqv = eqv.replace("{aPlayerCount}", String(players.filter((item) => item.isKilled === false).length));
        let arr = eqv.split('{r:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':count}')[0].replace("<", "").replace(">", "");
                const count = players.filter(item => item.role.RoleName == name).length;
                arr[i] = count + arr[i].split(':count}')[1];

            }
        }
        eqv = arr.join('');
        arr = eqv.split('{a:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':count}')[0].replace("<", "").replace(">", "");
                const count = players.filter(item => item.role.ActionOnSelect == name).length;
                arr[i] = count + arr[i].split(':count}')[1]

            }
        }
        eqv = arr.join('');
        arr = eqv.split('{aa:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':count}')[0].replace("<", "").replace(">", "");
                const count = players.filter(item => item.role.ActionOnSelect == name && item.isKilled == false).length;
                arr[i] = count + arr[i].split(':count}')[1];


            }
        }
        eqv = arr.join('');
        arr = eqv.split('{ar:');
        for (let i = 0; i < arr.length; i++) {
            if (i !== 0) {
                const name = arr[i].split(':count}')[0].replace("<", "").replace(">", "");
                const count = players.filter(item => item.role.RoleName == name && item.isKilled == false).length;
                arr[i] = count + arr[i].split(':count}')[1];

            }
        }
        eqv = arr.join('')
        if (!this.Validator(eqv))
            return NaN;
        try {
            let func = new Function("return (()=>" + eqv + ")()");
            let res = func();
            return res;
        } catch (err) {
            return NaN;
        }
    }
}