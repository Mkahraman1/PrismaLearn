"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HeroSearch({
    initialType = "SATILIK",
    initialCity = "",
    initialCategory = "",
}: {
    initialType?: string;
    initialCity?: string;
    initialCategory?: string;
}) {
    const router = useRouter();
    const [type, setType] = useState(initialType || "SATILIK");
    const [city, setCity] = useState(initialCity);

    const handleTypeChange = (newType: string) => {
        setType(newType);
        const params = new URLSearchParams();
        if (newType) params.set("type", newType);
        if (city.trim()) params.set("city", city.trim());
        if (initialCategory) params.set("category", initialCategory);
        router.push(`/ilanlar?${params.toString()}`);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (type) params.set("type", type);
        if (city.trim()) params.set("city", city.trim());
        if (initialCategory) params.set("category", initialCategory);
        router.push(`/ilanlar?${params.toString()}`);
    };

    return (
        <div className="relative rounded-3xl overflow-hidden mb-10 shadow-lg bg-gray-950 select-none w-full">
            <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&auto=format&fit=crop&q=80"
                alt="Emlak Vitrin"
                className="w-full h-[320px] md:h-[360px] object-cover opacity-50"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/30 flex flex-col items-center justify-center px-4 md:px-8 text-center">
                <h1 className="text-2xl md:text-4xl font-extrabold text-white mb-6 tracking-tight drop-shadow-sm">
                    Akıllı İlanlar, Doğru Kararlar
                </h1>

                <div className="w-full max-w-2xl">
                    <div className="flex gap-1 mb-0 justify-start pl-3">
                        <button
                            type="button"
                            onClick={() => handleTypeChange("SATILIK")}
                            className={`px-6 py-2.5 rounded-t-xl text-xs font-bold transition ${
                                type === "SATILIK"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "bg-black/40 text-white/80 hover:bg-black/60 backdrop-blur"
                            }`}
                        >
                            Satılık
                        </button>
                        <button
                            type="button"
                            onClick={() => handleTypeChange("KIRALIK")}
                            className={`px-6 py-2.5 rounded-t-xl text-xs font-bold transition ${
                                type === "KIRALIK"
                                    ? "bg-white text-gray-900 shadow-sm"
                                    : "bg-black/40 text-white/80 hover:bg-black/60 backdrop-blur"
                            }`}
                        >
                            Kiralık
                        </button>
                    </div>

                    <form
                        onSubmit={handleSearch}
                        className="bg-white p-2 rounded-2xl rounded-tl-none shadow-2xl flex items-center gap-2"
                    >
                        <div className="flex-1 pl-3">
                            <input
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                                placeholder="Kelime, semt veya şehir ile ara (Örn: Kadıköy, Dükkan)..."
                                className="w-full py-2.5 text-sm text-gray-800 outline-none bg-transparent placeholder-gray-400 font-medium"
                            />
                        </div>

                        <button
                            type="submit"
                            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm whitespace-nowrap active:scale-95"
                        >
                            <svg className="w-4 h-4 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.3-4.3" />
                            </svg>
                            <span>Ara</span>
                        </button>
                    </form>

                    <div className="flex flex-wrap items-center justify-center gap-2 mt-4 text-xs">
                        <button
                            type="button"
                            onClick={() => router.push("/ilanlar?type=SATILIK&category=Daire")}
                            className="bg-black/40 hover:bg-black/60 text-white/90 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur transition"
                        >
                            Satılık Daire
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/ilanlar?type=KIRALIK&category=Daire")}
                            className="bg-black/40 hover:bg-black/60 text-white/90 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur transition"
                        >
                            Kiralık Daire
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/ilanlar?category=Dükkan")}
                            className="bg-black/40 hover:bg-black/60 text-white/90 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur transition"
                        >
                            Dükkan & Mağaza
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/ilanlar?category=Villa")}
                            className="bg-black/40 hover:bg-black/60 text-white/90 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur transition"
                        >
                            Müstakil Villa
                        </button>
                        <button
                            type="button"
                            onClick={() => router.push("/ilanlar")}
                            className="bg-black/40 hover:bg-black/60 text-white/90 border border-white/10 px-3.5 py-1.5 rounded-full backdrop-blur transition"
                        >
                            Tümünü Gör
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
