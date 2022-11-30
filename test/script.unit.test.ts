import ScriptEngine from "../src/Classes/ScriptEngine";
import MafiaRole from "../src/Classes/Roles/MafiaRole";
import { suite, test } from '@testdeck/mocha';
import * as _chai from 'chai';
import { expect } from 'chai';
import PeacefulRole from "../src/Classes/Roles/PeacefulRole";
import MafiaUser from "../src/Classes/MafiaUser";

_chai.should();
_chai.expect;



@suite class ScriptEngineTest {
    @test 'Calculate Mafia Count p:10 o:5' () {
        expect(ScriptEngine.RoleCountCalc(new MafiaRole().Count as string, 10, 5)).to.be.equal(3);
    }
    @test 'Calculate Mafia Count p:20 o:16' () {
        expect(ScriptEngine.RoleCountCalc(new MafiaRole().Count as string, 20, 16)).to.be.equal(6);
    }
    @test 'Calculate Peaceful Count p:10 o:5' () {
        expect(ScriptEngine.RoleCountCalc(new PeacefulRole().Count as string, 10, 5)).to.be.equal(5);
    }
    @test 'Calculate Custom Count 1 p:10 o:5' () {
        expect(ScriptEngine.RoleCountCalc("require('process').exit()", 10, 5)).to.be.NaN;
    }
    @test 'Calculate Custom Count 2.1 p:12 o:6' () {
        expect(ScriptEngine.RoleCountCalc("{import process from 'process';process.exit();}", 12, 6)).to.be.NaN;
    }
    @test 'Calculate Custom Count 2.2 p:12 o:6' () {
        expect(ScriptEngine.RoleCountCalc("import process from 'process';process.exit();", 12, 6)).to.be.NaN;
    }
}



