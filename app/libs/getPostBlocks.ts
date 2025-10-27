import { NotionAPI } from "notion-client";
import { ExtendedRecordMap } from "notion-types";

export async function getNotionPage(pageId: string): Promise<ExtendedRecordMap> {
    const notion = new NotionAPI();

    try {
        const recordMap = await notion.getPage(pageId);
        return recordMap;
    } catch (error) {
        console.error("Failed to fetch Notion page:", error);
        throw error;
    }
}
