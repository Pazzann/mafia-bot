import {ActionRowBuilder, RestOrArray, SelectMenuBuilder, SelectMenuOptionBuilder} from "discord.js";
import MafiaUser from "../MafiaUser";
import IUserProps from "../../types/interfaces/IUser";
import {Action} from "../../types/Action";

export default abstract class BaseRole {
    public RoleName: string;
    public NameLocals: { EN: string, UA: string, RU: string } | null;
    public ActionOnSelect: Action;
    public DelayForActivity: number | "never";
    public GroupDecision: boolean;
    public Count: number | string;
    public Emojis: string[] | null;
    public SpawnFrom: number;
    public PlaceHolder: string;
    public PlaceHolderLocals: { EN: string, UA: string, RU: string } | null = null;
    public ImageLink: string | null;
    public Description: string;
    public SelfSelectable: boolean;
    public Selection: MafiaUser[] = [];

    public clearSelection() {
        this.Selection = []
    }

    public GetNightVoteRow(aliveUsers: MafiaUser[], unactive = false, owner: MafiaUser) {
        if (this.ActionOnSelect == "no_activity")
            return null;
        const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
        for (let user of aliveUsers) {
            if ((!this.SelfSelectable && user.id != owner.id) || (this.SelfSelectable)) {
                const chooser = new SelectMenuOptionBuilder()
                    .setLabel(user.dsUser.tag)
                    .setEmoji((this.Emojis)[Math.floor(Math.random() * this.Emojis.length)])
                    .setValue(user.id);
                chooseArr.push(chooser)
            }
        }
        return new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId(this.RoleName + "_select")
                    .setPlaceholder(this.PlaceHolderLocals ? this.PlaceHolderLocals[owner.lang.toUpperCase() as keyof { EN: string, RU: string, UA: string }] : this.PlaceHolder)
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
                    .setDisabled(unactive),
            );
    }

    GetVoteRow(aliveUsers: MafiaUser[], unactive = false) {
        const NonAlibiAndAliveUsers: MafiaUser[] = aliveUsers.filter(item => item.actionsOnUser.alibi === false);
        const chooseArr: RestOrArray<SelectMenuOptionBuilder> = [];
        // const skip = new SelectMenuOptionBuilder()
        //     .setLabel("Пропустить голосование")
        //     .setEmoji("▶️")
        //     .setValue("skip_vote");
        // chooseArr.push(skip);
        const Emojis: string[] = ['🗳️', '📄', '✒️', '🖋', '⏱'];

        for (let user of NonAlibiAndAliveUsers) {
            const chooser = new SelectMenuOptionBuilder()
                .setLabel(user.dsUser.tag)
                .setEmoji(Emojis[Math.floor(Math.random() * Emojis.length)])
                .setValue(user.id);
            chooseArr.push(chooser);
        }
        return new ActionRowBuilder<SelectMenuBuilder>()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId("vote_select")
                    .setPlaceholder('Выберите против кого вы голосуете...')
                    .setMinValues(1)
                    .setMaxValues(1)
                    .addOptions(chooseArr)
                    .setDisabled(unactive),
            );
    }

}