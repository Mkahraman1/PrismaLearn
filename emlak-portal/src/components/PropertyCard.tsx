export default function PropertyCard({ property }: { property: any }) {
    const imageUrl =
        property.imageUrl ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80";

    const phone = property.agent?.phone || "905550000000";
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(
        `Merhaba, ${property.title} ilanınız hakkında bilgi almak istiyorum.`
    )}`;

    return (
        <div className="group border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
            <div className="relative h-52 w-full overflow-hidden bg-gray-100">
                <img
                    src={imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/95 backdrop-blur text-xs font-bold px-2.5 py-1 rounded-lg text-gray-900 shadow-sm">
                        {property.type}
                    </span>
                    {property.category && (
                        <span className="bg-red-600 text-white text-xs font-semibold px-2.5 py-1 rounded-lg shadow-sm">
                            {property.category.name}
                        </span>
                    )}
                </div>
                <button className="absolute top-3 right-3 bg-white/95 backdrop-blur w-8 h-8 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm transition">
                    ♥
                </button>
            </div>

            <div className="p-4 flex flex-col flex-1 justify-between">
                <div>
                    <div className="text-2xl font-black text-gray-900 mb-1">
                        {property.price.toLocaleString("tr-TR")} TL
                    </div>

                    <h3 className="font-semibold text-gray-800 text-sm mb-1.5 line-clamp-1">
                        {property.title}
                    </h3>

                    <div className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-1.5">
                        <span>{property.bedrooms}+1</span>
                        <span>•</span>
                        <span>{property.area} m²</span>
                        <span>•</span>
                        <span>{property.floor || "1. Kat"}</span>
                    </div>

                    <div className="text-xs text-gray-400 flex items-center gap-1 mb-4">
                        <span>📍</span>
                        <span>{property.district} / {property.city}</span>
                    </div>
                </div>

                <div className="flex gap-2 pt-3 border-t border-gray-100">
                    <a
                        href={`tel:${phone}`}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 px-3 rounded-xl text-center transition shadow-sm flex items-center justify-center gap-1"
                    >
                        <span>📞</span>
                        <span>Telefon</span>
                    </a>

                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold py-2.5 px-3 rounded-xl text-center transition flex items-center justify-center gap-1"
                    >
                        <span>💬</span>
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
