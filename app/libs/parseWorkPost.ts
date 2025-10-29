import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface WorkPost {
    id: string;
    title: string;
    description?: string;
    startDate?: string;
    endDate?: string | null;
    team?: string;
    teamDetails?: string;
    stack?: string[];
    githubUrl?: string | null;
    liveUrl?: string | null;
    status?: string;
}

function formatDateToYearMonth(dateString: string | undefined | null): string | undefined {
    if (!dateString) return undefined;
    const date = new Date(dateString);
    return `${date.getFullYear()}. ${date.getMonth() + 1}.`;
}

export function parseWorkPost(post: PageObjectResponse): WorkPost {
    const properties = post.properties;

    const titleProp = properties.title;
    const title =
        titleProp?.type == "title" ? titleProp.title?.[0]?.plain_text || "Untitled" : "Untitled";

    const dateProp = properties.date;
    const rawStartDate = dateProp?.type === "date" ? dateProp.date?.start : undefined;
    const rawEndDate = dateProp?.type === "date" ? dateProp.date?.end : undefined;

    const startDate = formatDateToYearMonth(rawStartDate);
    const endDate = formatDateToYearMonth(rawEndDate);

    const descProp = properties.description;
    const description =
        descProp?.type === "rich_text" ? descProp.rich_text?.[0]?.plain_text : undefined;

    const teamProp = properties.team;
    const team = teamProp?.type === "select" ? teamProp.select?.name : undefined;

    const teamDetailsProp = properties.team_details;
    const teamDetails =
        teamDetailsProp?.type === "rich_text"
            ? teamDetailsProp.rich_text?.[0]?.plain_text
            : undefined;

    const stackProp = properties.stack;
    const stack =
        stackProp?.type === "multi_select"
            ? stackProp.multi_select?.map((stack) => stack.name) || []
            : [];

    const githubUrlProp = properties.github;
    const githubUrl = githubUrlProp?.type === "url" ? githubUrlProp.url : undefined;

    const liveUrlProp = properties.link;
    const liveUrl = liveUrlProp?.type === "url" ? liveUrlProp.url : undefined;

    const statusProp = properties.status;
    const status = statusProp?.type === "select" ? statusProp.select?.name : "Private";

    return {
        id: post.id,
        title,
        description,
        startDate,
        endDate,
        team,
        teamDetails,
        stack,
        githubUrl,
        liveUrl,
        status,
    };
}
