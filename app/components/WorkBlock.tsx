import Link from "next/link";
import { type WorkPost } from "@/app/libs/parseWorkPost";

export default function WorkBlock({ post }: { post: WorkPost }) {
    return (
        <Link href={`/works/${post.title}`} className="min-h-[250px]">
            <article className="h-full w-full bg-accent p-6 shadow-sm transition-shadow hover:shadow-lg hover:shadow-black/30 flex flex-col">
                <h2 className="text-xl font-bold hover:text-highlight">{post.title}</h2>
                {post.description && (
                    <p className="my-3 text-sm text-gray-400">{post.description}</p>
                )}
                <div className="flex gap-3 flex-wrap">
                    {post.stack && post.stack.length > 0 && (
                        <div className="flex gap-2 flex-wrap">
                            {post.stack.map((stack) => (
                                <span
                                    key={stack}
                                    className="inline-block rounded-full bg-gray-600 px-2 py-1 text-2xs text-gray-300"
                                >
                                    {stack}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
                <div className="mt-auto text-right">
                    {post.team && (
                        <span className="text-xs text-gray-300">
                            {post.team === "개인 프로젝트" ? `👤 개인 프로젝트` : `🏢 ${post.team}`}
                        </span>
                    )}
                </div>
            </article>
        </Link>
    );
}
