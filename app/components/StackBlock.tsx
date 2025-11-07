import { type TechStack } from "@/app/libs/getTechStacks";
import Image from "next/image";

export default function StackBlock({ stack }: { stack: TechStack }) {
    return (
        <div className="bg-accent text-center flex justify-center aspect-square group hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-black/30 hover:-translate-y-1 hover:border-highlight border-2 border-transparent">
            <div className="mt-2 mb-1 flex justify-center items-center flex-col">
                <Image
                    src={stack.icon}
                    alt={stack.name}
                    width={36}
                    height={36}
                    className="grayscale-90 group-hover:grayscale-0 transition-all duration-300"
                />
                <h3 className="text-xs font-semibold pt-3">{stack.name}</h3>
                <p className="text-2xs text-gray-500 pt-1 px-4">{stack.description}</p>
            </div>
        </div>
    );
}
