import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Process } from "@/components/sections/Process";
import { AutomationDemo } from "@/components/sections/AutomationDemo";
import { Pricing } from "@/components/sections/Pricing";
import { Testimonials } from "@/components/sections/Testimonials";
import { FAQ } from "@/components/sections/FAQ";
import { BlogShowcase } from "@/components/sections/BlogShowcase";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { getAllPosts } from "@/lib/blog";

export default async function Home() {
    const posts = await getAllPosts();

    return (
        <>
            <Hero />
            <Services />
            <FeaturedWork />
            <Process />
            <AutomationDemo />
            <Pricing />
            <Testimonials />
            <FAQ />
            <BlogShowcase posts={posts} />
            <FinalCTA />
        </>
    );
}
