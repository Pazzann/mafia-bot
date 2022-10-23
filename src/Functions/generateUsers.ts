import IUserProps from "../types/interfaces/IUser";
import {discordBot, ILocalProps, localisations} from "../index";
import {IRolesProps} from "../types/interfaces/IRoles";
import User from "../Entities/User";
import {ILangProps} from "../types/interfaces/ILang";

export default async function generateUsers(users: string[]): Promise<IUserProps[]> {
    const startLength = users.length;
    const mafia: string[] = [];
    const mafiaCountFor = Math.floor(users.length / 3)
    let usersArr: IUserProps[] = [];
    for (let i = 0; i < mafiaCountFor; i++) {
        mafia.push(users[Math.floor(Math.random() * users.length)]);
        users.splice(users.indexOf(mafia[i]), 1);
    }
    for (let mafId of mafia) {
        const mafiaUser = await discordBot.users.fetch(mafId)
        const dbUser = await User.findOneBy({userid: mafId});
        let locale: ILangProps;
        if(!dbUser)
            locale = localisations.EN;
        else{
            locale = localisations[dbUser.lang.toUpperCase() as keyof ILocalProps]
        }

        usersArr.push({
            userTag: mafiaUser.tag,
            userid: mafId,
            role: IRolesProps.MAFIA,
            isKilled: false,
            local: locale,
            lang: dbUser.lang
        })
    }

    if (startLength > 7) {
        let killer = users[Math.floor(Math.random() * users.length)];
        users.splice(users.indexOf(killer), 1);
        const killerUser = await discordBot.users.fetch(killer);
        const dbUser = await User.findOneBy({userid: killer});
        let locale: ILangProps;
        if(!dbUser)
            locale = localisations.EN;
        else{
            locale = localisations[dbUser.lang.toUpperCase() as keyof ILocalProps]
        }
        usersArr.push({
            userTag: killerUser.tag,
            userid: killer,
            role: IRolesProps.KILLER,
            isKilled: false,
            local: locale,
            lang: dbUser.lang
        });
    }
    let doctor = users[Math.floor(Math.random() * users.length)];
    users.splice(users.indexOf(doctor), 1);
    const doctorUser = await discordBot.users.fetch(doctor);
    const dbUser = await User.findOneBy({userid: doctor});
    let locale: ILangProps;
    if(!dbUser)
        locale = localisations.EN;
    else{
        locale = localisations[dbUser.lang.toUpperCase() as keyof ILocalProps]
    }
    usersArr.push({
        userTag: doctorUser.tag,
        userid: doctor,
        role: IRolesProps.DOCTOR,
        isKilled: false,
        local: locale,
        lang: dbUser.lang
    });

    let police = users[Math.floor(Math.random() * users.length)];
    users.splice(users.indexOf(police), 1);
    const policeUser = await discordBot.users.fetch(police)
    const dbUser2 = await User.findOneBy({userid: police});
    let locale2: ILangProps;
    if(!dbUser2)
        locale2 = localisations.EN;
    else{
        locale2 = localisations[dbUser2.lang.toUpperCase() as keyof ILocalProps]
    }
    usersArr.push({
        userTag: policeUser.tag,
        userid: police,
        role: IRolesProps.POLICE,
        isKilled: false,
        local: locale2,
        lang: dbUser2.lang
    });

    for (let i = 0; i < users.length; i++) {
        const user = await discordBot.users.fetch(users[i]);
        const dbUser = await User.findOneBy({userid: users[i]});
        let locale: ILangProps;
        if(!dbUser)
            locale = localisations.EN;
        else{
            locale = localisations[dbUser.lang.toUpperCase() as keyof ILocalProps]
        }
        usersArr.push({
            userTag: user.tag,
            userid: users[i],
            role: IRolesProps.INNOCENT,
            isKilled: false,
            local: locale,
            lang: dbUser.lang
        })
    }
    return usersArr;
}