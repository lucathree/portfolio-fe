import { getBlogPosts } from "@/app/libs/getBlogPosts";
import PostBlock from "@/app/components/PostBlock";

export default async function BlogPage() {
    let posts = null;
    try {
        posts = await getBlogPosts();
    } catch (error) {
        return (
            <div className="mx-8">
                <h1 className="text-3xl font-bold text-red-500">Failed to load blog posts</h1>
                <p className="text-gray-400 text-lg pt-2">
                    {error instanceof Error
                        ? error.message
                        : "An unexpected error occurred while fetching the blog posts."}
                </p>
            </div>
        );
    }
    return (
        <div className="mx-8 max-w-5xl">
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
