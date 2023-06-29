import prisma from "@/app/lib/prisma";
import ButtonBar from "@/app/components/ButtonBar";
import OrderByButton from "@/app/components/OrderByButton";
import BeerImageList from "@/app/components/BeerImageList";
import { OrderBy } from "@/app/types";

type BeerListPageProps = {
  searchParams?: { [key: string]: string };
};
export default async function BeerListPage({
  searchParams,
}: BeerListPageProps) {
  const orderBy: OrderBy = (searchParams?.order_by || "asc") as OrderBy;

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
    orderBy: {
      name: orderBy,
    },
  });

  return (
    <>
      <ButtonBar>
        <OrderByButton orderBy={"asc"} />
        <OrderByButton orderBy={"desc"} />
      </ButtonBar>
      <BeerImageList beers={beers} />
    </>
  );
}
