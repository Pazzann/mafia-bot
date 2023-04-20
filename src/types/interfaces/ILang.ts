export interface ILangProps {
    game_created: string;
    create_error: string;
    game_created_autocancel: string;          //usage: **${locale.game_created_autocancel}:** <t:${Math.floor(Date.now()/1000) + 600}:R>
    game_created_gameOwner: string;          //usage: **${locale.game_created_gameOwner}:** <@${interaction.user.id}>
    game_created_playerList: string;         //usage: __**${locale.game_created_playerList}:**__ \n<@${interaction.user.id}>
    game_created_roles: string;
    game_created_gameEndConditions: string;
    game_created_button_join: string;
    game_created_button_start: string;
    game_created_button_cancel: string;
    game_created_button_leave: string;
    game_created_button_edit: string;
    game_created_button_new: string;
    cancel_content_message: string;
    cancel_confirm_message: string;
    auto_cancel_content_message: string;
    error_you_are_not_the_owner: string;
    error_incorrect_game_id: string;
    game_was_ended: string;
    game_deleted: string;
    error_you_are_already: string;
    join_game: string;
    error_you_are_not_already: string;
    leave_game: string;
    error_not_enough_players: string;
    pre_end_game: string;
    game_started: string;
    innocent: string;
    mafia: string;
    doctor: string;
    police: string;
    killer: string;
    mistress: string;
    start_your_role: string;
    start_game_info: string;
    start_theme: string;
    start_player_count: string;
    start_mafia_count: string;
    start_doctor_count: string;
    start_police_count: string;
    start_killer_count: string;
    start_role_innocent: string;
    start_role_mafia: string;
    start_role_doctor: string;
    start_role_police: string;
    start_role_killer: string;
    start_role_mistress: string;

    /*EN: Phrases like "The city wakes up / falls asleep" seem to be not very common among English speakers. However, it was decided to use them to popularize and convey the game's atmosphere.*/
    wake_up_title: string;
    wake_up_description: string;
    sleep_time_title: string;
    sleep_time_description: string;
    kills_title: string;
    kills_description_one: string;  //usage: "${kills.join(", ")} kills_description_one"
    kills_description_many: string;  //usage: "${kills.join(", ")} kills_description_many"; EN: = kills_description_one
    no_kills_title: string;
    no_kills_description: string;

    vote_select: string;
    role_mafia_name: string;
    role_mafia_placeHolder: string;
    role_mafia_description: string;
    role_killer_name: string;           //killer = maniac
    role_killer_placeHolder: string;
    role_killer_description: string;
    role_peaceful_name: string;         //peaceful = innocent
    role_peaceful_description: string;
    role_doctor_name: string;
    role_doctor_placeHolder: string;
    role_doctor_description: string;
    role_police_name: string;           //police = detective
    role_police_placeHolder: string;
    role_police_description: string;
    role_mistress_name: string;
    role_mistress_placeHolder: string;
    role_mistress_description: string;

    condition_mafiaWin_name: string;
    condition_mafiaWin_WinEmbedTitle: string;
    condition_mafiaWin_WinEmbedDescription: string;
    condition_killerWin_name: string;
    condition_killerWin_WinEmbedTitle: string;
    condition_killerWin_WinEmbedDescription: string;
    condition_peacefulWin_name: string;
    condition_peacefulWin_WinEmbedTitle: string;
    condition_peacefulWin_WinEmbedDescription: string;

    role_embed_action_name: string;
    role_embed_groupDec_name: string;
    role_embed_spawnFrom_name: string;
    role_embed_selfSelectable_name: string;
    role_embed_count_name: string;
    role_embed_placeHolder_name: string;
    role_embed_delay_name: string;
    condition_embed_condition_name: string;         // = create_condition_condition_label
    condition_embed_embedTitle_name: string;        // = create_condition_embedTitle_label
    condition_embed_embedDescription_name: string;  // = create_condition_embedDescription_label
    condition_embed_winRole_name: string;           // = create_condition_winRole_label

    profile_title: string;
    profile_mafiaAccountSince: string;  //usage: ⌛**${locale.profile_mafiaAccountSince}** <t:${Math.round(dbDateToDate(user.since) / 1000)}:d>
    profile_accountSince: string;       //usage: ⌚**${locale.profile_accountSince}** <t:${Math.round(interaction.user.createdAt.getTime() / 1000)}:d>
    profile_totalGames: string;
    profile_totalWins: string;
    profile_premium: string;
    profile_premium_purchased: string;
    profile_premium_notPurchased: string;
    profile_button_premium: string;
    profile_button_custom: string;
    profile_button_news: string;

    create_condition_title1: string;
    create_condition_conditionName_label: string;
    create_condition_conditionName_placeHolder: string;
    create_condition_title2: string;    //usage: locale.create_condition_title2 + name
    create_condition_condition_label: string;
    create_condition_condition_placeHolder: string;
    create_condition_embedTitle_label: string;
    create_condition_embedTitle_placeHolder: string;
    create_condition_embedDescription_label: string;
    create_condition_embedDescription_placeHolder: string;
    create_condition_embedThumbnail_label: string;
    create_condition_embedThumbnail_placeHolder: string;
    create_condition_winRole_label: string;
    create_condition_winRole_placeHolder: string;
}