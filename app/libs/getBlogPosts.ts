import { Client } from "@notionhq/client";
import { config } from "@/site.config";
import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { parseBlogPost, type BlogPost } from "./parseBlogPost";

export async function getBlogPosts(): Promise<BlogPost[]> {
    const notion = new Client({
        auth: config.notionAuthToken,
    });

    try {
        const response = await notion.dataSources.query({
            data_source_id: config.notionBlogDatasourceId,
            sorts: [
                {
                    property: "date",
                    direction: "descending",
                },
            ],
        });

        const posts: BlogPost[] = response.results
            .filter((result): result is PageObjectResponse => result.object === "page")
            .map((post: PageObjectResponse) => {
                return parseBlogPost(post);
            });

        return posts;
    } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        throw error;
    }
}
