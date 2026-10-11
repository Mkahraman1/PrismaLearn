"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import fs from "fs";
import path from "path";

export async function getProperties(filters?: {
    type?: string;
    city?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    sort?: string;
}) {
    const whereClause: any = {};

    if (filters?.type && filters.type.trim() !== "") {
        whereClause.type = filters.type.trim();
    }

    if (filters?.category && filters.category.trim() !== "") {
        whereClause.category = {
            name: {
                contains: filters.category.trim(),
                mode: "insensitive",
            },
        };
    }

    if (filters?.minPrice || filters?.maxPrice) {
        whereClause.price = {};
        if (filters.minPrice) whereClause.price.gte = filters.minPrice;
        if (filters.maxPrice) whereClause.price.lte = filters.maxPrice;
    }

    if (filters?.city && filters.city.trim() !== "") {
        const query = filters.city.trim();
        whereClause.OR = [
            { city: { contains: query, mode: "insensitive" } },
            { district: { contains: query, mode: "insensitive" } },
            { title: { contains: query, mode: "insensitive" } },
        ];
    }

    let orderBy: any = { createdAt: "desc" };
    if (filters?.sort === "price_asc") {
        orderBy = { price: "asc" };
    } else if (filters?.sort === "price_desc") {
        orderBy = { price: "desc" };
    }

    return await prisma.property.findMany({
        where: whereClause,
        include: {
            category: true,
            agent: true,
        },
        orderBy,
    });
}

export async function getPropertyById(id: number) {
    return await prisma.property.findUnique({
        where: { id },
        include: {
            category: true,
            agent: true,
        },
    });
}

export async function createProperty(formData: FormData) {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const type = formData.get("type") as string;
    const city = formData.get("city") as string;
    const district = formData.get("district") as string;
    const bedrooms = parseInt(formData.get("bedrooms") as string) || 0;
    const bathrooms = parseInt(formData.get("bathrooms") as string) || 0;
    const area = parseInt(formData.get("area") as string) || 0;
    const floor = (formData.get("floor") as string) || "Giriş Kat";
    let imageUrl = (formData.get("imageUrl") as string) || null;
    const imagesRaw = (formData.get("images") as string) || "";
    const categoryIdRaw = formData.get("categoryId") as string;
    const agentIdRaw = formData.get("agentId") as string;

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.promises.mkdir(uploadDir, { recursive: true });

    const coverFile = formData.get("coverFile") as File | null;
    if (coverFile && coverFile.size > 0 && coverFile.name) {
        const cleanName = `${Date.now()}-${coverFile.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
        const filePath = path.join(uploadDir, cleanName);
        const buffer = Buffer.from(await coverFile.arrayBuffer());
        await fs.promises.writeFile(filePath, buffer);
        imageUrl = `/uploads/${cleanName}`;
    }

    const galleryFiles = formData.getAll("galleryFiles") as File[];
    const uploadedGalleryUrls: string[] = [];

    for (const file of galleryFiles) {
        if (file && file.size > 0 && file.name) {
            const cleanName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
            const filePath = path.join(uploadDir, cleanName);
            const buffer = Buffer.from(await file.arrayBuffer());
            await fs.promises.writeFile(filePath, buffer);
            uploadedGalleryUrls.push(`/uploads/${cleanName}`);
        }
    }

    const textImages = imagesRaw
        .split(/[\n,]/)
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

    const images = [...uploadedGalleryUrls, ...textImages];
    if (images.length === 0 && imageUrl) {
        images.push(imageUrl);
    }

    await prisma.property.create({
        data: {
            title,
            description,
            price,
            type,
            city,
            district,
            bedrooms,
            bathrooms,
            area,
            floor,
            imageUrl,
            images,
            categoryId: categoryIdRaw ? parseInt(categoryIdRaw) : null,
            agentId: agentIdRaw ? parseInt(agentIdRaw) : null,
        },
    });

    revalidatePath("/");
    revalidatePath("/ilanlar");
    redirect("/ilanlar");
}

export async function deleteProperty(id: number) {
    await prisma.property.delete({
        where: { id },
    });
    revalidatePath("/");
    revalidatePath("/ilanlar");
}
