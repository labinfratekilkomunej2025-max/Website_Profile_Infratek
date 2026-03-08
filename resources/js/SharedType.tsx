type NewsGuest = {
    id: number;
    title: string;
    description: string | null;
    created_at: string;
}
type Link = {
    url: string|null;
    label: string;
    page: string | null;
    active: boolean;
}
type PaginationData = {
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string|null;
    path: string;
    per_page: number;
    prev_page_url: string|null;
    to: number;
    total: number;
}
export type { NewsGuest, PaginationData };