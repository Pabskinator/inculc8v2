export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    coverImage: string;
    date: string;
    author: {
        name: string;
        role: string;
        avatar?: string;
    };
    category: string;
    readingTime: string;
    tags: string[];
}
