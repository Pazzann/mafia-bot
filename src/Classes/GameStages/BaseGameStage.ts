import {Action} from "../../types/Action";
import {Target} from "../../types/Target";
import {GameStageAction} from "../../types/GameStageAction";
import {Langs} from "../../types/Langs";
import {ILocalProps, localisations} from "../../index";
import {ILangProps} from "../../types/interfaces/ILang";

export default abstract class BaseGameStage {
    protected _name: string;
    protected _nameLocals: string | null = null;

    protected _gameStageAction: GameStageAction;
    protected _excecutorOfAction: Target;
    protected _action: Action;
    protected _targetAction: Target;

    get name(): string {
        return this._name;
    }

    public getName(lang: Langs): string {
        if (this._nameLocals === null) {
            return this._name;
        }

        if (localisations?.[lang.toUpperCase() as keyof ILocalProps]?.[this._nameLocals as keyof ILangProps]) {
            return localisations[lang.toUpperCase() as keyof ILocalProps][this._nameLocals as keyof ILangProps];
        } else {
            if (localisations.EN?.[this._nameLocals as keyof ILangProps]) {
                return localisations.EN?.[this._nameLocals as keyof ILangProps];
            } else {
                return this._name;
            }
        }
    }
}