import { MuseUser, MuseScoreBase } from "./common";

export type MuseSet = {
    id: number;
    title: string;
    description: string;
    category: string;
		position: number;
		user_id: number;
    date_created: number;
    date_updated: number;
    is_private: number;
		order_type: number;
		rate: number;
    user: MuseUser;
		scores_cnt: number;
    scores: MuseScoreBase[];
    pagination: MuseSetPagination;
}

export type MuseSetPagination = {
    pageParam: string;
    pageSizeParam: string;
    forcePageParam: boolean;
    route: string | null;
    params: string[] | null;
    urlManager: string | null;
    validatePage: boolean;
    totalCount: number;
    defaultPageSize: number;
    pageSizeLimit: [number, number];
}

export type MuseSetOption = {
    page?: number;
    all?: boolean;
}