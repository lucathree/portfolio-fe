import { Client } from "@notionhq/client";
import { config } from "@/site.config";
import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { parseWorkPost, type WorkPost } from "./parseWorkPost";

export async function getWorkPostByTitle(title: string): Promise<WorkPost | null> {
    const notion = new Client({
        auth: config.notionAuthToken,
    });

    try {
        const response = await notion.dataSources.query({
            data_source_id: config.notionWorkDatasourceId,
            filter: {
                property: "title",
                rich_text: {
                    equals: title,
                },
            },
        });
        return response.results[0] && response.results[0].object === "page"
            ? parseWorkPost(response.results[0] as PageObjectResponse)
            : null;
    } catch (error) {
        console.error("Failed to fetch work post:", error);
        throw error;
    }
}
