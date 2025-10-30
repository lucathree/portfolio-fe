import { getBlogPostBySlug } from "@/app/libs/getBlogPostBySlug";
import NotionPage from "@/app/components/NotionPage";
import Link from "next/link";
import { notFound } from "next/navigation";

export const revalidate = 60;

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    return (
        <article className="mx-8 my-8 max-w-4xl">
            <div className="mb-6">
                <Link href="/blog" className="text-highlight hover:underline inline-block">
                    ← Back to list
                </Link>
                {post.category && (
                    <div className="mt-6 mb-2">
                        <div className="inline-block py-1 px-4 text-2xl rounded-full bg-accent font-semibold shadow-md shadow-black/20">
                            {post.category}
                        </div>
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl font-bold my-4">{post.title}</h1>

                {post.date && (
                    <div className="text-sm text-gray-500 my-4">
                        작성일:{" "}
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </div>
                )}

                {post.tags && post.tags.length > 0 && (
                    <div className="flex gap-3 flex-wrap my-4">
                        {post.tags.map((tag) => (
                            <span
                                key={tag}
                                className="inline-block rounded-full bg-gray-600 px-3 py-1 text-sm font-medium text-gray-300"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>
            <hr className="border-gray-800 pb-4" />
            <NotionPage pageId={post.id} />
        </article>
    );
}
