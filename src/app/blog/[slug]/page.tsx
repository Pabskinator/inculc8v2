import { Metadata, ResolvingMetadata } from 'next';
import { getPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import PostHero from '@/components/blog/PostHero';

type Props = {
    params: { slug: string };
};

export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const post = await getPostBySlug(params.slug);

    if (!post) return { title: 'Post Not Found' };

    return {
        title: post.title,
        description: post.excerpt,
        keywords: post.tags,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.date,
            authors: [post.author.name],
            images: [
                {
                    url: post.coverImage,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [post.coverImage],
        },
    };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
    const post = await getPostBySlug(params.slug);

    if (!post) {
        notFound();
    }

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "image": post.coverImage,
        "datePublished": post.date,
        "dateModified": post.date,
        "author": [{
            "@type": "Person",
            "name": post.author.name,
            "jobTitle": post.author.role
        }],
        "description": post.excerpt,
        "publisher": {
            "@type": "Organization",
            "name": "Inculc8 Solutions",
            "logo": {
                "@type": "ImageObject",
                "url": "https://inculc8.solutions/logo.png"
            }
        },
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://inculc8.solutions/blog/${post.slug}`
        }
    };

    return (
        <article className="min-h-screen bg-black text-white selection:bg-cyan-500/30">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <PostHero post={post} />

            {/* Post Content */}
            <main className="max-w-4xl mx-auto px-6 py-24 relative">
                {/* Background Decorations */}
                <div className="absolute top-0 right-0 w-[1px] h-full bg-gradient-to-b from-cyan-500/20 via-transparent to-transparent hidden lg:block" />

                <section className="prose prose-invert prose-cyan max-w-none">
                    <div className="text-lg leading-relaxed text-white/70 italic mb-12 border-l-2 border-cyan-500/40 pl-8">
                        {post.excerpt}
                    </div>

                    <div className="font-mono text-white/80 leading-relaxed space-y-8">
                        {post.content.split('\n').map((paragraph, i) => {
                            if (!paragraph.trim()) return null;
                            if (paragraph.startsWith('## ')) {
                                return <h2 key={i} className="text-3xl font-bold text-white uppercase tracking-tighter pt-12 border-b border-white/10 pb-4">{paragraph.replace('## ', '')}</h2>;
                            }
                            if (paragraph.startsWith('### ')) {
                                return <h3 key={i} className="text-xl font-bold text-cyan-400 uppercase tracking-widest pt-8">{paragraph.replace('### ', '')}</h3>;
                            }
                            if (paragraph.startsWith('* ')) {
                                return <li key={i} className="ml-6 text-cyan-500/80 marker:text-cyan-400">{paragraph.replace('* ', '')}</li>;
                            }
                            if (/^\d\. /.test(paragraph)) {
                                return <li key={i} className="ml-6 text-white/70 marker:text-cyan-500 marker:font-bold">{paragraph}</li>;
                            }
                            return <p key={i}>{paragraph}</p>;
                        })}
                    </div>
                </section>

                {/* Post Footer/Tags */}
                <footer className="mt-24 pt-12 border-t border-white/10">
                    <div className="flex flex-wrap gap-4">
                        {post.tags.map(tag => (
                            <span key={tag} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] uppercase font-mono tracking-widest text-cyan-400">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </footer>
            </main>
        </article>
    );
}
