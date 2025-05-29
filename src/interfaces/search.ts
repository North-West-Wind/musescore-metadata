import { MuseScore, MuseScoreBase, MuseUser } from "./common";
import { MuseSet } from "./set";

type SearchTemplate = {
    module: string;
    controller: string;
    action: string;
    isUgOffice: number;
    isOuterMarkupDisabled: boolean;
}

type Pagination = {
    pageParam: string;
    pageSizeParam: string;
    forcePageParam: boolean;
		route: string | null;
		params: string | null;
		urlManager: string | null;
    validatePage: boolean;
    totalCount: number;
    defaultPageSize: number;
    pageSizeLimit: number[];
}

type SearchDataRequest = {
	text: string;
	page: number;
	page_size: number;
	sort: string;
	filters: number;
	instrumentation: any[]; // TODO: figure out type
	instrumentation_any: number;
	genres: any[]; // TODO: figure out type
	instrument: any[]; // TODO: figure out type
	instrument_any: number;
	parts: number;
	parts_min: number;
	parts_max: number;
	license: number[];
	user_id: number;
	artist_id: number;
	song_id: number;
	hub_alias: number;
	max_file_version: number;
	nocache: number;
	visible_to: number;
	recording_type: any[]; // TODO: figure out type
	complexity: any[]; // TODO: figure out type
	publisher: any[]; // TODO: figure out type
	score_format: any[]; // TODO: figure out type
	playlist_id: number;
	artist_ids: any[]; // TODO: figure out type
	excluded_publisher: any[]; // TODO: figure out type
	excluded_ids: any[]; // TODO: figure out type
	tags: number;
	country: string;
	region: number;
	type: any[]; // TODO: figure out type
	ids: any[]; // TODO: figure out type
	show_courses: boolean;
	sort_selected_by_user: number;
	experimentVariations: any[]; // TODO: figure out type
}

type SearchDataHub = {
	id: number;
	title: string;
	alias: string;
	weight: number;
	parent_id: number;
	mob_image: string;
	background_color: string;
	visible: number;
	imageBase: string;
	desktopImageBase: string;
	desktop_image: string;
	stat: {
		followers_count: number;
		scores_count: number;
	};
}

type SearchDataFeaturedHub = {
	imageBase: string;
	title: string;
	alias: string;
	id: number;
}

type SearchDataPlaylist = {
	id: string;
	public: number;
	url: string;
	title: string;
	subtitle: string;
	description: string;
	user: MuseUser;
	scores_cnt: number;
	image_type: number;
	image_url: string;
	is_favorite: boolean;
	date_created: number;
	color: string | null;
	text_color_type: number;
	date_scores_updated: number;
	is_user_musescore_team: boolean;
	palette_color_type: number;
}

type SearchData = {
    scores: MuseScore[];
    see_other_scores: MuseScore[];
    featured_scores: MuseScore[];
    pagination: Pagination;
    pagination_url: string;
		request: SearchDataRequest;
		query_filters: any[]; // TODO: figure out type
		query_text: string;
		query_page: number;
		query_order: string;
		query_parts: number;
		query_license: any[]; // TODO: figure out type
		is_main_page: boolean;
		hub_list: SearchDataHub[];
		featured_hub_list: SearchDataFeaturedHub[];
		hub: string | null;
		is_hub_subscribed: boolean;
		user_in_default_group: boolean;
		groups_discussions: {
			groups: any[]; // TODO: figure out type
			discussions: any[]; // TODO: figure out type
		}
    instruments_list: { title: string, url: string }[];
    genres: {
			id: number;
			name: string;
			parent_id: number;
			aliases: string[];
			name_stripped: string;
			root_genre_id: number;
		}[];
		courses: any[]; // TODO: figure out type
		schema: any[]; // TODO: figure out type
		clear_all_button: boolean;
		no_result_scores: any[]; // TODO: figure out type
		title: string;
		title_on_page: string;
		span_title_on_page: string;
		description: string;
		base_url: string;
		favorite_score_ids: any[]; // TODO: figure out type
		top_scores_of_the_week: any[]; // TODO: figure out type
		top_scores_of_the_week_type: string;
		playlists_selected: SearchDataPlaylist[];
		sets: MuseSet[];
		scores_to_be_promoted: MuseScoreBase[];
}

export type MuseSearch = {
		// Billing ignored
		level_instrument_title: string;
		// I18n ignored
    search: { value: string };
    flashMessage: string | null;
    telemetry: { trackingId: number };
		// Set order options ignored
    page: {
        template: SearchTemplate;
        data: SearchData;
        header_bidding: any[]
    }
}

export type MuseSearchOptions = {
    sort?: "date_uploaded" | "comment_count" | "view_count" | "rating" | "relevance";
    page?: number;
}