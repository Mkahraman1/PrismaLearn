"use client";

import { useState } from "react";

export default function PropertyGallery({
    images = [],
    propertyId,
}: {
    images?: string[];
    propertyId: number;
}) {
    const fallbackImages = [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1200&auto=format&fit=crop&q=80",
    ];

    const imageList = images && images.length > 1 ? images : fallbackImages;
    const [activeIdx, setActiveIdx] = useState(0);

    const prevImage = () => {
        setActiveIdx((prev) => (prev === 0 ? imageList.length - 1 : prev - 1));
    };

    const nextImage = () => {
        setActiveIdx((prev) => (prev === imageList.length - 1 ? 0 : prev + 1));
    };

    return (
        <div className="w-full">
            <div className="relative w-full h-[480px] bg-gray-900 rounded-2xl overflow-hidden select-none">
                <img
                    src={imageList[activeIdx]}
                    alt=""
                    className="w-full h-full object-cover"
                />

                <div className="absolute top-4 left-4 bg-[#1a237e] text-white text-xs font-semibold px-3.5 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                    <span className="text-red-500">❤️</span>
                    <span>Bu ilan son günlerde 100+ kez incelendi, acele et!</span>
                </div>

                <button className="absolute top-4 right-4 bg-white/90 hover:bg-white text-gray-700 w-10 h-10 rounded-full flex items-center justify-center shadow transition hover:scale-105 active:scale-95">
                    <svg className="w-5 h-5 fill-current text-gray-600 hover:text-red-500 transition" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                </button>

                <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 w-11 h-11 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition"
                >
                    <svg className="w-6 h-6 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 18l-6-6 6-6" />
                    </svg>
                </button>
                <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white text-gray-800 w-11 h-11 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition"
                >
                    <svg className="w-6 h-6 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                    </svg>
                </button>

                <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur text-white text-xs font-medium px-3 py-1.5 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-black/80 transition">
                    <span>🔍</span>
                    <span>Dev Foto</span>
                </div>

                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/75 backdrop-blur text-white text-xs font-bold px-3.5 py-1 rounded-md">
                    {activeIdx + 1} / {imageList.length}
                </div>

                <div className="absolute bottom-4 right-4 text-white/80 text-xs font-mono drop-shadow">
                    #{propertyId}
                </div>
            </div>

            <div className="flex gap-2.5 mt-3 overflow-x-auto pb-2">
                {imageList.map((img, idx) => (
                    <button
                        key={idx}
                        onClick={() => setActiveIdx(idx)}
                        className={`relative flex-shrink-0 w-28 h-18 rounded-xl overflow-hidden border-2 transition ${
                            activeIdx === idx
                                ? "border-red-600 ring-2 ring-red-100 shadow"
                                : "border-transparent opacity-75 hover:opacity-100"
                        }`}
                    >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
