import Link from "next/link";
import { type BlogPost } from "@/app/libs/parseBlogPost";

export default function PostBlock({ post }: { post: BlogPost }) {
    return (
        <Link href={`/blog/${post.slug}`}>
            <article className="rounded-2xl bg-accent p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-black/30">
                <div className="inline-block py-1 px-3 -ml-1 rounded-full bg-secondary font-semibold">
                    {post.category}
                </div>
                <h2 className="my-2 text-2xl font-bold hover:text-highlight">{post.title}</h2>
                {post.description && <p className="my-3 text-gray-200">{post.description}</p>}
                {post.date && (
                    <div className="mt-4 mb-2 text-sm text-gray-500">
                        <time dateTime={post.date}>
                            {new Date(post.date).toLocaleDateString("ko-KR", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </time>
                    </div>
                )}
                <div className="flex gap-3 flex-wrap">
                    {post.tags?.map((tag) => (
                        <span
                            key={tag}
                            className="inline-block rounded-full bg-gray-600 px-2 py-1 text-xs font-medium text-gray-300"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </article>
        </Link>
    );
}
