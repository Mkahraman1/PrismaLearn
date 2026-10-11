"use client";

import { useEffect, useState } from "react";

export default function StickyPropertyBar({
    title,
    price,
    specs,
    phone,
    waLink,
}: {
    title: string;
    price: number;
    specs: string;
    phone: string;
    waLink: string;
}) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 450) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (!visible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white border-b shadow-md transition-all duration-300">
            <div className="max-w-[1360px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 text-sm truncate">{title}</h3>
                    <p className="text-xs text-gray-500">{specs}</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="text-xl font-extrabold text-red-600 whitespace-nowrap">
                        {price.toLocaleString("tr-TR")} TL
                    </div>

                    <a
                        href={`tel:${phone}`}
                        className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5 shadow-sm"
                    >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.02-.24 11.72 11.72 0 003.68.59 1 1 0 011 1v3.49a1 1 0 01-1 1A17.93 17.93 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.59 3.68a1 1 0 01-.25 1.02l-2.22 2.09z" />
                        </svg>
                        <span>Hemen Ara</span>
                    </a>

                    <a
                        href={waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-300 text-xs font-semibold px-4 py-2.5 rounded-xl transition whitespace-nowrap flex items-center gap-1.5"
                    >
                        <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.12 8.12 0 01-1.25-4.38c0-4.5 3.66-8.15 8.16-8.15 2.18 0 4.23.85 5.77 2.39a8.118 8.118 0 012.39 5.76c0 4.5-3.66 8.15-8.16 8.15z" />
                        </svg>
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
