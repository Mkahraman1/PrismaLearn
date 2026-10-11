import { Property, Category, Agent } from "@prisma/client";
import Link from "next/link";

type PropertyWithRelations = Property & {
    category?: Category | null;
    agent?: Agent | null;
};

export default function PropertyCard({ property }: { property: PropertyWithRelations }) {
    const imageUrl =
        property.imageUrl ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80";

    const phone = property.agent?.phone || "05321002030";
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(
        `Merhaba, #${property.id} numaralı ${property.title} ilanınız hakkında bilgi almak istiyorum.`
    )}`;

    return (
        <div className="group border border-gray-100 rounded-2xl bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between">
            <Link href={`/ilanlar/${property.id}`} className="block">
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
                </div>

                <div className="p-4 pb-0">
                    <div className="text-2xl font-black text-gray-900 mb-1">
                        {property.price.toLocaleString("tr-TR")} TL
                    </div>

                    <h3 className="font-semibold text-gray-800 text-sm mb-1.5 line-clamp-1 group-hover:text-red-600 transition">
                        {property.title}
                    </h3>

                    <div className="text-xs text-gray-500 font-medium mb-1.5 flex items-center gap-1.5">
                        {property.bedrooms > 0 ? (
                            <span>{property.bedrooms}+1</span>
                        ) : (
                            <span>{property.category?.name || "Ticari"}</span>
                        )}
                        <span>•</span>
                        <span>{property.area} m²</span>
                        <span>•</span>
                        <span>{property.floor || "1. Kat"}</span>
                    </div>

                    <div className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                        <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{property.district} / {property.city}</span>
                    </div>
                </div>
            </Link>

            <div className="p-4 pt-3 flex gap-2 border-t border-gray-100">
                <a
                    href={`tel:${phone}`}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold py-2.5 px-3 rounded-xl text-center transition shadow-sm flex items-center justify-center gap-1.5"
                >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.49a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.25 1.02l-2.22 2.09z" />
                    </svg>
                    <span>Telefon</span>
                </a>

                <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 text-xs font-semibold py-2.5 px-3 rounded-xl text-center transition flex items-center justify-center gap-1.5"
                >
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 01-1.25-4.38c0-4.5 3.66-8.15 8.16-8.15 2.18 0 4.23.85 5.77 2.39a8.118 8.118 0 012.39 5.76c0 4.5-3.66 8.15-8.16 8.15z" />
                    </svg>
                    <span>WhatsApp</span>
                </a>
            </div>
        </div>
    );
}
