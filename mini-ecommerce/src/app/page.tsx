import { getProducts, getCategories } from "@/actions/product";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  // 1. URL'deki '?category=1' parametresini oku:
  const params = await searchParams;
  const selectedCategoryId = params.category ? parseInt(params.category) : undefined;

  // 2. Filtrelenmiş ürünleri ve kategori listesini çek:
  const products = await getProducts(selectedCategoryId);
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Başlık */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Tum Urunler</h1>
            <p className="text-gray-500 text-sm mt-1">
              Veritabanindaki guncel urun listesi
            </p>
          </div>
          <span className="text-xs font-semibold bg-white border text-gray-700 px-3 py-1.5 rounded-lg shadow-sm">
            Toplam: {products.length} Urun
          </span>
        </div>

        {/* Kategori Filtre Butonları */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Link
            href="/"
            className={`text-sm px-4 py-2 rounded-lg font-medium transition ${
              !selectedCategoryId
                ? "bg-black text-white"
                : "bg-white text-gray-700 border hover:bg-gray-100"
            }`}
          >
            Tumu
          </Link>

          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/?category=${cat.id}`}
              className={`text-sm px-4 py-2 rounded-lg font-medium transition ${
                selectedCategoryId === cat.id
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Ürün Listesi */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed rounded-xl">
            <span className="text-4xl block mb-2">📦</span>
            <h3 className="text-lg font-bold text-gray-900">Bu kategoride urun yok</h3>
            <p className="text-gray-500 text-sm mt-1">
              Farkli bir kategori secebilir veya admin panelinden urun ekleyebilirsin.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}
