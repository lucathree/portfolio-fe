import { getWorkPosts } from "@/app/libs/getWorkPosts";
import { notFound } from "next/navigation";
import WorkBlock from "@/app/components/WorkBlock";

export const revalidate = 60;

export default async function WorkPage() {
    let posts = null;
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
        </div>
    );
}
