import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding starting...");

    await prisma.property.deleteMany({});
    await prisma.category.deleteMany({});
    await prisma.agent.deleteMany({});

    const catDaire = await prisma.category.create({ data: { name: "Daire" } });
    const catDukkan = await prisma.category.create({ data: { name: "Dükkan" } });
    const catOfis = await prisma.category.create({ data: { name: "Ofis" } });
    const catVilla = await prisma.category.create({ data: { name: "Villa" } });
    const catArsa = await prisma.category.create({ data: { name: "Arsa" } });

    const agentAhmet = await prisma.agent.create({
        data: { name: "Ahmet Yılmaz", phone: "05321002030" },
    });
    const agentSelin = await prisma.agent.create({
        data: { name: "Selin Demir", phone: "05332003040" },
    });

    await prisma.property.create({
        data: {
            title: "Kadıköy Moda Caddesi'nde Balkonlu Yenilenmiş 3+1 Daire",
            description: "Moda sahiline 3 dakika yürüme mesafesinde, güney cepheli, içi mimar tarafından A'dan Z'ye yenilenmiş 3+1 daire. Geniş salon, ankastre mutfak, ebeveyn banyosu ve keyifli bir balkon bulunmaktadır. Bina asansörlü ve ısı yalıtımlıdır.",
            price: 14500000,
            type: "SATILIK",
            city: "İstanbul",
            district: "Kadıköy",
            bedrooms: 3,
            bathrooms: 2,
            area: 145,
            floor: "4. Kat",
            imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
            images: [
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&auto=format&fit=crop&q=80"
            ],
            status: "AKTIF",
            isFeatured: true,
            categoryId: catDaire.id,
            agentId: agentAhmet.id,
        },
    });

    await prisma.property.create({
        data: {
            title: "Beşiktaş Akaretler'de Tarihi Dokuda Eşyalı 2+1 Kiralık Daire",
            description: "Beşiktaş çarşıya ve sahile çok yakın, toplu taşımaya adım mesafede. Yüksek tavanlı, ferah, tam eşyalı ve taşınmaya hazır modern 2+1 daire. Klimalı, fiber internet altyapılı, sessiz ve nezih bir sokaktadır.",
            price: 48000,
            type: "KIRALIK",
            city: "İstanbul",
            district: "Beşiktaş",
            bedrooms: 2,
            bathrooms: 1,
            area: 95,
            floor: "2. Kat",
            imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
            images: [
                "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80"
            ],
            status: "AKTIF",
            isFeatured: true,
            categoryId: catDaire.id,
            agentId: agentSelin.id,
        },
    });

    await prisma.property.create({
        data: {
            title: "Bağdat Caddesi Paralelinde Yüksek Vitrinli Köşe Dükkan",
            description: "İnsan ve araç trafiğinin en yoğun olduğu lokasyonda, 14 metre cepheli, çift girişli köşe başı dükkan. Kafe, butik, klinik veya kurumsal mağaza için uygundur. Bacalı havalandırma izni mevcuttur, ön kullanım alanı bulunmaktadır.",
            price: 26000000,
            type: "SATILIK",
            city: "İstanbul",
            district: "Kadıköy",
            bedrooms: 0,
            bathrooms: 1,
            area: 210,
            floor: "Düz Giriş",
            imageUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
            images: [
                "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=80"
            ],
            status: "AKTIF",
            isFeatured: true,
            categoryId: catDukkan.id,
            agentId: agentAhmet.id,
        },
    });

    await prisma.property.create({
        data: {
            title: "Levent Metro Çıkışında Prestijli Plaza Katı Kiralık Ofis",
            description: "Büyükdere Caddesi üzerinde, metro ve toplu taşımaya doğrudan bağlantılı A+ plazada hazır dekorasyonlu ofis katı. Toplantı odaları, yönetici odası, açık çalışma alanı ve mutfak hazırdır. 7/24 güvenlik ve 4 araçlık kapalı otopark hakkı vardır.",
            price: 95000,
            type: "KIRALIK",
            city: "İstanbul",
            district: "Şişli",
            bedrooms: 4,
            bathrooms: 2,
            area: 180,
            floor: "12. Kat",
            imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
            images: [
                "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1200&auto=format&fit=crop&q=80"
            ],
            status: "AKTIF",
            isFeatured: true,
            categoryId: catOfis.id,
            agentId: agentSelin.id,
        },
    });

    await prisma.property.create({
        data: {
            title: "Sarıyer Zekeriyaköy'de Müstakil Havuzlu ve Bahçeli Lüks Villa",
            description: "Doğa ile iç içe, 650 m² müstakil parsel içinde özel yüzme havuzlu, akıllı ev sistemine sahip müstakil lüks villa. Yerden ısıtma, şömine, kış bahçesi, sauna ve 2 araçlık kapalı garaj. Nezih sitede 24 saat özel güvenlik bulunmaktadır.",
            price: 38500000,
            type: "SATILIK",
            city: "İstanbul",
            district: "Sarıyer",
            bedrooms: 5,
            bathrooms: 4,
            area: 420,
            floor: "3 Katlı",
            imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80",
            images: [
                "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=80"
            ],
            status: "AKTIF",
            isFeatured: true,
            categoryId: catVilla.id,
            agentId: agentAhmet.id,
        },
    });

    await prisma.property.create({
        data: {
            title: "Çanakkale Ayvacık'ta Panoramik Deniz Manzaralı İmarlı Arsa",
            description: "Assos ve Midilli Adası manzaralı, elektrik ve su hattı parsel sınırında olan 750 m² %20/40 konut imarlı müstakil parsel arsa. İki adet villa yapımına uygundur. Yolu açılmış olup hemen inşaata başlanabilir.",
            price: 6750000,
            type: "SATILIK",
            city: "Çanakkale",
            district: "Ayvacık",
            bedrooms: 0,
            bathrooms: 0,
            area: 750,
            floor: "İmarlı Arsa",
            imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80",
            images: [
                "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200&auto=format&fit=crop&q=80",
                "https://images.unsplash.com/photo-1470246973918-29a93221c455?w=1200&auto=format&fit=crop&q=80"
            ],
            status: "AKTIF",
            isFeatured: true,
            categoryId: catArsa.id,
            agentId: agentSelin.id,
        },
    });

    console.log("Seeding completed successfully!");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
