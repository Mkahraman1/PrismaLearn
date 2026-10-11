"use server"
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function getProperties() {
    return await prisma.property.findMany({
        include: {
            category: true,
            agent: true,
        },
        orderBy: {
            createdAt: "desc",
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
    const bedrooms = parseInt(formData.get("bedrooms") as string);
    const bathrooms = parseInt(formData.get("bathrooms") as string);
    const area = parseInt(formData.get("area") as string);
    const floor = (formData.get("floor") as string) || "Giriş Kat";
    const imageUrl = (formData.get("imageUrl") as string) || null;
    const imagesRaw = (formData.get("images") as string) || "";

    const images = imagesRaw
        .split(/[\n,]/)
        .map((url) => url.trim())
        .filter((url) => url.length > 0);

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
        },
    });

    revalidatePath("/");
    redirect("/");
}

export async function deleteProperty(id: number) {
    await prisma.property.delete({
        where: { id },
    });
    revalidatePath("/");
}