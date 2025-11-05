import { getBlogPosts } from "@/app/libs/getBlogPosts";
import { notFound } from "next/navigation";
import PostBlock from "@/app/components/PostBlock";

export const revalidate = 60;

export default async function BlogPage() {
    let posts = null;
    try {
        posts = await getBlogPosts();
    } catch (error) {
        notFound();
    }
    return (
        <div className="mx-8 my-8 max-w-5xl">
            <div className="grid gap-6">
                {posts
                    .filter((post) => post.status == "Public")
                    .map((post) => (
                        <PostBlock key={post.id} post={post} />
                    ))}
            </div>
        </div>
    );
}
