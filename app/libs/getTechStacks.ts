import { promises as fs } from "fs";
import path from "path";

export interface TechStack {
    name: string;
    category: string;
    icon: string;
}

export async function getTechStacks(): Promise<TechStack[]> {
    try {
        const dataPath = path.join(process.cwd(), "data", "techStacks.json");
        const fileContents = await fs.readFile(dataPath, "utf8");
        const techStacks: TechStack[] = JSON.parse(fileContents);

        return techStacks;
    } catch (error) {
        console.error("Failed to load tech stacks:", error);
        throw error;
    }
}
