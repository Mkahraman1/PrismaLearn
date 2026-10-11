import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b bg-white">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-xl text-blue-600">
                    🏠 EmlakPortalı
                </Link>
                <div className="flex gap-4 items-center">
                    <Link href="/" className="text-gray-600 hover:text-black">
                        İlanlar
                    </Link>
                    <Link
                        href="/admin"
                        className="bg-blue-600 text-white px-3 py-1.5 rounded text-sm hover:bg-blue-700 transition"
                    >
                        + İlan Ekle
                    </Link>
                </div>
            </div>
        </nav>
    );
}
