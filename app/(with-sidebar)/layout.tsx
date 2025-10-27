import Sidebar from "@/app/components/Sidebar";

export default function WithSidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-[calc(100vh-80px)] py-8">
            <Sidebar />
            <main className="ml-64 flex-1">{children}</main>
        </div>
    );
}
