import prisma from "@/app/lib/prisma";
import BeerImageList from "@/app/components/BeerImageList";

export default async function BeerListPage() {

  const beers = await prisma.beer.findMany({
    select: {
      id: true,
      name: true,
      ratings: {
        select: {
          stars: true,
        },
      },
    }
  });

  return (
    <>
      <BeerImageList beers={beers} />
    </>
  );
}
