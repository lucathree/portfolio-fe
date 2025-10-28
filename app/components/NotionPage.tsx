import { NotionAPI } from "notion-client";
import NotionClientRenderer from "./NotionClientRenderer";

export default async function NotionPage({ pageId }: { pageId: string }) {
    const notion = new NotionAPI();
    const recordMap = await notion.getPage(pageId);

    return (
        <div className="min-h-screen">
            <NotionClientRenderer recordMap={recordMap} fullPage={false} darkMode={true} />
        </div>
    );
}
