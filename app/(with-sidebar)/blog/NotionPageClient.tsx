"use client";

import { NotionRenderer } from "react-notion-x";
import { ExtendedRecordMap } from "notion-types";

interface NotionPageClientProps {
    recordMap: ExtendedRecordMap;
}

export default function NotionPageClient({ recordMap }: NotionPageClientProps) {
    return (
        <div className="min-h-screen">
            <NotionRenderer recordMap={recordMap} fullPage={false} darkMode={true} />
        </div>
    );
}
