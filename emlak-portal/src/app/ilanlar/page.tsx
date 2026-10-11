import { getProperties } from "@/actions/property";
import ListingRowCard from "@/components/ListingRowCard";
import PropertyCard from "@/components/PropertyCard";
import Link from "next/link";

export default async function IlanlarPage(props: {
    searchParams?: Promise<{
        type?: string;
        category?: string;
        city?: string;
        minPrice?: string;
        maxPrice?: string;
        sort?: string;
        view?: string;
    }>;
}) {
    const searchParams = props.searchParams ? await props.searchParams : {};
    const type = searchParams.type || "";
    const category = searchParams.category || "";
    const city = searchParams.city || "";
    const minPrice = searchParams.minPrice ? parseFloat(searchParams.minPrice) : undefined;
    const maxPrice = searchParams.maxPrice ? parseFloat(searchParams.maxPrice) : undefined;
    const sort = searchParams.sort || "";
    const view = searchParams.view || "list";

    const properties = await getProperties({
        type,
        category,
        city,
        minPrice,
        maxPrice,
        sort,
    });

    const pageTitle = type
        ? `${type === "SATILIK" ? "Satılık" : "Kiralık"} ${category ? category : "Gayrimenkul"}`
        : category
        ? `${category} İlanları`
        : "Tüm Portföy İlanları";

    const buildUrl = (overrides: Record<string, string | undefined>) => {
        const params = new URLSearchParams();
        if (type) params.set("type", type);
        if (category) params.set("category", category);
        if (city) params.set("city", city);
        if (searchParams.minPrice) params.set("minPrice", searchParams.minPrice);
        if (searchParams.maxPrice) params.set("maxPrice", searchParams.maxPrice);
        if (sort) params.set("sort", sort);
        if (view) params.set("view", view);

        Object.entries(overrides).forEach(([key, val]) => {
            if (val === undefined || val === "") {
                params.delete(key);
            } else {
                params.set(key, val);
            }
        });

        const qs = params.toString();
        return qs ? `/ilanlar?${qs}` : "/ilanlar";
    };

    return (
        <main className="max-w-[1360px] mx-auto px-4 md:px-8 py-6 w-full">
            <div className="text-xs text-gray-500 mb-4 flex items-center gap-2">
                <Link href="/" className="hover:text-emerald-600 transition flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                    </svg>
                    <span>Ana Sayfa</span>
                </Link>
                <span>/</span>
                <span className="text-gray-900 font-semibold">{pageTitle}</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-3 mb-6 pb-4 border-b border-gray-200">
                <div>
                    <div className="flex items-center gap-3">
                        <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">
                            {pageTitle}
                        </h1>
                        <span className="bg-emerald-50 text-emerald-700 font-bold text-xs px-2.5 py-1 rounded-full border border-emerald-200">
                            {properties.length} ilan bulundu
                        </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                        Yetkili gayrimenkul danışmanlarımız tarafından güncel portföy
                    </p>
                </div>

                <div className="flex items-center gap-2 flex-wrap w-full md:w-auto justify-between md:justify-end">
                    <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                        <Link
                            href={buildUrl({ sort: "" })}
                            className={`px-3 py-1.5 rounded-lg transition ${
                                !sort ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-black"
                            }`}
                        >
                            En Yeni
                        </Link>
                        <Link
                            href={buildUrl({ sort: "price_asc" })}
                            className={`px-3 py-1.5 rounded-lg transition ${
                                sort === "price_asc" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-black"
                            }`}
                        >
                            Düşük Fiyat
                        </Link>
                        <Link
                            href={buildUrl({ sort: "price_desc" })}
                            className={`px-3 py-1.5 rounded-lg transition ${
                                sort === "price_desc" ? "bg-white text-gray-900 shadow-sm" : "text-gray-600 hover:text-black"
                            }`}
                        >
                            Yüksek Fiyat
                        </Link>
                    </div>

                    <div className="flex items-center bg-gray-100 p-1 rounded-xl text-gray-600">
                        <Link
                            href={buildUrl({ view: "list" })}
                            title="Liste Görünümü"
                            className={`p-1.5 rounded-lg transition ${
                                view === "list" ? "bg-white text-emerald-600 shadow-sm" : "hover:text-black"
                            }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="8" y1="6" x2="21" y2="6" />
                                <line x1="8" y1="12" x2="21" y2="12" />
                                <line x1="8" y1="18" x2="21" y2="18" />
                                <line x1="3" y1="6" x2="3.01" y2="6" />
                                <line x1="3" y1="12" x2="3.01" y2="12" />
                                <line x1="3" y1="18" x2="3.01" y2="18" />
                            </svg>
                        </Link>
                        <Link
                            href={buildUrl({ view: "grid" })}
                            title="Izgara Görünümü"
                            className={`p-1.5 rounded-lg transition ${
                                view === "grid" ? "bg-white text-emerald-600 shadow-sm" : "hover:text-black"
                            }`}
                        >
                            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="3" y="3" width="7" height="7" />
                                <rect x="14" y="3" width="7" height="7" />
                                <rect x="14" y="14" width="7" height="7" />
                                <rect x="3" y="14" width="7" height="7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <aside className="w-full lg:w-[280px] flex-shrink-0 space-y-5">
                    <div className="bg-white border border-gray-200/90 rounded-2xl p-5 shadow-sm">
                        <div className="flex items-center justify-between pb-3 border-b mb-4">
                            <h3 className="font-bold text-gray-900 text-sm">Filtreler</h3>
                            {(type || category || city || searchParams.minPrice || searchParams.maxPrice) && (
                                <Link
                                    href="/ilanlar"
                                    className="text-[11px] font-semibold text-emerald-600 hover:underline"
                                >
                                    Temizle
                                </Link>
                            )}
                        </div>

                        <div className="space-y-5 text-xs">
                            <div>
                                <label className="font-bold text-gray-700 block mb-2">İşlem Türü</label>
                                <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl text-center font-semibold">
                                    <Link
                                        href={buildUrl({ type: "" })}
                                        className={`py-1.5 rounded-lg transition ${
                                            !type ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-black"
                                        }`}
                                    >
                                        Tümü
                                    </Link>
                                    <Link
                                        href={buildUrl({ type: "SATILIK" })}
                                        className={`py-1.5 rounded-lg transition ${
                                            type === "SATILIK" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500 hover:text-black"
                                        }`}
                                    >
                                        Satılık
                                    </Link>
                                    <Link
                                        href={buildUrl({ type: "KIRALIK" })}
                                        className={`py-1.5 rounded-lg transition ${
                                            type === "KIRALIK" ? "bg-white text-emerald-700 shadow-sm" : "text-gray-500 hover:text-black"
                                        }`}
                                    >
                                        Kiralık
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <label className="font-bold text-gray-700 block mb-2">Kategori</label>
                                <div className="flex flex-col gap-1 font-medium">
                                    {[
                                        { label: "Tüm Kategoriler", val: "" },
                                        { label: "Daire (Konut)", val: "Daire" },
                                        { label: "Dükkan & Mağaza", val: "Dükkan" },
                                        { label: "Ofis & İş Yeri", val: "Ofis" },
                                        { label: "Müstakil Villa", val: "Villa" },
                                        { label: "Yatırımlık Arsa", val: "Arsa" },
                                    ].map((cat) => (
                                        <Link
                                            key={cat.val}
                                            href={buildUrl({ category: cat.val })}
                                            className={`px-3 py-2 rounded-xl transition flex items-center justify-between ${
                                                category === cat.val
                                                    ? "bg-emerald-50 text-emerald-700 font-bold"
                                                    : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                        >
                                            <span>{cat.label}</span>
                                            {category === cat.val && (
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <form action="/ilanlar" method="GET" className="space-y-3 pt-3 border-t">
                                {type && <input type="hidden" name="type" value={type} />}
                                {category && <input type="hidden" name="category" value={category} />}
                                {sort && <input type="hidden" name="sort" value={sort} />}
                                {view && <input type="hidden" name="view" value={view} />}

                                <div>
                                    <label className="font-bold text-gray-700 block mb-1">Şehir / Semt Ara</label>
                                    <input
                                        type="text"
                                        name="city"
                                        defaultValue={city}
                                        placeholder="Örn: Kadıköy, Sarıyer..."
                                        className="w-full border p-2 rounded-xl text-xs"
                                    />
                                </div>

                                <div>
                                    <label className="font-bold text-gray-700 block mb-1">Fiyat Aralığı (TL)</label>
                                    <div className="flex items-center gap-2">
                                        <input
                                            type="number"
                                            name="minPrice"
                                            defaultValue={searchParams.minPrice || ""}
                                            placeholder="Min TL"
                                            className="w-full border p-2 rounded-xl text-xs"
                                        />
                                        <span className="text-gray-400">-</span>
                                        <input
                                            type="number"
                                            name="maxPrice"
                                            defaultValue={searchParams.maxPrice || ""}
                                            placeholder="Max TL"
                                            className="w-full border p-2 rounded-xl text-xs"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-3 rounded-xl transition text-xs shadow-sm"
                                >
                                    Filtreleri Uygula
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="border border-gray-200/90 rounded-2xl p-4 bg-gradient-to-br from-emerald-50 to-blue-50 text-xs">
                        <div className="flex items-center gap-2 font-bold text-gray-900 mb-1">
                            <svg className="w-4 h-4 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                                <line x1="8" y1="2" x2="8" y2="18" />
                                <line x1="16" y1="6" x2="16" y2="22" />
                            </svg>
                            <span>Harita Üzerinden İncele</span>
                        </div>
                        <p className="text-gray-600 text-[11px] mb-3">
                            Tüm portföyümüzün konumlarını harita üzerinde interaktif olarak görüntüleyin.
                        </p>
                        <Link
                            href="/#vitrin"
                            className="bg-white border border-gray-200 text-gray-800 font-bold px-3 py-1.5 rounded-xl block text-center hover:bg-gray-50 transition"
                        >
                            Haritayı Aç
                        </Link>
                    </div>
                </aside>

                <div className="flex-1 min-w-0 w-full space-y-4">
                    {properties.length === 0 ? (
                        <div className="text-center py-20 bg-white border border-gray-200/90 rounded-2xl p-8">
                            <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <h3 className="font-bold text-gray-800 text-lg mb-1">Bu Kriterlere Uygun İlan Bulunamadı</h3>
                            <p className="text-gray-500 text-xs mb-4">Filtreleri sıfırlayarak tüm aktif portföyümüzü görüntüleyebilirsiniz.</p>
                            <Link
                                href="/ilanlar"
                                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition inline-block shadow-sm"
                            >
                                Tüm İlanları Göster
                            </Link>
                        </div>
                    ) : view === "grid" ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {properties.map((item) => (
                                <PropertyCard key={item.id} property={item} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4">
                            {properties.map((item) => (
                                <ListingRowCard key={item.id} property={item} />
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
