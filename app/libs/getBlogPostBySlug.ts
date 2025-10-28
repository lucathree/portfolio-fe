import { Client } from "@notionhq/client";
import { config } from "@/site.config";
import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { parseBlogPost, type BlogPost } from "./parseBlogPost";

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const notion = new Client({
        auth: config.notionAuthToken,
    });

    try {
        const response = await notion.dataSources.query({
            data_source_id: config.notionBlogDatasourceId,
            filter: {
                property: "slug",
                rich_text: {
                    equals: slug,
                },
            },
        });
        return response.results[0] && response.results[0].object === "page"
            ? parseBlogPost(response.results[0] as PageObjectResponse)
            : null;
    } catch (error) {
        console.error("Failed to fetch blog post:", error);
        throw error;
    }
}
