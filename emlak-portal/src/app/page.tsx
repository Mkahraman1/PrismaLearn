import { getProperties } from "@/actions/property";
import PropertyCard from "@/components/PropertyCard";
import HeroSearch from "@/components/HeroSearch";
import Link from "next/link";

export default async function Home(props: {
    searchParams?: Promise<{ type?: string; city?: string; category?: string }>;
}) {
    const searchParams = props.searchParams ? await props.searchParams : {};
    const type = searchParams.type || "";
    const city = searchParams.city || "";
    const category = searchParams.category || "";

    const properties = await getProperties({ type, city, category });

    return (
        <main className="max-w-[1360px] mx-auto px-4 md:px-8 py-6 w-full">
            <HeroSearch initialType={type} initialCity={city} initialCategory={category} />

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mb-12">
                <Link
                    href="/ilanlar?type=SATILIK&category=Daire"
                    className="border border-gray-200/80 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md hover:border-emerald-500 transition text-center flex flex-col items-center justify-center gap-2.5 group"
                >
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition">
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                            <polyline points="9 22 9 12 15 12 15 22" />
                        </svg>
                    </div>
                    <span className="font-semibold text-xs md:text-sm text-gray-800">Satılık Daire</span>
                </Link>

                <Link
                    href="/ilanlar?type=KIRALIK&category=Daire"
                    className="border border-gray-200/80 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md hover:border-emerald-500 transition text-center flex flex-col items-center justify-center gap-2.5 group"
                >
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition">
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
                        </svg>
                    </div>
                    <span className="font-semibold text-xs md:text-sm text-gray-800">Kiralık Daire</span>
                </Link>

                <Link
                    href="/ilanlar?category=Dükkan"
                    className="border border-gray-200/80 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md hover:border-emerald-500 transition text-center flex flex-col items-center justify-center gap-2.5 group"
                >
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition">
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l2-5h14l2 5" />
                            <path d="M21 9v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9" />
                            <path d="M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0" />
                            <path d="M10 22v-6h4v6" />
                        </svg>
                    </div>
                    <span className="font-semibold text-xs md:text-sm text-gray-800">Dükkan & Mağaza</span>
                </Link>

                <Link
                    href="/ilanlar?category=Ofis"
                    className="border border-gray-200/80 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md hover:border-emerald-500 transition text-center flex flex-col items-center justify-center gap-2.5 group"
                >
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition">
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                            <line x1="9" y1="22" x2="9" y2="2" />
                            <line x1="8" y1="6" x2="8.01" y2="6" />
                            <line x1="16" y1="6" x2="16.01" y2="6" />
                            <line x1="16" y1="10" x2="16.01" y2="10" />
                            <line x1="16" y1="14" x2="16.01" y2="14" />
                            <line x1="16" y1="18" x2="16.01" y2="18" />
                        </svg>
                    </div>
                    <span className="font-semibold text-xs md:text-sm text-gray-800">Ofis & İş Yeri</span>
                </Link>

                <Link
                    href="/ilanlar?category=Villa"
                    className="border border-gray-200/80 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md hover:border-emerald-500 transition text-center flex flex-col items-center justify-center gap-2.5 group"
                >
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition">
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 11l10-8 10 8" />
                            <path d="M4 10.5V20a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-9.5" />
                            <path d="M9 22v-6h6v6" />
                            <line x1="9" y1="9" x2="15" y2="9" />
                        </svg>
                    </div>
                    <span className="font-semibold text-xs md:text-sm text-gray-800">Müstakil Villa</span>
                </Link>

                <Link
                    href="/ilanlar?category=Arsa"
                    className="border border-gray-200/80 rounded-2xl p-4 bg-white shadow-sm hover:shadow-md hover:border-emerald-500 transition text-center flex flex-col items-center justify-center gap-2.5 group"
                >
                    <div className="w-11 h-11 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-emerald-50 transition">
                        <svg className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                            <line x1="8" y1="2" x2="8" y2="18" />
                            <line x1="16" y1="6" x2="16" y2="22" />
                        </svg>
                    </div>
                    <span className="font-semibold text-xs md:text-sm text-gray-800">Yatırımlık Arsa</span>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-3 mb-6">
                <div>
                    <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 tracking-tight">
                        Öne Çıkan Vitrin Portföyü
                    </h2>
                    <p className="text-xs text-gray-500 mt-1">
                        Seçkin ve güncel emlak portföyümüz
                    </p>
                </div>

                <Link
                    href="/ilanlar"
                    className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 px-3.5 py-2 rounded-xl transition"
                >
                    <span>Tüm İlanları Gör ({properties.length})</span>
                    <span>→</span>
                </Link>
            </div>

            {properties.length === 0 ? (
                <div className="text-center py-16 bg-white border rounded-2xl">
                    <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                    <h3 className="font-bold text-gray-800 text-lg mb-1">Aradığınız kriterde ilan bulunamadı</h3>
                    <p className="text-gray-500 text-sm">Farklı bir kategori veya semt araması deneyebilirsiniz.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((item) => (
                        <PropertyCard key={item.id} property={item} />
                    ))}
                </div>
            )}
        </main>
    );
}
