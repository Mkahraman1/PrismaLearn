"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createProduct(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const price = parseFloat(formData.get("price") as string);
  const stock = parseInt(formData.get("stock") as string);
  const categoryId = parseInt(formData.get("categoryId") as string);

  await prisma.product.create({
    data: {
      title,
      description,
      price,
      stock,
      categoryId,
    },
  });

  revalidatePath("/");
}


export async function getProducts() {
  return await prisma.product.findMany({
    include: {
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
}

export async function getCategories() {
  let categories = await prisma.category.findMany();
  if (categories.length === 0) {
    await prisma.category.createMany({
      data: [
        { name: "Elektronik" },
        { name: "Giyim" },
        { name: "Kitap & Hobi" },
      ],
    });
    categories = await prisma.category.findMany();
  }
  return categories;
}
