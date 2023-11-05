import { OrderBy, Shop, ShopApiResponse } from "@/app/types";
import prisma from "@/app/lib/prisma";

export async function loadBeers(orderBy?: OrderBy) {
  const beers = await prisma.beer.findMany({
    select: {
      id: true,
      name: true,
      ratings: {
        select: {
          stars: true,
        },
      },
    },
    orderBy: orderBy
      ? {
          name: orderBy === "name_asc" ? "asc" : "desc",
        }
      : undefined,
  });

  return beers;
}

export async function loadBeer(beerId: string) {
  const beer = await prisma.beer.findUnique({
    where: {
      id: beerId,
    },
    include: {
      ratings: true,
    },
  });
  return beer;
}

export type SingleBeer = NonNullable<Awaited<ReturnType<typeof loadBeer>>>;

export type ShopsReponse = ShopApiResponse<Shop[]>;

export async function loadShops(beerId: string) {
  const url = `http://localhost:7000/shops?beerId=${beerId}`;
  console.log("Fetching from ", url);
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Loading beer ${beerId} failed with status code ${response.status}`
    );
  }

  return response.json() as Promise<ShopsReponse>;
}

export async function sleep() {
export async function sleep(n = 1200) {
  return new Promise((res) => {
    setTimeout(() => res(undefined), 1200);
    setTimeout(() => res(undefined), n);
  });
}
