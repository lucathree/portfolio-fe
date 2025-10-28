"use client";

import { NotionRenderer } from "react-notion-x";
import type { ExtendedRecordMap } from "notion-types";
import dynamic from "next/dynamic";

interface NotionRendererClientProps {
    recordMap: ExtendedRecordMap;
    fullPage?: boolean;
    darkMode?: boolean;
}

const Code = dynamic(() => import("react-notion-x/build/third-party/code").then((m) => m.Code));

export default function NotionRendererClient({
    recordMap,
    fullPage = false,
    darkMode = true,
}: NotionRendererClientProps) {
    return (
        <div className="notion-content-wrapper">
            <NotionRenderer
                recordMap={recordMap}
                fullPage={fullPage}
                darkMode={darkMode}
                components={{ Code }}
            />
        </div>
    );
}
