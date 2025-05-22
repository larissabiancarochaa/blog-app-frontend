export interface Post {
    id: number;
    title: string;
    description: string;
    author_id: number;
    image?: string;
    likes: number;
    created_at: string;
    first_name: string;
    last_name: string;
    profile_image?: string;
}