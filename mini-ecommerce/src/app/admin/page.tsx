import { getCategories } from "@/actions/product";
import ProductForm from "@/components/ProductForm";

export default async function AdminPage() {
  const categories = await getCategories();

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Admin Paneli
        </h1>
        <ProductForm categories={categories} />
      </div>
    </main>
  );
}
