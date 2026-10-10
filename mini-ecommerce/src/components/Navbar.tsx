import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-bold text-xl text-black flex items-center gap-2">
          <span>🛍️</span>
          <span>MiniMarket</span>
        </Link>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-black">
            Vitrin
          </Link>
          <Link
            href="#yeni-urun"
            className="bg-black text-white text-sm font-medium px-4 py-2 rounded-lg"
          >
            + Yeni Urun Ekle
          </Link>
        </div>
      </div>
    </header>
  );
}
