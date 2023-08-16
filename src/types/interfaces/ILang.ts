export interface ILangProps {
    lang_set_success_message: string;

    game_error_incorrectGameID: string;
    game_error_alreadyCreated: string;
    game_error_alreadyJoined: string;
    game_create_error_notOnServer: string;
    game_created_title: string;             // <= 256 symbols
    game_created_autocancel: string;        //usage: **${locale.game_created_autocancel}:** <t:${Math.floor(Date.now()/1000) + 600}:R>
    game_created_gameHost: string;          //usage: **${locale.game_created_gameHost}:** <@${interaction.user.id}>
    game_created_votes: string;             //usage: __**${locale.game_created_votes}:**__ ${!host.voteVisible}
    game_created_playerList: string;        //usage: __**${locale.game_created_playerList}:**__ \n<@${interaction.user.id}>
    game_created_roles: string;
    game_created_gameEndConditions: string;
    game_created_button_join: string;       // <= 80 symbols
    game_created_button_start: string;      // <= 80 symbols
    game_created_button_cancel: string;     // <= 80 symbols
    game_created_button_leave: string;      // <= 80 symbols
    game_created_button_edit: string;       // <= 80 symbols
    game_created_button_new: string;        // <= 80 symbols
    game_cancel_error_noAccess: string;
    game_cancel_success_message_aboveEmbed: string;
    game_cancel_success_message: string;
    game_autocancel_message: string;
    game_start_error_noAccess: string;
    game_start_error_notEnoughPlayers: string;
    game_start_error_notEnoughRoles: string;
    game_started_button_endGame: string;    // <= 80 symbols
    game_started_title: string;                 // <= 256 symbols
    game_started_private_yourRole: string;      //usage: ${locale.game_started_private_yourRole}: __${owner.role.getName(owner.lang)}__
    game_started_private_gameInfo: string;
    game_started_private_theme: string;         //usage: ${locale.game_started_private_theme}: \`${theme.GetTheme(lang)}\`
    game_started_private_playerCount: string;   //usage: ${locale.game_started_private_playerCount}: \`${players.length}\`
    game_end_error_noAccess: string;
    game_end_success_message: string;
    game_end_success_privateMessage: string;
    game_join_error_alreadyJoined: string;
    game_join_success_message: string;
    game_leave_error_alreadyLeft: string;
    game_leave_success_message: string;
    game_edit_error_noAccess: string;
    game_edit_roles_placeHolder: string;        // <= 150 symbols
    game_edit_roles_error_notFound: string;     // = role_view_error_notFound
    game_edit_conditions_placeHolder: string;   // <= 150 symbols
    game_edit_conditions_error_notFound: string;// = condition_view_error_notFound
    game_edit_button_votes_hide: string;        // <= 80 symbols
    game_edit_button_votes_notHide: string;     // <= 80 symbols
    game_edit_success_message: string;

    //EN: Phrases like "The city wakes up / falls asleep" seem to be not very common among English speakers. However, it was decided to use them to popularize and convey the game's atmosphere.
    wake_up_title: string;              // <= 256 symbols
    wake_up_description: string;        // <= 4096 symbols
    sleep_time_title: string;           // <= 256 symbols
    sleep_time_description: string;     // <= 4096 symbols
    kills_title: string;                // <= 256 symbols
    kills_description_one: string;      // <= 4096 symbols; usage: "${kills.join(", ")} ${locale.kills_description_one}"
    kills_description_many: string;     // <= 4096 symbols; usage: "${kills.join(", ")} $locale.kills_description_many}"; EN: = kills_description_one
    no_kills_title: string;             // <= 256 symbols
    no_kills_description: string;       // <= 4096 symbols

    role_select_error_notFound: string;         // = role_view_error_notFound
    role_select_error_invalidSelection: string;
    role_select_error_noActivity: string;
    role_select_success_message1: string;       //usage: who.local.role_select_success_message1 + whomU.dsUser.tag + who.local.role_select_success_message2
    role_select_success_message2: string;
    role_vote_select_success_message1: string;  //usage: who.local.role_vote_select_success_message1 + whomU.dsUser.tag + who.local.role_vote_select_success_message2
    role_vote_select_success_message2: string;
    role_vote_select_placeHolder: string;       // <= 150 symbols
    role_vote_results_title: string;            // <= 256 symbols
    role_vote_results_tie: string;
    role_vote_results_ban1: string;              //usage: item.local.role_vote_results_ban1 + this.GetUser(votedForUsers[0].userid).dsUser.tag + item.local.role_vote_results_ban2
    role_vote_results_ban2: string;
    role_peaceful_name: string;         //peaceful = innocent
    role_peaceful_description: string;  // <= 4096 symbols;
    role_mafia_name: string;
    role_mafia_placeHolder: string;     // <= 150 symbols
    role_mafia_description: string;     // <= 4096 symbols;
    role_killer_name: string;           //killer = maniac
    role_killer_placeHolder: string;    // <= 150 symbols
    role_killer_description: string;    // <= 4096 symbols;
    role_doctor_name: string;
    role_doctor_placeHolder: string;    // <= 150 symbols
    role_doctor_description: string;    // <= 4096 symbols;
    role_police_name: string;           //police = detective
    role_police_placeHolder: string;    // <= 150 symbols
    role_police_description: string;    // <= 4096 symbols;
    role_mistress_name: string;
    role_mistress_placeHolder: string;  // <= 150 symbols
    role_mistress_description: string;  // <= 4096 symbols;
    role_check_reply_mafia1: string;    //usage: who.local.role_check_reply_mafia1 + whomU.dsUser.tag + who.local.role_check_reply_mafia2
    role_check_reply_mafia2: string;
    role_check_reply_notMafia1: string; //usage: who.local.role_check_reply_notMafia1 + whomU.dsUser.tag + who.local.role_check_reply_notMafia2
    role_check_reply_notMafia2: string;
    role_fullCheck_reply1: string;      //usage: who.local.role_fullCheck_reply_message1 + whomU.dsUser.tag + who.local.role_fullCheck_reply_message2 + whomU.role.name + who.local.role_fullCheck_reply_message3
    role_fullCheck_reply2: string;
    role_fullCheck_reply3: string;

    condition_mafiaWin_name: string;
    condition_mafiaWin_WinEmbedTitle: string;   // <= 256 symbols
    condition_mafiaWin_WinEmbedDescription: string;
    condition_killerWin_name: string;
    condition_killerWin_WinEmbedTitle: string;  // <= 256 symbols
    condition_killerWin_WinEmbedDescription: string;
    condition_peacefulWin_name: string;
    condition_peacefulWin_WinEmbedTitle: string;// <= 256 symbols
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

    profile_error_noProfile1: string;   //usage: locale.profile_error_noProfile1 + `<@${interaction.options.getUser("user").id}>` + locale.profile_error_noProfile2
    profile_error_noProfile2: string;
    profile_title: string;              // <= 256 symbols
    profile_mafiaAccountSince: string;  //usage: ⌛**${locale.profile_mafiaAccountSince}** <t:${Math.round(dbDateToDate(user.since) / 1000)}:d>
    profile_accountSince: string;       //usage: ⌚**${locale.profile_accountSince}** <t:${Math.round(interaction.user.createdAt.getTime() / 1000)}:d>
    profile_totalGames: string;
    profile_totalWins: string;
    profile_premium: string;            //do not localize Premium
    profile_premium_purchased: string;
    profile_premium_notPurchased: string;
    profile_button_premium: string;     // <= 80 symbols; do not localize Premium
    profile_button_custom: string;      // <= 80 symbols
    profile_button_news: string;        // <= 80 symbols

    //do not localize "Premium"
    premium_title: string;          // <= 256 symbols; do not localize Premium
    premium_description: string;    // <= 4096 symbols
    premium_howDoIGet_name: string; // <= 256 symbols; do not localize Premium
    premium_howDoIGet_value: string;// <= 1024 symbols; do not localize Premium
    premium_faq_name: string;       // <= 256 symbols
    premium_faq_value: string;      // <= 1024 symbols; do not localize Premium

    custom_button_createrole: string;                   // <= 80 symbols
    custom_button_editrole: string;                     // <= 80 symbols
    custom_button_deleterole: string;                   // <= 80 symbols
    custom_button_createcondition: string;              // <= 80 symbols
    custom_button_editcondition: string;                // <= 80 symbols
    custom_button_deletecondition: string;              // <= 80 symbols

    role_view_error_notFound: string;
    role_view_error_noAccess: string;
    role_view_select_placeHolder: string;                   // <= 150 symbols
    role_view_button_clone: string;                     // <= 80 symbols

    role_clone_error_number: string;
    role_clone_error_notFound: string;                      // = role_view_error_notFound
    role_clone_success_message: string;

    role_create_error_number: string;
    role_create_error_notFound: string;                     // = role_view_error_notFound
    role_create_error_noAccess: string;
    role_create_title1: string;         // <= 256 symbols
    role_create_roleName_label: string;                     // <= 45 symbols; usage: CAPS
    role_create_roleName_placeHolder: string;               // <= 100 symbols
    role_create_roleDescription_label: string;              // <= 45 symbols; usage: CAPS
    role_create_roleDescription_placeHolder: string;        // <= 100 symbols
    role_create_roleImage_label: string;                    // <= 45 symbols; usage: CAPS
    role_create_roleImage_placeHolder: string;              // <= 100 symbols
    role_create_roleCount_label: string;                    // <= 45 symbols; usage: CAPS
    role_create_roleCount_placeHolder: string;              // <= 100 symbols
    role_create_rolePlaceHolder_label: string;              // <= 45 symbols; usage: CAPS
    role_create_rolePlaceHolder_placeHolder: string;        // <= 100 symbols
    role_create_goNext_button: string;                      // <= 80 symbols
    role_create_goNext_message: string;
    role_create_title2: string;         // <= 256 symbols; usage: locale.role_create_title2 + name
    role_create_roleAction_label: string;                   // <= 45 symbols; usage: CAPS
    role_create_roleAction_placeHolder: string;             // <= 100 symbols
    role_create_roleSelectable_label: string;               // <= 45 symbols; usage: CAPS
    role_create_roleSelectable_placeHolder: string;         // <= 100 symbols
    role_create_roleDelay_label: string;                    // <= 45 symbols; usage: CAPS
    role_create_roleDelay_placeHolder: string;              // <= 100 symbols
    role_create_roleSpawnFrom_label: string;                // <= 45 symbols; usage: CAPS
    role_create_roleSpawnFrom_placeHolder: string;          // <= 100 symbols
    role_create_roleGroupSelection_label: string;           // <= 45 symbols; usage: CAPS
    role_create_roleGroupSelection_placeHolder: string;     // <= 100 symbols
    role_create_success_message: string;

    role_edit_error_notFound: string;                       // = role_view_error_notFound
    role_edit_error_noAccess: string;
    role_edit_select_message: string;
    role_edit_select_placeHolder: string;                   // <= 150 symbols
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
    role_edit_title: string;            // <= 256 symbols; usage: locale.role_edit_title + role.name
    role_edit_roleName_label: string;                       // = role_create_roleName_label; usage: CAPS
    role_edit_roleName_placeHolder: string;                 // <= 100 symbols
    role_edit_roleDescription_label: string;                // = role_create_roleDescription_label; usage: CAPS
    role_edit_roleDescription_placeHolder: string;          // <= 100 symbols
    role_edit_roleImage_label: string;                      // = role_create_roleImage_label; usage: CAPS
    role_edit_roleImage_placeHolder: string;                // <= 100 symbols
    role_edit_roleCount_label: string;                      // = role_create_roleCount_label; usage: CAPS
    role_edit_roleCount_placeHolder: string;                // <= 100 symbols
    role_edit_rolePlaceHolder_label: string;                // = role_create_rolePlaceHolder_label; usage: CAPS
    role_edit_rolePlaceHolder_placeHolder: string;          // <= 100 symbols
    role_edit_roleAction_label: string;                     // = role_create_roleAction_label; usage: CAPS
    role_edit_roleAction_placeHolder: string;               // <= 100 symbol
    role_edit_roleSelectable_label: string;                 // = role_create_roleSelectable_label; usage: CAPS
    role_edit_roleSelectable_placeHolder: string;           // <= 100 symbols
    role_edit_roleDelay_label: string;                      // = role_create_roleDelay_label; usage: CAPS
    role_edit_roleDelay_placeHolder: string;                // <= 100 symbols
    role_edit_roleSpawnFrom_label: string;                  // = role_create_roleSpawnFrom_label; usage: CAPS
    role_edit_roleSpawnFrom_placeHolder: string;            // <= 100 symbols
    role_edit_roleGroupSelection_label: string;             // = role_create_roleGroupSelection_label; usage: CAPS
    role_edit_roleGroupSelection_placeHolder: string;       // <= 100 symbols
    role_edit_success_message: string;

    role_delete_error_noRoles: string;
    role_delete_error_notFound: string;                     // = role_view_error_notFound
    role_delete_error_noAccess: string;
    role_delete_select_message: string;
    role_delete_select_placeHolder: string;                 // <= 150 symbols
    role_delete_success_message: string;

    condition_view_error_notFound: string;
    condition_view_error_noAccess: string;
    condition_view_select_placeHolder: string;              // <= 150 symbols
    condition_view_button_clone: string;                    // <= 80 symbols

    condition_clone_error_number: string;
    condition_clone_error_notFound: string;                 // = condition_view_error_notFound
    condition_clone_success_message: string;

    condition_create_error_number: string;
    condition_create_title1: string;    // <= 256 symbols
    condition_create_conditionName_label: string;           // <= 45 symbols; usage: CAPS
    condition_create_conditionName_placeHolder: string;     // <= 100 symbols
    condition_create_goNext_button: string;                 // = role_create_goNext_button
    condition_create_goNext_message: string;                // = role_create_goNext_message
    condition_create_title2: string;    // <= 256 symbols; usage: locale.condition_create_title2 + name
    condition_create_condition_label: string;               // <= 45 symbols; usage: CAPS
    condition_create_condition_placeHolder: string;         // <= 100 symbols
    condition_create_embedTitle_label: string;              // <= 45 symbols; usage: CAPS
    condition_create_embedTitle_placeHolder: string;        // <= 100 symbols
    condition_create_embedDescription_label: string;        // <= 45 symbols; usage: CAPS
    condition_create_embedDescription_placeHolder: string;  // <= 100 symbols
    condition_create_embedThumbnail_label: string;          // <= 45 symbols; usage: CAPS
    condition_create_embedThumbnail_placeHolder: string;    // <= 100 symbols
    condition_create_winRole_label: string;                 // <= 45 symbols; usage: CAPS
    condition_create_winRole_placeHolder: string;           // <= 100 symbols
    condition_create_success_message: string;

    condition_edit_error_notFound: string;                  // = condition_view_error_notFound
    condition_edit_error_noAccess: string;
    condition_edit_select_message: string;
    condition_edit_select_placeHolder: string;              // <= 150 symbols
    condition_edit_title: string;       // <= 256 symbols; usage: locale.condition_edit_title + condition.name
    condition_edit_condition_label: string;                 // = condition_create_condition_label; usage: CAPS
    condition_edit_condition_placeHolder: string;           // <= 100 symbols
    condition_edit_embedTitle_label: string;                // = condition_create_embedTitle_label; usage: CAPS
    condition_edit_embedTitle_placeHolder: string;          // <= 100 symbols
    condition_edit_embedDescription_label: string;          // = condition_create_embedDescription_label; usage: CAPS
    condition_edit_embedDescription_placeHolder: string;    // <= 100 symbols
    condition_edit_embedThumbnail_label: string;            // = condition_create_embedThumbnail_label; usage: CAPS
    condition_edit_embedThumbnail_placeHolder: string;      // <= 100 symbols
    condition_edit_winRole_label: string;                   // = condition_create_winRole_label; usage: CAPS
    condition_edit_winRole_placeHolder: string;             // <= 100 symbols
    condition_edit_success_message: string;

    condition_delete_error_noConditions: string;
    condition_delete_error_notFound: string;                // = condition_view_error_notFound
    condition_delete_error_noAccess: string;
    condition_delete_select_message: string;
    condition_delete_select_placeHolder: string;            // <= 150 symbols
    condition_delete_success_message: string;

    news_error_noAccess_enabled: string;
    news_error_noAccess_disabled: string;
    news_enable_success_message: string;
    news_disable_success_message: string;

    help_title: string;                     // <= 256 symbols
    help_description: string;               // <= 4096 symbols; do not localize Premium
    help_commands_name: string;             // <= 256 symbols
    help_commands_value: string;            // <= 1024 symbols
    help_faq_name: string;                  // <= 256 symbols
    help_faq_value: string;                 // <= 1024 symbols; do not localize Premium
    help_plans_name: string;                // <= 256 symbols
    help_plans_value: string;               // <= 1024 symbols
    help_about_name: string;                // <= 256 symbols
    help_about_value: string;               // <= 1024 symbols

    help_button_rules: string;              // <= 80 symbols
    help_button_scripting: string;          // <= 80 symbols
    help_button_helpmessage: string;        // <= 80 symbols

    helpMessage_title: string;                              // <= 256 symbols
    helpMessage_text_label: string;                         // <= 45 symbols; usage: CAPS
    helpMessage_text_placeHolder: string;                   // <= 100 symbols

    error_notInGame: string;
    error_premium: string;                  //do not localize Premium
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