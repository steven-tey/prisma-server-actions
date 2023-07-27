"use server";

import prisma from "@/lib/prisma";

export async function createPost(data: FormData) {
  const title = data.get("title") as string;
  const content = data.get("content") as string;

  await prisma.post.create({
    data: {
      title,
      content,
    },
  });

  return { success: true };
}

export async function deletePost(id: string) {
  await prisma.post.delete({
    where: {
      id,
    },
  });

  return { success: true };
}
