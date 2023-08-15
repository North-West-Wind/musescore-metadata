import { MuseUser, MuseScore } from "./common";

export type MuseSet = {
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

export type MuseSetPagination = {
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

export type MuseSetOption = {
    page?: number;
    all?: boolean;
}