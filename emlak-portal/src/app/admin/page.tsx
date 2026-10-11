import { createProperty, getProperties, deleteProperty } from "@/actions/property";
import { prisma } from "@/lib/prisma";

export default async function AdminPage() {
    const properties = await getProperties();
    const categories = await prisma.category.findMany();
    const agents = await prisma.agent.findMany();

    return (
        <main className="max-w-2xl mx-auto p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Yeni İlan Ekle</h1>
                    <p className="text-xs text-gray-500 mt-1">Emlak ofisi yetkili ilan yönetim paneli</p>
                </div>
            </div>

            <form
                action={createProperty}
                encType="multipart/form-data"
                className="flex flex-col gap-4 bg-white p-6 rounded-2xl border shadow-sm"
            >
                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">İlan Başlığı</label>
                    <input
                        name="title"
                        type="text"
                        placeholder="Örn: Bağdat Caddesi'nde Satılık 210 m² Köşe Dükkan"
                        required
                        className="w-full border p-2.5 rounded-xl text-sm"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">İşlem Türü</label>
                        <select name="type" className="w-full border p-2.5 rounded-xl text-sm bg-white">
                            <option value="SATILIK">Satılık</option>
                            <option value="KIRALIK">Kiralık</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Kategori</label>
                        <select name="categoryId" className="w-full border p-2.5 rounded-xl text-sm bg-white">
                            {categories.map((c) => (
                                <option key={c.id} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Yetkili Danışman</label>
                        <select name="agentId" className="w-full border p-2.5 rounded-xl text-sm bg-white">
                            {agents.map((a) => (
                                <option key={a.id} value={a.id}>
                                    {a.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Fiyat (TL)</label>
                    <input
                        name="price"
                        type="number"
                        placeholder="Örn: 26000000"
                        required
                        className="w-full border p-2.5 rounded-xl text-sm"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Şehir</label>
                        <input
                            name="city"
                            type="text"
                            placeholder="Örn: İstanbul"
                            required
                            className="w-full border p-2.5 rounded-xl text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">İlçe / Semt</label>
                        <input
                            name="district"
                            type="text"
                            placeholder="Örn: Kadıköy"
                            required
                            className="w-full border p-2.5 rounded-xl text-sm"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Oda Sayısı</label>
                        <input
                            name="bedrooms"
                            type="number"
                            placeholder="3 (Dükkan/Arsa için 0)"
                            required
                            className="w-full border p-2.5 rounded-xl text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Banyo</label>
                        <input
                            name="bathrooms"
                            type="number"
                            placeholder="1"
                            required
                            className="w-full border p-2.5 rounded-xl text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">m² Alan</label>
                        <input
                            name="area"
                            type="number"
                            placeholder="145"
                            required
                            className="w-full border p-2.5 rounded-xl text-sm"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">Bulunduğu Kat</label>
                        <input
                            name="floor"
                            type="text"
                            placeholder="Düz Giriş / 4. Kat"
                            className="w-full border p-2.5 rounded-xl text-sm"
                        />
                    </div>
                </div>

                <div className="border border-dashed border-gray-300 rounded-2xl p-4 bg-gray-50/70 space-y-4">
                    <div>
                        <label className="block text-xs font-bold text-gray-800 mb-1">
                            Ana Kapak Görseli Yükle (Bilgisayardan Dosya Seç)
                        </label>
                        <input
                            type="file"
                            name="coverFile"
                            accept="image/*"
                            className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
                        />
                        <div className="text-[11px] text-gray-400 mt-1">veya resim linki gir:</div>
                        <input
                            name="imageUrl"
                            type="url"
                            placeholder="https://images.unsplash.com/..."
                            className="w-full border p-2 rounded-xl text-xs mt-1 bg-white"
                        />
                    </div>

                    <div className="pt-3 border-t border-gray-200">
                        <label className="block text-xs font-bold text-gray-800 mb-1">
                            Galeri Fotoğrafları Yükle (Çoklu Dosya Seçebilirsiniz)
                        </label>
                        <input
                            type="file"
                            name="galleryFiles"
                            multiple
                            accept="image/*"
                            className="w-full text-xs text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-gray-800 file:text-white hover:file:bg-black cursor-pointer"
                        />
                        <div className="text-[11px] text-gray-400 mt-1">veya her satıra bir görsel linki yapıştır:</div>
                        <textarea
                            name="images"
                            placeholder="https://...&#10;https://..."
                            rows={2}
                            className="w-full border p-2 rounded-xl font-mono text-xs mt-1 bg-white"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">İlan Açıklaması</label>
                    <textarea
                        name="description"
                        placeholder="Mülk hakkında detaylı bilgi, konum avantajları, cephesi..."
                        rows={4}
                        required
                        className="w-full border p-2.5 rounded-xl text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-emerald-700 transition shadow-sm text-sm"
                >
                    İlanı Kaydet ve Yayınla
                </button>
            </form>

            <div className="mt-10 border-t pt-6">
                <h2 className="text-xl font-bold mb-4 text-gray-900">Yayındaki İlanlar ({properties.length})</h2>

                <div className="flex flex-col gap-3">
                    {properties.map((item) => (
                        <div key={item.id} className="flex justify-between items-center border p-4 rounded-xl bg-white shadow-sm">
                            <div>
                                <p className="font-bold text-gray-900 text-sm">{item.title}</p>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    {item.category?.name || "Konut"} • {item.city} / {item.district} • {item.price.toLocaleString("tr-TR")} TL
                                </p>
                            </div>

                            <form action={deleteProperty.bind(null, item.id)}>
                                <button
                                    type="submit"
                                    className="bg-red-50 text-red-600 border border-red-200 text-xs font-semibold px-3 py-1.5 rounded-lg hover:bg-red-100 transition"
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
