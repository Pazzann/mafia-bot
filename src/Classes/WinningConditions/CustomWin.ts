import BaseCondition from "./BaseCondition";

export default class CustomWin extends BaseCondition{
    constructor(name:string, condition: string, winEmbedTitle: string, winEmbedDescription: string, winEmbedThumbnail: string, winRole: string) {
        super();
        this._name = name;
        this.Description = "This is just a placeholder";
        this.Condition = condition;
        this._winEmbedTitle = winEmbedTitle;
        this._winEmbedDescription = winEmbedDescription;
        this.WinEmbedThumbnail = winEmbedThumbnail;
        this.WinRole = winRole;
    }
}