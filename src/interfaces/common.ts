export type MuseUser = {
    id: number;
    name: string;
    url: string;
    image: string;
    is_pro: boolean;
    is_staff: boolean;
    is_moderator: boolean;
    cover_url: string;
		has_cover: boolean;
    date_created: number;
    is_publisher: boolean;
    _links: { self: { href: string } };
}

export type MuseScoreBase = {
    id: number;
    title: string;
    file_score_title: string;
    subtitle: string;
    description: string | null;
    can_manage_score: boolean;
    parts: number;
    parts_names: string[];
    thumbnails: {
			small: string;
			medium: string;
			large: string;
			original: string;
		};
    share: {
			publicUrl: string;
			embedUrl: string;
			url: string;
			title: string;
			isShowSecretUrl: boolean;
		};
    user: MuseUser;
    url: string;
    duration: string;
    composer_name: string;
    pages_count: number;
    date_created: number;
    date_updated: number;
    favorite_count: number;
    comments_count: number;
    instruments: { name: string, url_to_search: string, count: number }[];
    hits: number;
    is_draft: boolean;
    processing: string;
    revisions_count: number;
    revision_id: number;
    has_custom_video: boolean;
    has_custom_audio: boolean;
    is_private: number;
    is_blocked: number;
		score_part_available: number;
		score_part_is_on: number;
		is_copyright_protected: number;
		copyright_protection_value: string;
		is_origin: boolean;
		is_free: boolean;
    is_public_domain: boolean;
    truncated_description: string;
    instrumentations: { url_to_search: string, name: string }[],
    rating: { rating: number, count: number, count_to_visible: number, stats: { rating: number, count: number }[], user_rating: number | null, abusive_ban_time: number | null, abusive_ban_time_remain: number | null },
    publisher: string | null;
    is_official: boolean;
		is_purchased: boolean;
    _links: { self: { href: string } };
}

export type MuseScore = MuseScoreBase & {
    body: string;
    tags: string[];
    is_downloadable: number;
    license: string;
    instrumentation_id: number;
    is_original: boolean;
    measures: number;
    keysig: string;
    license_id: number;
    license_version: string;
    song_name: string;
    artist_name: string;
		complexity: number;
		category_pages: { url_to_search: string, name: string }[];
		is_pdf: boolean;
		is_arrange_me: boolean;
		billing_min_qty: number;
		billing_can_buy: boolean;
    firstPage: string;
}

export type MuseHub = {
    id: number;
    title: string;
    alias: string;
    weight: number;
    parent_id: number;
    mob_image: string;
    background_color: string;
    visible: number;
    imageBase: string;
    stat: { followers_count: number, scores_count: number };
}