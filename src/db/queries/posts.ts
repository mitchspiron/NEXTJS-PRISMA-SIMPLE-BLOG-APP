import type { Post } from "@prisma/client";
import { db } from "@/db";
import { notFound } from "next/navigation";

export async function fetchPosts(): Promise<Post[]> {
  const posts = await db.post.findMany({
    orderBy: [
      {
        updatedAt: "desc",
      },
    ],
  });
  /* if (posts.length == 0) {
    console.log("Not posts found");
  } */
  return posts;
}

export async function fetchPostById(id: string): Promise<Post | null> {
  const post = await db.post.findFirst({
    where: {
      id,
    },
  });

  if (!post) {
    notFound();
  }

  return post;
}
