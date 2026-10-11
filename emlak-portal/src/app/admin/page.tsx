import { createProperty, getProperties, deleteProperty } from "@/actions/property";

export default async function AdminPage() {
    const properties = await getProperties();

    return (
        <main className="max-w-xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-6">
                Yeni İlan Ekle (Admin)
            </h1>

            <form action={createProperty} className="flex flex-col gap-4">
                <input
                    name="title"
                    type="text"
                    placeholder="İlan Başlığı (Örn: Kadıköy 3+1 Daire)"
                    required
                    className="border p-2 rounded"
                />

                <select name="type" className="border p-2 rounded bg-white">
                    <option value="SATILIK">Satılık</option>
                    <option value="KIRALIK">Kiralık</option>
                </select>

                <input
                    name="price"
                    type="number"
                    placeholder="Fiyat (TL)"
                    required
                    className="border p-2 rounded"
                />

                <div className="flex gap-2">
                    <input
                        name="city"
                        type="text"
                        placeholder="Şehir (Örn: İstanbul)"
                        required
                        className="border p-2 rounded flex-1"
                    />
                    <input
                        name="district"
                        type="text"
                        placeholder="İlçe (Örn: Kadıköy)"
                        required
                        className="border p-2 rounded flex-1"
                    />
                </div>

                <div className="flex gap-2">
                    <input
                        name="bedrooms"
                        type="number"
                        placeholder="Oda Sayısı (Örn: 3)"
                        required
                        className="border p-2 rounded flex-1"
                    />
                    <input
                        name="bathrooms"
                        type="number"
                        placeholder="Banyo (Örn: 1)"
                        required
                        className="border p-2 rounded flex-1"
                    />
                    <input
                        name="area"
                        type="number"
                        placeholder="m² (Örn: 120)"
                        required
                        className="border p-2 rounded flex-1"
                    />
                    <input
                        name="floor"
                        type="text"
                        placeholder="Kat (Örn: 3. Kat)"
                        className="border p-2 rounded flex-1"
                    />
                </div>

                <input
                    name="imageUrl"
                    type="url"
                    placeholder="Ana Kapak Görseli Linki (Örn: https://...)"
                    className="border p-2 rounded"
                />

                <textarea
                    name="images"
                    placeholder="Galeri Fotoğrafları (Her satıra bir fotoğraf linki yapıştırın)"
                    rows={3}
                    className="border p-2 rounded font-mono text-sm"
                />

                <textarea
                    name="description"
                    placeholder="İlan Açıklaması (Örn: Metroya yakın, güney cephe...)"
                    rows={3}
                    required
                    className="border p-2 rounded"
                />

                <button
                    type="submit"
                    className="bg-blue-600 text-white font-semibold py-2 px-4 rounded hover:bg-blue-700 transition"
                >
                    İlanı Kaydet
                </button>
            </form>

            <div className="mt-10 border-t pt-6">
                <h2 className="text-xl font-bold mb-4">Yayındaki İlanlar ({properties.length})</h2>

                <div className="flex flex-col gap-3">
                    {properties.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border p-3 rounded bg-white">
                            <div>
                                <p className="font-semibold">{item.title}</p>
                                <p className="text-xs text-gray-500">{item.city} - {item.price.toLocaleString("tr-TR")} ₺</p>
                            </div>

                            <form action={deleteProperty.bind(null, item.id)}>
                                <button
                                    type="submit"
                                    className="bg-red-500 text-white text-xs px-3 py-1.5 rounded hover:bg-red-600 transition"
                                >
                                    Sil
                                </button>
                            </form>
                        </div>
                    ))}
                </div>
            </div>
        </main>
    );
}