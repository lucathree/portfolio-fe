import { getWorkPosts } from "@/app/libs/getWorkPosts";
import { getTechStacks } from "@/app/libs/getTechStacks";
import { notFound } from "next/navigation";
import WorkBlock from "@/app/components/WorkBlock";
import StackBlock from "@/app/components/StackBlock";

export const revalidate = 60;

export default async function WorkPage() {
    let posts = null;
    const stacks = await getTechStacks();

    try {
        posts = await getWorkPosts();
    } catch (error) {
        notFound();
    }
    return (
        <div className="mx-8 my-8 max-w-6xl">
            <h1 className="text-3xl text-center text-highlight font-semibold my-2">
                Featured Projects
            </h1>
            <h2 className="text-lg text-center text-gray-300 font-thin mb-12">
                Professional Experiences and Personal Side Projects
            </h2>
            <div className="grid gap-6 justify-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {posts
                    .filter((post) => post.status == "Public")
                    .map((post) => (
                        <WorkBlock key={post.id} post={post} />
                    ))}
            </div>
            <h1 className="text-3xl text-center text-highlight font-semibold mt-24 mb-2">
                Tech Stack
            </h1>
            <h2 className="text-lg text-center text-gray-300 font-thin mb-10">
                Technologies I work with
            </h2>
            <div className="flex justify-center max-w-2xl mx-auto">
                <div className="grid gap-6 justify-center grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {stacks.map((stack) => (
                        <StackBlock key={stack.name} stack={stack} />
                    ))}
                </div>
            </div>
        </div>
    );
}
