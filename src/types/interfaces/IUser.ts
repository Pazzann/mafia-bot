import {IRolesProps} from "./IRoles";
import {ILangProps} from "./ILang";
import {Langs} from "../Langs";

export default interface IUserProps {
    userTag: string;
    userid: string;
    role: IRolesProps;
    local: ILangProps;
    lang: Langs;
    isKilled: boolean;
}