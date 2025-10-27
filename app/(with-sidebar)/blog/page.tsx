import { getNotionPage } from "@/app/libs/getPostBlocks";
import NotionPageClient from "./NotionPageClient";

export default async function NotionPage() {
    let recordMap = null;

    try {
        recordMap = await getNotionPage("28b6741ca8bc80208c0dec13c47cb391");
    } catch (error) {
        return (
            <div className="flex min-h-screen items-center justify-center p-8">
                <div className="text-center">
                    <h1 className="mb-4 text-2xl font-bold text-red-600">
                        페이지를 불러올 수 없습니다
                    </h1>
                    <p className="text-gray-600">
                        {error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다"}
                    </p>
                </div>
            </div>
        );
    }
    return <NotionPageClient recordMap={recordMap} />;
}
