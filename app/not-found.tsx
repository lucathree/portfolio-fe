import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-3.5rem)]">
            <div className="text-center">
                <h1 className="text-6xl font-bold font-montserrat text-highlight mb-4">404</h1>
                <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-gray-400 text-lg mb-8">요청한 페이지를 찾을 수 없습니다.</p>
                <Link
                    href="/"
                    className="inline-block px-6 py-3 bg-accent hover:bg-secondary rounded-full font-semibold transition-colors"
                >
                    홈으로 돌아가기
                </Link>
            </div>
        </div>
    );
}
