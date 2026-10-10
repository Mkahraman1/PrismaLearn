import { createProduct } from "@/actions/product";

interface ProductFormProps {
  categories: {
    id: number;
    name: string;
  }[];
}

export default function ProductForm({ categories }: ProductFormProps) {
  return (
    <div className="bg-white border rounded-xl p-6 shadow-sm mb-8">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Yeni Urun Ekle
      </h2>

      <form action={createProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Urun Adi
          </label>
          <input
            type="text"
            name="title"
            required
            placeholder="Urun adi girin"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Kategori
          </label>
          <select
            name="categoryId"
            required
            className="w-full border rounded-lg px-3 py-2 text-sm bg-white"
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Fiyat (TL)
          </label>
          <input
            type="number"
            step="0.01"
            name="price"
            required
            placeholder="0.00"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Stok Adedi
          </label>
          <input
            type="number"
            name="stock"
            required
            defaultValue="10"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Aciklama
          </label>
          <textarea
            name="description"
            rows={2}
            placeholder="Urun aciklamasi (opsiyonel)"
            className="w-full border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded-lg text-sm font-medium cursor-pointer"
          >
            Kaydet
          </button>
        </div>
      </form>
    </div>
  );
}
