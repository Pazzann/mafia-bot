export interface ILangProps {
    game_create: string;
    create_error: string;
    create_button_join: string;
    create_button_start: string;
    create_button_cancel: string;
    create_button_leave: string;
    create_button_new: string;
    create_autocancel: string;
    create_game_owner: string;
    create_player_list: string;
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
    game_created: string;
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

    /*L10N comment (EN):
    Phrases like "The city wakes up / falls asleep" seem to be not very common among English speakers.
    However, it was decided to use them to popularize and convey the game's atmosphere.*/
    wake_up_title: string;
    wake_up_description: string;
    sleep_time_title: string;
    sleep_time_description: string;
    kills_title: string;
    /*L10N comment (EN):
    ills_description_one & kills_description_many are the same*/
    kills_description_one: string;  //usage: "${kills.join(", ")} kills_description_one"
    kills_description_many: string;  //usage: "${kills.join(", ")} kills_description_many"
    no_kills_title: string;
    no_kills_description: string;
    role_embed_action_name: string;
    role_embed_groupDec_name: string;
    role_embed_spawnFrom_name: string;
    role_embed_selfSelectable_name: string;
    role_embed_count_name: string;
    role_embed_placeHolder_name: string;
    role_embed_delay_name: string;
    role_mafia_name: string;
    role_mafia_placeHolder: string;
    role_mafia_description: string;
    //killer = maniac
    role_killer_name: string;
    role_killer_placeHolder: string;
    role_killer_description: string;
}