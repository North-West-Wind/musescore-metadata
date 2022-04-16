interface MuseSet {
    id: number;
    title: string;
    description: string;
    category: string;
    date_created: number;
    date_updated: number;
    is_private: number;
    user: MuseUser;
    scores: MuseScore[];
}