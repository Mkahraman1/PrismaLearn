import { Property, Category, Agent } from "@prisma/client";
import Link from "next/link";

type PropertyWithRelations = Property & {
    category?: Category | null;
    agent?: Agent | null;
};

export default function ListingRowCard({ property }: { property: PropertyWithRelations }) {
    const imageUrl =
        property.imageUrl ||
        "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=80";

    const phone = property.agent?.phone || "05321002030";
    const waLink = `https://wa.me/${phone}?text=${encodeURIComponent(
        `Merhaba, #${property.id} numaralı ${property.title} ilanınız hakkında bilgi almak istiyorum.`
    )}`;

    const roomText = property.bedrooms > 0 ? `${property.bedrooms}+1` : (property.category?.name || "Ticari");

    return (
        <div className="group bg-white border border-gray-200/90 rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row">
            <Link
                href={`/ilanlar/${property.id}`}
                className="w-full sm:w-[260px] md:w-[290px] h-52 sm:h-auto relative flex-shrink-0 bg-gray-100 overflow-hidden block"
            >
                <img
                    src={imageUrl}
                    alt={property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                    <span className="bg-blue-600 text-white text-[11px] font-extrabold px-2.5 py-0.5 rounded shadow-sm tracking-wide">
                        ÖNE ÇIKAN
                    </span>
                    <span className="bg-white/95 backdrop-blur text-gray-900 text-xs font-bold px-2 py-0.5 rounded shadow-sm">
                        {property.type}
                    </span>
                </div>
            </Link>

            <div className="flex-1 p-5 flex flex-col justify-between">
                <div>
                    <div className="flex items-center gap-2 mb-1.5">
                        {property.category && (
                            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                                {property.category.name}
                            </span>
                        )}
                        <span className="text-xs text-gray-400">İlan No: #{property.id}</span>
                    </div>

                    <Link href={`/ilanlar/${property.id}`} className="block">
                        <h3 className="font-bold text-gray-900 text-base md:text-lg group-hover:text-emerald-600 transition line-clamp-2 leading-snug">
                            {property.title}
                        </h3>
                    </Link>

                    <p className="text-xs text-gray-500 mt-2 flex items-center gap-1.5 font-medium">
                        <svg className="w-3.5 h-3.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                            <circle cx="12" cy="10" r="3" />
                        </svg>
                        <span>{property.district}, {property.city}</span>
                    </p>

                    <div className="text-xs text-gray-500 font-medium mt-2 flex items-center gap-2 flex-wrap">
                        <span>{roomText}</span>
                        <span>•</span>
                        <span>{property.area} m²</span>
                        <span>•</span>
                        <span>{property.floor || "1. Kat"}</span>
                        <span>•</span>
                        <span>{new Date(property.createdAt).toLocaleDateString("tr-TR")}</span>
                    </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-baseline gap-1">
                    <span className="text-2xl font-black text-gray-900 tracking-tight">
                        {property.price.toLocaleString("tr-TR")}
                    </span>
                    <span className="text-base font-bold text-gray-600">TL</span>
                </div>
            </div>

            <div className="sm:w-[220px] p-5 flex flex-col justify-between items-stretch border-t sm:border-t-0 sm:border-l border-gray-100 bg-gray-50/50">
                <div className="flex justify-between sm:justify-end items-center mb-4">
                    <span className="text-[11px] font-semibold text-gray-400 sm:hidden">Yetkili Acente</span>
                    <button className="text-gray-400 hover:text-red-500 transition p-1">
                        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                </div>

                <div className="mb-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-sm shadow-sm flex-shrink-0">
                            {property.agent?.name ? property.agent.name[0] : "E"}
                        </div>
                        <div className="min-w-0">
                            <div className="text-xs font-bold text-gray-900 truncate">
                                {property.agent?.name || "Emlak Danışmanı"}
                            </div>
                            <div className="text-[11px] text-gray-500 truncate">Yetkili Portföy</div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <a
                        href={`tel:${phone}`}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-center transition flex items-center justify-center gap-1.5 text-xs shadow-sm"
                    >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.49a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.25 1.02l-2.22 2.09z" />
                        </svg>
                        <span>Ara</span>
                    </a>

                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-white hover:bg-gray-50 text-emerald-700 border border-emerald-300 font-bold py-2 px-4 rounded-xl text-center transition flex items-center justify-center gap-1.5 text-xs"
                    >
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
