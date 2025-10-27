import { Client } from "@notionhq/client";
import { config } from "@/site.config";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface BlogPost {
    id: string;
    title: string;
    date?: string;
    slug?: string;
    description?: string;
    category?: string;
    tags?: string[];
    status?: string;
}

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
                const properties = post.properties;

                const titleProp = properties.title;
                const title =
                    titleProp?.type == "title"
                        ? titleProp.title?.[0]?.plain_text || "Untitled"
                        : "Untitled";

                const dateProp = properties.date;
                const date = dateProp?.type === "date" ? dateProp.date?.start : undefined;

                const slugProp = properties.slug;
                const slug =
                    slugProp?.type === "rich_text"
                        ? slugProp.rich_text?.[0]?.plain_text
                        : undefined;

                const descProp = properties.description;
                const description =
                    descProp?.type === "rich_text"
                        ? descProp.rich_text?.[0]?.plain_text
                        : undefined;

                const categoryProp = properties.category;
                const category =
                    categoryProp?.type === "select" ? categoryProp.select?.name : undefined;

                const tagsProp = properties.tags;
                const tags =
                    tagsProp?.type === "multi_select"
                        ? tagsProp.multi_select?.map((tag) => tag.name) || []
                        : [];

                const statusProp = properties.status;
                const status = statusProp?.type === "select" ? statusProp.select?.name : "Private";

                return {
                    id: post.id,
                    title,
                    date,
                    slug,
                    description,
                    category,
                    tags,
                    status,
                };
            });

        return posts;
    } catch (error) {
        console.error("Failed to fetch blog posts:", error);
        throw error;
    }
}
