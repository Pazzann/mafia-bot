import ScriptEngine from "../src/Classes/ScriptEngine";
import MafiaRole from "../src/Classes/Roles/MafiaRole";
import {suite, test} from '@testdeck/mocha';
import * as _chai from 'chai';
import {expect} from 'chai';
import PeacefulRole from "../src/Classes/Roles/PeacefulRole";
import MafiaUser from "../src/Classes/MafiaUser";
import {Langs} from "../src/types/Langs";
import DoctorRole from "../src/Classes/Roles/DoctorRole";
import PoliceRole from "../src/Classes/Roles/PoliceRole";

_chai.should();
_chai.expect;


// const players = [
//     new MafiaUser("390561515054563328", Langs.EN, new MafiaRole(), null, null),
//     new MafiaUser("390561553776115713", Langs.EN, new PoliceRole(), null, null),
//     new MafiaUser("447767935805685770", Langs.EN, new DoctorRole(), null, null),
//     new MafiaUser("449187950190919680", Langs.EN, new PeacefulRole(), null, null),
//     new MafiaUser("482433523542654995", Langs.EN, new PeacefulRole(), null, null),
//     new MafiaUser("643027447058792479", Langs.EN, new MafiaRole(), null, null),
//     new MafiaUser("664706046027235348", Langs.EN, new MafiaRole(), null, null),
// ];

@suite class ScriptEngineTest {
    // @test 'Calculate Mafia Count p:10 o:5' () {
    //     expect(ScriptEngine.RoleCountCalc(new MafiaRole().Count as string, 10, 5)).to.be.equal(3);
    // }
    // @test 'Calculate Mafia Count p:20 o:16' () {
    //     expect( ScriptEngine.RoleCountCalc(new MafiaRole().Count as string, 20, 16)).to.be.equal(6);
    // }
    @test
    'Calculate Peaceful Count p:10 o:5' () {
        expect(ScriptEngine.RoleCountCalc("{pCount}-{oRolesPCount}", 10, 5)).to.be.equal(5);
    }
    @test
    'Calculate Custom Count 1 p:10 o:5'() {
        expect( ScriptEngine.RoleCountCalc("require('process').exit()", 10, 5)).to.be.NaN;
    }
    @test
    'Calculate Custom Count 2.1 p:12 o:6'() {
        expect(ScriptEngine.RoleCountCalc("{import process from 'process';process.exit();}", 12, 6)).to.be.NaN;
    }
    @test
    'Calculate Custom Count 2.2 p:12 o:6'() {
        expect( ScriptEngine.RoleCountCalc("import process from 'process';process.exit();", 12, 6)).to.be.NaN;
    }
    @test
    'Calculate Custom Count 2.3 p:12 o:6'() {
        expect( ScriptEngine.RoleCountCalc("{while (true){};return 1;}", 12, 6)).to.be.NaN;
    }
    // @test 'Description 1' () {
    //     expect(ScriptEngine.DescriptionEngine(players[0].role.GetDescription(Langs.EN), players, players[0])).to.be.equal("KILL EVERYONE AND SURVIVE! Good luck! \n Your teammates: ");
    // }
    // @test 'Description 2' () {
    //     expect(ScriptEngine.DescriptionEngine(players[1].role.GetDescription(Langs.EN), players, players[1])).to.be.equal("Your objective is to find mafia! ");
    // }
    // @test 'Description 3' () {
    //     expect(ScriptEngine.DescriptionEngine(players[2].role.GetDescription(Langs.EN), players, players[2])).to.be.equal("Your objective is to save people from death!");
    // }
    // @test 'Description 4' () {
    //     expect(ScriptEngine.DescriptionEngine("import process from 'process';process.exit();", players, players[0])).to.be.equal("NaN");
    // }
    // @test 'Description 5' () {
    //     expect(ScriptEngine.DescriptionEngine(players[3].role.GetDescription(Langs.EN), players, players[3])).to.be.equal("Your objective is to survive!");
    // }
    @test 'Match Numbers 1' () {
        expect("sdfsdf213".match(/[0-9]+/)[0]).to.be.equal("213");
    }
    @test 'Match Numbers 2' () {
        expect("sdfsdf21334".match(/[0-9]+/)[0]).to.be.equal("21334");
    }
    @test 'Match Numbers 3' () {
        expect("sdfsdf2".match(/[0-9]+/)[0]).to.be.equal("2");
    }
}



