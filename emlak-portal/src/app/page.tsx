import { getProperties } from "@/actions/property";
import PropertyCard from "@/components/PropertyCard";

export default async function Home() {
  const properties = await getProperties();
  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">
        Güncel Emlak İlanları
      </h1>
      {properties.length === 0 && (
        <p className="text-gray-500">Henüz hiç ilan eklenmedi</p>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((item) => (
          <PropertyCard key={item.id} property={item} />
        ))}
      </div>
    </main>
  )
}