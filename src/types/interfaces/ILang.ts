export interface ILangProps {
    lang_set_success_message: string;

    game_error_incorrectGameID: string;
    game_error_alreadyCreated: string;
    game_error_alreadyJoined: string;
    game_create_error_notOnServer: string;
    game_created_title: string;
    game_created_autocancel: string;        //usage: **${locale.game_created_autocancel}:** <t:${Math.floor(Date.now()/1000) + 600}:R>
    game_created_gameHost: string;          //usage: **${locale.game_created_gameHost}:** <@${interaction.user.id}>
    game_created_playerList: string;        //usage: __**${locale.game_created_playerList}:**__ \n<@${interaction.user.id}>
    game_created_roles: string;
    game_created_gameEndConditions: string;
    game_created_button_join: string;
    game_created_button_start: string;
    game_created_button_cancel: string;
    game_created_button_leave: string;
    game_created_button_edit: string;
    game_created_button_new: string;
    game_cancel_error_noAccess: string;
    game_cancel_success_message_aboveEmbed: string;
    game_cancel_success_message: string;
    game_autocancel_message: string;
    game_start_error_noAccess: string;
    game_start_error_notEnoughPlayers: string;
    game_start_error_notEnoughRoles: string;
    game_started_button_endGame: string;
    game_started_title: string;
    game_end_error_noAccess: string;
    game_end_success_message: string;
    game_end_success_privateMessage: string;
    game_join_error_alreadyJoined: string;
    game_join_success_message: string;
    game_leave_error_alreadyLeft: string;
    game_leave_success_message: string;
    game_edit_error_noAccess: string;
    game_edit_roles_placeHolder: string;
    game_edit_conditions_placeHolder: string;
    game_edit_success_message: string;
    start_your_role: string;                //TODO: review
    start_game_info: string;                //TODO: review
    start_theme: string;                    //TODO: review
    start_player_count: string;             //TODO: review

    //EN: Phrases like "The city wakes up / falls asleep" seem to be not very common among English speakers. However, it was decided to use them to popularize and convey the game's atmosphere.
    wake_up_title: string;
    wake_up_description: string;
    sleep_time_title: string;
    sleep_time_description: string;
    kills_title: string;
    kills_description_one: string;      //usage: "${kills.join(", ")} kills_description_one"
    kills_description_many: string;     //usage: "${kills.join(", ")} kills_description_many"; EN: = kills_description_one
    no_kills_title: string;
    no_kills_description: string;

    vote_select: string;
    vote_results_title: string;
    vote_results_tie: string;
    vote_results_ban: string;           //usage: ":x: " + votedForUsers[0].userid).dsUser.tag + item.local.vote_results_ban
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

    role_embed_action_name: string;                 // = role_create_roleAction_label
    role_embed_groupDec_name: string;               // = role_create_roleGroupSelection_label
    role_embed_spawnFrom_name: string;              // = role_create_roleSpawnFrom_label
    role_embed_selfSelectable_name: string;         // = role_create_roleSelectable_label
    role_embed_count_name: string;                  // = role_create_roleCount_label
    role_embed_placeHolder_name: string;            // = role_create_rolePlaceHolder_label
    role_embed_delay_name: string;                  // = role_create_roleDelay_label
    condition_embed_condition_name: string;         // = condition_create_condition_label
    condition_embed_embedTitle_name: string;        // = condition_create_embedTitle_label
    condition_embed_embedDescription_name: string;  // = condition_create_embedDescription_label
    condition_embed_winRole_name: string;           // = condition_create_winRole_label

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

    role_create_error_number: string;
    role_create_error_notFound: string;
    role_create_error_noAccess: string;
    role_create_title1: string;
    role_create_roleName_label: string;
    role_create_roleName_placeHolder: string;
    role_create_roleDescription_label: string;
    role_create_roleDescription_placeHolder: string;
    role_create_roleImage_label: string;
    role_create_roleImage_placeHolder: string;
    role_create_roleCount_label: string;
    role_create_roleCount_placeHolder: string;
    role_create_rolePlaceHolder_label: string;
    role_create_rolePlaceHolder_placeHolder: string;
    role_create_goNext_button: string;
    role_create_goNext_message: string;
    role_create_title2: string;         //usage: locale.role_create_title2 + name
    role_create_roleAction_label: string;
    role_create_roleAction_placeHolder: string;
    role_create_roleSelectable_label: string;
    role_create_roleSelectable_placeHolder: string;
    role_create_roleDelay_label: string;
    role_create_roleDelay_placeHolder: string;
    role_create_roleSpawnFrom_label: string;
    role_create_roleSpawnFrom_placeHolder: string;
    role_create_roleGroupSelection_label: string;
    role_create_roleGroupSelection_placeHolder: string;
    role_create_success_message: string;

    role_view_error_notFound: string;
    role_view_error_noAccess: string;

    role_edit_error_notFound: string;                       // = role_view_error_notFound
    role_edit_error_noAccess: string;
    role_edit_select_message: string;
    role_edit_select_placeHolder: string;
    role_edit_selectField_message: string;
    role_edit_selectField_placeHolder: string;
    role_edit_selectField_roleName_label: string;           // = role_create_roleName_label
    role_edit_selectField_roleDescription_label: string;    // = role_create_roleDescription_label
    role_edit_selectField_roleImage_label: string;          // = role_create_roleImage_label
    role_edit_selectField_roleCount_label: string;          // = role_create_roleCount_label
    role_edit_selectField_rolePlaceHolder_label: string;    // = role_create_rolePlaceHolder_label
    role_edit_selectField_roleAction_label: string;         // = role_create_roleAction_label
    role_edit_selectField_roleSelectable_label: string;     // = role_create_roleSelectable_label
    role_edit_selectField_roleDelay_label: string;          // = role_create_roleDelay_label
    role_edit_selectField_roleSpawnFrom_label: string;      // = role_create_roleSpawnFrom_label
    role_edit_selectField_roleGroupSelection_label: string; // = role_create_roleGroupSelection_label
    role_edit_success_message: string;

    role_delete_error_noRoles: string;
    role_delete_error_notFound: string;                     // = role_view_error_notFound
    role_delete_error_noAccess: string;
    role_delete_select_message: string;
    role_delete_select_placeHolder: string;
    role_delete_success_message: string;

    condition_create_error_number: string;
    condition_create_title1: string;
    condition_create_conditionName_label: string;
    condition_create_conditionName_placeHolder: string;
    condition_create_goNext_button: string;                 // = role_create_goNext_button
    condition_create_goNext_message: string;                // = role_create_goNext_message
    condition_create_title2: string;    //usage: locale.condition_create_title2 + name
    condition_create_condition_label: string;
    condition_create_condition_placeHolder: string;
    condition_create_embedTitle_label: string;
    condition_create_embedTitle_placeHolder: string;
    condition_create_embedDescription_label: string;
    condition_create_embedDescription_placeHolder: string;
    condition_create_embedThumbnail_label: string;
    condition_create_embedThumbnail_placeHolder: string;
    condition_create_winRole_label: string;
    condition_create_winRole_placeHolder: string;
    condition_create_success_message: string;

    condition_view_error_notFound: string;
    condition_view_error_noAccess: string;

    condition_edit_error_notFound: string;                  // = condition_view_error_notFound
    condition_edit_error_noAccess: string;
    condition_edit_select_message: string;
    condition_edit_select_placeHolder: string;
    condition_edit_title: string;       //usage: locale.condition_edit_title + name
    condition_edit_condition_label: string;                 // = condition_create_condition_label
    condition_edit_condition_placeHolder: string;
    condition_edit_embedTitle_label: string;                // = condition_create_embedTitle_label
    condition_edit_embedTitle_placeHolder: string;
    condition_edit_embedDescription_label: string;          // = condition_create_embedDescription_label
    condition_edit_embedDescription_placeHolder: string;
    condition_edit_embedThumbnail_label: string;            // = condition_create_embedThumbnail_label
    condition_edit_embedThumbnail_placeHolder: string;
    condition_edit_winRole_label: string;                   // = condition_create_winRole_label
    condition_edit_winRole_placeHolder: string;
    condition_edit_success_message: string;

    condition_delete_error_noConditions: string;
    condition_delete_error_notFound: string;                // = condition_view_error_notFound
    condition_delete_error_noAccess: string;
    condition_delete_select_message: string;
    condition_delete_select_placeHolder: string;
    condition_delete_success_message: string;

    news_error_noAccess_enabled: string;
    news_error_noAccess_disabled: string;
    news_enable_success_message: string;
    news_disable_success_message: string;

    help_button_rules: string;
    help_button_scripting: string;
    help_button_helpmessage: string;

    helpMessage_title: string;
    helpMessage_text_label: string;
    helpMessage_text_placeHolder: string;

    error_notInGame: string;
    error_premium: string;
    error_unknown: string;

    //Deprecated strings:
    innocent: string;                       //deprecated
    mafia: string;                          //deprecated
    doctor: string;                         //deprecated
    police: string;                         //deprecated
    killer: string;                         //deprecated
    mistress: string;                       //deprecated
    start_mafia_count: string;              //deprecated
    start_doctor_count: string;             //deprecated
    start_police_count: string;             //deprecated
    start_killer_count: string;             //deprecated
    start_role_innocent: string;            //deprecated
    start_role_mafia: string;               //deprecated
    start_role_doctor: string;              //deprecated
    start_role_police: string;              //deprecated
    start_role_killer: string;              //deprecated
    start_role_mistress: string;            //deprecated
}