import BaseRole from "./BaseRole";
import {Action} from "../../types/Action";

export default class CustomRole extends BaseRole{
    constructor(name:string, action: Action, delayForActivity: number, groupDes: boolean, count: string, spawnFrom: number, placeHolder: string, imageLink: string, selfSelectable: boolean, description: string) {
        super();
        this.RoleName = name;
        this.ActionOnSelect = action;
        this.DelayForActivity = delayForActivity;
        this.GroupDecision = groupDes;
        this.Count = count;
        this.Emojis = ['😛', '😝', '😜'];
        this.SpawnFrom = spawnFrom;
        this.PlaceHolder = placeHolder;
        this.ImageLink = imageLink;
        this.SelfSelectable = selfSelectable;
        this.Description = description;
    }
}