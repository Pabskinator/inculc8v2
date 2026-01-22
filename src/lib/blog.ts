import { blogPosts } from '@/data/blogs';
import { BlogPost } from '@/types/blog';

/**
 * Blog Service
 * 
 * This layer abstracts data fetching. Currently, it pulls from local static data.
 * When you are ready for Strapi:
 * 1. Set NEXT_PUBLIC_STRAPI_API_URL in your .env
 * 2. Update these methods to use fetch() to your Strapi endpoint
 */

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL;

export async function getAllPosts(): Promise<BlogPost[]> {
    // FALLBACK: If no CMS URL is provided, return local data
    if (!STRAPI_URL) {
        return blogPosts;
    }

    try {
        const response = await fetch(`${STRAPI_URL}/api/articles?populate=*`, {
            next: { revalidate: 3600 } // ISR: Revalidate every hour
        });

        if (!response.ok) {
            throw new Error(`Strapi responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.data) {
            throw new Error('Invalid response format from Strapi');
        }

        // Transform Strapi's deep JSON structure into our clean BlogPost interface
        return data.data.map((item: any) => ({
            id: item.id.toString(),
            title: item.attributes.title,
            slug: item.attributes.slug,
            excerpt: item.attributes.excerpt,
            content: item.attributes.content,
            coverImage: item.attributes.coverImage?.data?.attributes?.url || '/images/blog-fallback.jpg',
            date: item.attributes.publishedAt,
            author: {
                name: item.attributes.author?.data?.attributes?.name || 'Inculc8 Analyst',
                role: item.attributes.author?.data?.attributes?.role || 'Unit_01'
            },
            category: item.attributes.category?.data?.attributes?.name || 'Intelligence',
            readingTime: item.attributes.readingTime || '5 min',
            tags: item.attributes.tags?.data?.map((t: any) => t.attributes.name) || []
        }));
    } catch (error) {
        console.warn('CMS Uplink Failed, reverting to local data caches.', error);
        return blogPosts;
    }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
    if (!STRAPI_URL) {
        return blogPosts.find(p => p.slug === slug) || null;
    }

    try {
        const response = await fetch(`${STRAPI_URL}/api/articles?filters[slug][$eq]=${slug}&populate=*`);

        if (!response.ok) {
            throw new Error(`Strapi responded with status: ${response.status}`);
        }

        const data = await response.json();

        if (!data || !data.data || !data.data.length) return null;

        const item = data.data[0];
        return {
            id: item.id.toString(),
            title: item.attributes.title,
            slug: item.attributes.slug,
            excerpt: item.attributes.excerpt,
            content: item.attributes.content,
            coverImage: item.attributes.coverImage?.data?.attributes?.url || '/images/blog-fallback.jpg',
            date: item.attributes.publishedAt,
            author: {
                name: item.attributes.author?.data?.attributes?.name || 'Inculc8 Analyst',
                role: item.attributes.author?.data?.attributes?.role || 'Unit_01'
            },
            category: item.attributes.category?.data?.attributes?.name || 'Intelligence',
            readingTime: item.attributes.readingTime || '5 min',
            tags: item.attributes.tags?.data?.map((t: any) => t.attributes.name) || []
        };
    } catch (error) {
        return blogPosts.find(p => p.slug === slug) || null;
    }
}
