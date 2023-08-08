"use server";

import { AddRatingRequestBody } from "@/app/types";
import { v4 as uuid } from "uuid";
import prisma from "@/app/lib/prisma";
import { revalidatePath } from "next/cache";

export async function savePostAction(request: AddRatingRequestBody) {
  console.log("savePostAction", request);

  const id = uuid();
  await prisma.rating.create({
    data: {
      id,
      beerId: request.beerId,
      username: request.username,
      stars: request.stars,
      comment: request.comment,
    },
  });

  return { status: "created" };
}
