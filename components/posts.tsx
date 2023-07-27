import prisma from "@/lib/prisma";
import { DeleteButton, OldDeleteButton } from "./forms";

export default async function Posts() {
  const posts = await prisma.post.findMany();

  return (
    <div className="grid gap-4 max-w-lg w-full">
      {posts.map((post) => (
        <div
          key={post.id}
          className="bg-white shadow-md rounded-md p-4 flex justify-between items-center"
        >
          <div>
            <h2 className="text-lg font-bold">{post.title}</h2>
            <p className="text-gray-500">{post.content}</p>
          </div>
          {/* <DeleteButton id={post.id} /> */}
          <OldDeleteButton id={post.id} />
        </div>
      ))}
    </div>
  );
}

export function PostsPlaceholder() {
  return (
    <div className="grid gap-4 w-full max-w-lg">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="bg-white shadow-md rounded-md p-4 w-full">
          <div className="animate-pulse h-5 bg-gray-300 rounded w-3/4 mb-2" />
          <div className="animate-pulse h-4 bg-gray-300 rounded w-1/2 mb-2" />
        </div>
      ))}
    </div>
  );
}
