import BaseRole from "./BaseRole";
import {Action} from "../../types/Action";

export default class CustomRole extends BaseRole {
    constructor(name:string, actionOnSelect: Action, delayForActivity: number, groupDecision: boolean, count: string, spawnFrom: number, placeHolder: string, imageLink: string, selfSelectable: boolean, description: string) {
        super();
        this._name = name;
        this.ActionOnSelect = actionOnSelect;
        this.DelayForActivity = delayForActivity;
        this.GroupDecision = groupDecision;
        this.Count = count;
        switch (actionOnSelect) {
            case "kill":{
                this.Emojis = ['🪓', '🪚', '🔪', '🔨', '🪛', '🦴', '☠️', '🩸'];
                break;
            }
            case "heal":{
                this.Emojis = ['💉', '💊', '🩹', '🩺', '🚑', '🧫', '🧪', '♥'];
                break;
            }
            case "alibi":{
                this.Emojis = ['♥', '💖', '🍓', '💋', '👠'];
                break;
            }
            case "check":{
                this.Emojis = ['🔍', '🔎', '🚓', '👮', '🕵', '🚔', '🚨', '📔'];
                break;
            }
            case "full_check":{
                this.Emojis = ['🔍', '🔎', '🚓', '👮', '🕵', '🚔', '🚨', '📔'];
                break;
            }
            default:{
                this.Emojis = ['😛', '😝', '😜'];
                break;
            }
        }
        this.SpawnFrom = spawnFrom;
        this._placeHolder = placeHolder;
        this.ImageLink = imageLink;
        this.SelfSelectable = selfSelectable;
        this._description = description;
    }
}