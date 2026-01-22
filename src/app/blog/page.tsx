import { Metadata } from 'next';
import { getAllPosts } from '@/lib/blog';
import BlogHeader from '@/components/blog/BlogHeader';
import BlogGrid from '@/components/blog/BlogGrid';

export const metadata: Metadata = {
    title: "Intelligence Reports",
    description: "In-depth intelligence on autonomous systems, high-fidelity web architecture, and the future of digital automation.",
};

export default async function BlogListingPage() {
    const posts = await getAllPosts();

    return (
        <main className="min-h-screen pt-32 pb-20 px-6 sm:px-10 max-w-7xl mx-auto">
            <BlogHeader title="Briefings" subtitle="Terminal // Intelligence_Reports" />
            <BlogGrid posts={posts} />
        </main>
    );
}
