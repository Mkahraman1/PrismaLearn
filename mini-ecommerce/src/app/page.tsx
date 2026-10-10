import { getProducts, getCategories } from "@/actions/product";
import ProductCard from "@/components/ProductCard";
import ProductForm from "@/components/ProductForm";

export default async function HomePage() {
  const products = await getProducts();
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <ProductForm categories={categories} />

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Tum Urunler
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Veritabanindaki guncel urun listesi
            </p>
          </div>
          <span className="text-xs font-semibold bg-white border text-gray-700 px-3 py-1.5 rounded-lg shadow-sm">
            Toplam: {products.length} Urun
          </span>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-16 bg-white border border-dashed rounded-xl">
            <span className="text-4xl block mb-2">📦</span>
            <h3 className="text-lg font-bold text-gray-900">Henuz urun yok</h3>
            <p className="text-gray-500 text-sm mt-1">
              Yukaridaki formdan ilk urununu ekleyebilirsin.
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
