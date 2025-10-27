import Sidebar from "@/app/components/Sidebar";

export default function WithSidebarLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex min-h-screen py-10">
            <Sidebar />
            <main className="ml-48 flex-1 px-8">{children}</main>
        </div>
    );
}
