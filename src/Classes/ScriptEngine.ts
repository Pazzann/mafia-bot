import MafiaUser from "./MafiaUser";

export default class ScriptEngine {
    //validates a non harmful environment
    public static Validator(eqv: string): boolean{
        if(eqv.includes('require'))
            return false;
        if(eqv.includes("import"))
            return false;
        if(eqv.includes("process"))
            return false;
        return true;

    }
    //pCount - total count of players
    //oRolesPCount - other roles that had been generated
    public static RoleCountCalc(eqv: string, pCount: number, oRolesPCount: number) {
        eqv = eqv.replace("{pCount}", String(pCount));
        eqv = eqv.replace("{oRolesPCount}", String(oRolesPCount));
        if(!this.Validator(eqv))
            return NaN;

        try{
            let func = new Function("return (()=>" + eqv+")()");
            let res = func();
            return Math.floor(Number(res));
        }catch (err){
            return NaN;
        }
    }

    //{pCount} - total player count
    //{yRoleCount} - total count of your role players
    //{oPlayersTRole} - all people of his role in format {player}, {player}...
    //{oPlayersAllRoles} - all people roles in format {player} - {role}, \n
    public static DescriptionEngine(eqv: string): string
    {
        return null;
    }

    //{aPlayerCount} - total alive players
    //{pCount} - total players count
    //{r:<rolename>:count} - count of one role people e.g. {r:mafia:count}
    //{a:<actionname>:count} - count of people with action e.g. {a:kill:count} //not realized
    //{aa:<actionname>:count} - count of alive people with action e.g. {aa:kill:count} //not realized
    //{ar:<rolename>:count} - count of one role alive people e.g. {ar:mafia:count} //not realized
    public static WinningEngine(eqv: string, players: MafiaUser[]): boolean | number{
        eqv = eqv.replace("{pCount}", String(players.length));
        eqv = eqv.replace("{aPlayerCount}", String(players.filter((item)=>item.isKilled===false)));
        let arr = eqv.split('{r:');
        arr.forEach((item, index)=>{
            if(index!==0){
                const name = item.split(':count}')[0]
                const count = String(players.filter(item=>item.role.RoleName == name)).length;
                return count + item.split(':count}')[1]
            }
        });
        eqv = arr.join('')
        if(!this.Validator(eqv))
            return NaN;
        try{
            let func = new Function("return (()=>" + eqv+")()");
            let res = func();
            return res();
        }catch (err){
            return NaN;
        }
    }
}