import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="border-b bg-white sticky top-0 z-40">
            <div className="max-w-[1360px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="font-extrabold text-xl text-gray-900 tracking-tight flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    <span>Emlak<span className="text-emerald-600">Portalı</span></span>
                </Link>

                <div className="flex gap-6 items-center text-sm font-semibold text-gray-700">
                    <Link href="/ilanlar?type=SATILIK" className="hover:text-emerald-600 transition">
                        Satılık
                    </Link>
                    <Link href="/ilanlar?type=KIRALIK" className="hover:text-emerald-600 transition">
                        Kiralık
                    </Link>
                    <Link href="/ilanlar?category=Dükkan" className="hover:text-emerald-600 transition">
                        Dükkan
                    </Link>
                    <Link href="/ilanlar" className="text-gray-500 hover:text-black transition">
                        Tüm İlanlar
                    </Link>
                    <Link
                        href="/admin"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold transition shadow-sm"
                    >
                        + İlan Ekle
                    </Link>
                </div>
            </div>
        </nav>
    );
}
