import { MuseScore } from "./common";

type HubIds = {
    [key: string]: {
        id: string;
        text: string;
        url: string;
    }
}

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
    validatePage: boolean;
    totalCount: number;
    defaultPageSize: number;
    pageSizeLimit: number[];
}

type SearchData = {
    scores: MuseScore[];
    see_other_scores: MuseScore[];
    featured_scores: MuseScore[];
    pagination: Pagination;
    pagination_url: string;
    instruments_list: { title: string, url: string }[];
    genres: { id: number, name: string, parent_id: number, aliases: string[], name_stripped: string }[];
}

export type MuseSearch = {
    search: { value: string, activeHubId: string, hubs: { ids: string[][], byIds: HubIds } };
    flashMessage?: string;
    telemetry: { trackingId: number };
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