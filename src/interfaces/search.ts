interface HubIds {
    [key: string]: {
        id: string;
        text: string;
        url: string;
    }
}

interface SearchTemplate {
    module: string;
    controller: string;
    action: string;
    isUgOffice: number;
    isOuterMarkupDisabled: boolean;
}

interface Pagination {
    pageParam: string;
    pageSizeParam: string;
    forcePageParam: boolean;
    validatePage: boolean;
    totalCount: number;
    defaultPageSize: number;
    pageSizeLimit: number[];
}

interface SearchData {
    scores: MuseScore[];
    see_other_scores: MuseScore[];
    featured_scores: MuseScore[];
    pagination: Pagination;
    pagination_url: string;
    filters: {
        parts: { id: string, count: number, name: string }[];
        instrument: { id: number, name: string, count: number, key_word: string, parent_id: number, uri: string }[];
        genres: { id: string, count: number, name: string, key_word: string, uri: string }[];
        instrumentation: { id: number, name: string, count: number, parent_id: number, weight: number, key_word: string, uri: string }[];
        type: { id: number, name: string, key_word: string, count: number, uri: string }[];
        recording_type: { id: string, key_word: string, name: string, uri: string }[];
        license: { id: string, name: string, uri: string }[];
        sort: { type: string, name: string, uri: string }[];
    }
    instruments_list: { title: string, url: string }[];
    genres: { id: number, name: string, parent_id: number, aliases: string[], name_stripped: string }[];
}

interface MuseSearch {
    search: { value: string, activeHubId: string, hubs: { ids: string[][], byIds: HubIds } };
    flashMessage?: string;
    telemetry: { trackingId: number };
    page: {
        template: SearchTemplate;
        data: SearchData;
        header_bidding: any[]
    }
}