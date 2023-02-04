export interface Post {
    id: string;
    title: string;
    body: string;
    date: Date;
    excerpt: string;
}

export interface ContextState {
    locales?: string[];
}