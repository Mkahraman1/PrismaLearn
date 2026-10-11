import { getPropertyById } from "@/actions/property";
import PropertyGallery from "@/components/PropertyGallery";
import StickyPropertyBar from "@/components/StickyPropertyBar";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PropertyDetailPage(props: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await props.params;
    const propertyId = parseInt(id);

    if (isNaN(propertyId)) {
        notFound();
    }

    const property = await getPropertyById(propertyId);

    if (!property) {
        notFound();
    }

    const mainImage =
        property.imageUrl ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&auto=format&fit=crop&q=80";

    const allImages =
        property.images && property.images.length > 0
            ? property.images
            : [mainImage];

    const phone = property.agent?.phone || "05321002030";
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(
        `Merhaba, #${property.id} numaralı ${property.title} ilanınız hakkında bilgi almak istiyorum.`
    )}`;

    const roomText = property.bedrooms > 0 ? `${property.bedrooms}+1` : (property.category?.name || "Ticari");
    const specsText = `${property.category?.name || "Daire"} | ${roomText} | ${property.area} m² | ${property.floor || "Giriş Kat"}`;

    const mapQuery = encodeURIComponent(`${property.district}, ${property.city}, Türkiye`);
    const mapEmbedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

    const internalFeatures = [
        "ADSL / Fiber İnternet",
        "Ankastre Mutfak",
        "Balkon",
        "Çelik Kapı",
        "Duşakabin",
        "Ebeveyn Banyosu",
        "Isıcam",
        "Laminat Parke",
        "Klima Altyapısı",
        "Gömme Dolap",
    ];

    const externalFeatures = [
        "Asansör",
        "Isı Yalıtımı",
        "Açık / Kapalı Otopark",
        "7/24 Güvenlik & Kamera",
        "Su Deposu",
        "Jeneratör",
        "Yangın Merdiveni",
        "Site İçi Peyzaj",
    ];

    const neighborhoodFeatures = [
        "Metro / Metrobüs",
        "Otobüs Durağı",
        "Alışveriş Merkezi",
        "Hastane / Sağlık Ocağı",
        "İlk & Orta Dereceli Okul",
        "Semt Pazarı & Market",
        "Sahil / Yürüyüş Parkuru",
        "Eczane",
    ];

    return (
        <>
            <StickyPropertyBar
                title={property.title}
                price={property.price}
                specs={specsText}
                phone={phone}
                waLink={waLink}
            />

            <main className="max-w-[1360px] mx-auto px-4 md:px-8 py-6 w-full space-y-8">
                <div className="text-xs md:text-sm text-gray-500 flex items-center gap-2">
                    <Link href="/" className="hover:text-emerald-600 transition flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                        </svg>
                        <span>Ana Sayfa</span>
                    </Link>
                    <span>/</span>
                    <Link href={`/ilanlar?type=${property.type}`} className="hover:text-emerald-600 transition">
                        {property.type === "SATILIK" ? "Satılık" : "Kiralık"}
                    </Link>
                    <span>/</span>
                    <Link href={`/ilanlar?city=${property.city}`} className="hover:text-emerald-600 transition">
                        {property.city}
                    </Link>
                    <span>/</span>
                    <span>{property.district}</span>
                    <span>/</span>
                    <span className="text-gray-900 font-semibold">#{property.id}</span>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start w-full">
                    <div className="flex-1 min-w-0 w-full">
                        <PropertyGallery images={allImages} propertyId={property.id} />
                    </div>

                    <div className="w-full lg:w-[360px] flex-shrink-0 space-y-6">
                        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm">
                            <div className="text-xs text-gray-500 font-medium mb-1">Fiyat</div>
                            <div className="text-3xl font-black text-red-600 mb-3 tracking-tight">
                                {property.price.toLocaleString("tr-TR")} TL
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-600 pt-3 border-t">
                                <span>{property.category?.name || "Konut"}</span>
                                <span>•</span>
                                <span>{roomText}</span>
                                <span>•</span>
                                <span>{property.area} m²</span>
                                <span>•</span>
                                <span>{property.floor || "1. Kat"}</span>
                            </div>
                        </div>

                        <div className="bg-white border border-gray-200/90 rounded-2xl p-6 shadow-sm">
                            <h3 className="font-bold text-gray-900 mb-4 pb-3 border-b text-sm">Yetkili İlan Danışmanı</h3>
                            <div className="flex items-center gap-3.5 mb-6">
                                <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-lg shadow-inner">
                                    {property.agent?.name ? property.agent.name[0] : "E"}
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 text-sm">
                                        {property.agent?.name || "Emlak Danışmanı"}
                                    </h4>
                                    <p className="text-xs text-gray-500">Profesyonel Gayrimenkul Danışmanı</p>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <a
                                    href={`tel:${phone}`}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-xl text-center transition flex items-center justify-center gap-2 text-sm shadow-sm"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.49a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.25 1.02l-2.22 2.09z" />
                                    </svg>
                                    <span>Hemen Ara</span>
                                </a>

                                <a
                                    href={waLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-xl text-center transition flex items-center justify-center gap-2 text-sm shadow-sm"
                                >
                                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 01-1.25-4.38c0-4.5 3.66-8.15 8.16-8.15 2.18 0 4.23.85 5.77 2.39a8.118 8.118 0 012.39 5.76c0 4.5-3.66 8.15-8.16 8.15z" />
                                    </svg>
                                    <span>WhatsApp'tan Yaz</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white border border-gray-200/90 rounded-2xl p-6 md:p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b pb-6 mb-6">
                        <div>
                            <div className="flex gap-2 mb-2">
                                <span className="bg-emerald-100 text-emerald-800 font-bold text-xs px-2.5 py-1 rounded">
                                    {property.type}
                                </span>
                                {property.category && (
                                    <span className="bg-gray-100 text-gray-800 font-semibold text-xs px-2.5 py-1 rounded">
                                        {property.category.name}
                                    </span>
                                )}
                                <span className="text-xs text-gray-400 py-1">İlan No: #{property.id}</span>
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                                {property.title}
                            </h1>
                            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                                <span>{property.district}, {property.city}</span>
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-xs md:text-sm text-gray-700 hover:bg-gray-50 font-medium transition">
                                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                                </svg>
                                <span>Favoriye Ekle</span>
                            </button>
                            <button className="flex items-center gap-2 border border-gray-200 px-4 py-2 rounded-xl text-xs md:text-sm text-gray-700 hover:bg-gray-50 font-medium transition">
                                <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="18" cy="5" r="3" />
                                    <circle cx="6" cy="12" r="3" />
                                    <circle cx="18" cy="19" r="3" />
                                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                                </svg>
                                <span>Paylaş</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3.5 text-sm max-w-3xl mb-8">
                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">İlan Tarihi</span>
                            <span className="font-semibold text-gray-800">
                                {new Date(property.createdAt).toLocaleDateString("tr-TR")}
                            </span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Emlak Türü</span>
                            <span className="font-semibold text-gray-800">{property.type}</span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Kategori</span>
                            <span className="font-semibold text-gray-800">{property.category?.name || "Daire"}</span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Oda Sayısı</span>
                            <span className="font-semibold text-gray-800">{roomText}</span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Net / Brüt m²</span>
                            <span className="font-semibold text-gray-800">{property.area} m²</span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Bulunduğu Kat</span>
                            <span className="font-semibold text-gray-800">{property.floor || "1. Kat"}</span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">Banyo Sayısı</span>
                            <span className="font-semibold text-gray-800">{property.bathrooms}</span>
                        </div>

                        <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-500">İlan Durumu</span>
                            <span className="font-semibold text-emerald-600">Yayında</span>
                        </div>
                    </div>

                    <div className="pt-6 border-t mb-8">
                        <h2 className="text-lg font-bold mb-3 text-gray-900">Açıklama</h2>
                        <p className="text-gray-700 whitespace-pre-line leading-relaxed text-sm">
                            {property.description}
                        </p>
                    </div>

                    <div className="pt-6 border-t mb-8">
                        <h2 className="text-lg font-bold mb-4 text-gray-900">Öne Çıkan Nitelikler & Donanım</h2>

                        <div className="space-y-6">
                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">İç Özellikler</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                                    {internalFeatures.map((feat) => (
                                        <div key={feat} className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                            <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="truncate">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Bina & Dış Özellikler</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                                    {externalFeatures.map((feat) => (
                                        <div key={feat} className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                            <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="truncate">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Muhit & Ulaşım İmkanları</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
                                    {neighborhoodFeatures.map((feat) => (
                                        <div key={feat} className="flex items-center gap-2 text-xs text-gray-700 bg-gray-50 p-2.5 rounded-xl border border-gray-100">
                                            <svg className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                            <span className="truncate">{feat}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 border-t">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
                            <div>
                                <h2 className="text-lg font-bold text-gray-900">Konum ve Çevre Haritası</h2>
                                <p className="text-xs text-gray-500">
                                    {property.district}, {property.city} bölgesindeki yaklaşık konumu
                                </p>
                            </div>
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                                Konum Doğrulandı
                            </span>
                        </div>

                        <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-[320px] md:h-[400px] w-full relative bg-gray-100">
                            <iframe
                                title="İlan Konum Haritası"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                scrolling="no"
                                marginHeight={0}
                                marginWidth={0}
                                src={mapEmbedUrl}
                                className="w-full h-full"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}
