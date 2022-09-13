import { MuseUser, MuseScore } from "./common";

export interface MuseSet {
    id: number;
    title: string;
    description: string;
    category: string;
    date_created: number;
    date_updated: number;
    is_private: number;
    user: MuseUser;
    scores: MuseScore[];
    pagination: MuseSetPagination;
}

export interface MuseSetPagination {
    pageParam: string
    pageSizeParam: string
    forcePageParam: boolean
    route?: string
    params?: string[]
    urlManager?: any;
    validatePage: boolean;
    totalCount: number;
    defaultPageSize: number;
    pageSizeLimit: number[];
}

export interface MuseSetOption {
    page?: number;
    all?: boolean;
}