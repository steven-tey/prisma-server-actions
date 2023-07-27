import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  const { title, content } = await req.json();

  await prisma.post.create({
    data: {
      title,
      content,
    },
  });

  return { success: true };
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id") as string;

  await prisma.post.delete({
    where: {
      id,
    },
  });

  return { success: true };
}
