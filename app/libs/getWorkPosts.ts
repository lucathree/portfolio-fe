import { Client } from "@notionhq/client";
import { config } from "@/site.config";
import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { parseWorkPost, type WorkPost } from "./parseWorkPost";

export async function getWorkPosts(): Promise<WorkPost[]> {
    const notion = new Client({
        auth: config.notionAuthToken,
    });

    try {
        const response = await notion.dataSources.query({
            data_source_id: config.notionWorkDatasourceId,
            sorts: [
                {
                    property: "order",
                    direction: "ascending",
                },
            ],
        });

        const posts: WorkPost[] = response.results
            .filter((result): result is PageObjectResponse => result.object === "page")
            .map((post: PageObjectResponse) => {
                return parseWorkPost(post);
            });

        return posts;
    } catch (error) {
        console.error("Failed to fetch work posts:", error);
        throw error;
    }
}
