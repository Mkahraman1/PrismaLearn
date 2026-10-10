import { deleteProduct } from "@/actions/product";

interface ProductCardProps {
  product: {
    id: number;
    title: string;
    description: string | null;
    price: number;
    stock: number;
    category: {
      name: string;
    };
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white border rounded-xl p-4 shadow-sm flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded font-medium">
            {product.category.name}
          </span>
          <span className="text-xs text-gray-500">
            Stok: {product.stock}
          </span>
          <form action={deleteProduct.bind(null, product.id)}>
            <button
              type="submit"
              className="text-xs text-red-500 hover:text-red-700 font-medium px-1.5 py-0.5 rounded hover:bg-red-50 transition"
            >
              Sil
            </button>
          </form>
        </div>

        <h3 className="font-bold text-gray-900 text-lg">
          {product.title}
        </h3>

        {product.description && (
          <p className="text-gray-600 text-sm mt-1">
            {product.description}
          </p>
        )}
      </div>

      <div className="mt-4 pt-3 border-t flex justify-between items-center">
        <span className="font-bold text-lg text-gray-900">
          {product.price} TL
        </span>
        <button
          type="button"
          className="bg-black text-white text-sm px-4 py-2 rounded-lg cursor-pointer"
        >
          Sepete Ekle
        </button>
      </div>
    </div>
  );
}
