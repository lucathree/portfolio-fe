import { getWorkPostByTitle } from "@/app/libs/getWorkPostByTitle";
import NotionPage from "@/app/components/NotionPage";
import Link from "next/link";
import { notFound } from "next/navigation";
import Image from "next/image";

export const revalidate = 60;

export default async function WorkPostPage({ params }: { params: Promise<{ title: string }> }) {
    const { title } = await params;
    const post = await getWorkPostByTitle(title);

    if (!post) {
        notFound();
    }

    return (
        <article className="mx-8 my-8 max-w-4xl">
            <div className="mb-4">
                <Link href="/works" className="text-highlight hover:underline inline-block">
                    ← Back to list
                </Link>

                <h1 className="text-4xl md:text-5xl font-bold font-montserrat my-4">
                    {post.title}
                </h1>

                {post.description && (
                    <p className="text-lg text-gray-300 my-4">{post.description}</p>
                )}

                <div className="flex flex-wrap my-2 text-gray-400">
                    {post.team && (
                        <div className="inline-block">
                            {post.team === "개인 프로젝트" ? "👤 개인 프로젝트" : `🏢 ${post.team}`}
                        </div>
                    )}
                    {post.teamDetails && (
                        <div className="inline-block">
                            <span className="mx-2">|</span>
                            {post.teamDetails}
                        </div>
                    )}
                    {post.startDate && (
                        <div className="inline-block">
                            <span className="mx-2">|</span>
                            {post.startDate} ~ {post.endDate ? post.endDate : "진행중"}
                        </div>
                    )}
                </div>

                {post.stack && post.stack.length > 0 && (
                    <div className="flex gap-3 flex-wrap my-4">
                        {post.stack.map((stack) => (
                            <span
                                key={stack}
                                className="inline-block rounded-full bg-gray-600 px-3 py-1 text-sm font-medium text-gray-300"
                            >
                                {stack}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex gap-3 flex-wrap">
                    {post.githubUrl && (
                        <a
                            href={post.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-gray-800 hover:bg-gray-700 border-3 border-highlight transition-colors"
                        >
                            <Image
                                src="/github-mark-white.svg"
                                alt="GitHub"
                                width={16}
                                height={16}
                            />
                            <span className="text-white text-sm font-medium">Code</span>
                        </a>
                    )}
                    {post.liveUrl && (
                        <a
                            href={post.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-white text-sm font-medium inline-flex items-center gap-2 px-4 py-2 mt-2 bg-gray-800 hover:bg-gray-700 border-3 border-highlight transition-colors"
                        >
                            Try it out →
                        </a>
                    )}
                </div>
            </div>
            <hr className="border-gray-800 pb-4" />
            <NotionPage pageId={post.id} />
        </article>
    );
}
