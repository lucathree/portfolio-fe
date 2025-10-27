interface Config {
    notionAuthToken: string;
    notionBlogDatasourceId: string;
}

function validateEnv(): Config {
    const requiredEnvVars = ["NOTION_AUTH_TOKEN", "NOTION_BLOG_DATASOURCE_ID"];
    const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

    if (missingVars.length > 0) {
        throw new Error(`Missing required environment variables: ${missingVars.join(", ")}`);
    }

    return {
        notionAuthToken: process.env.NOTION_AUTH_TOKEN!,
        notionBlogDatasourceId: process.env.NOTION_BLOG_DATASOURCE_ID!,
    };
}

export const config = validateEnv();
