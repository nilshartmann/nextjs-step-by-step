import { loadBeer, loadShops } from "@/app/lib/db-queries";
import BeerDetails from "@/app/components/BeerDetails";

type BeerPageProps = { params: { beerId: string } };

export default async function BeerPage({ params }: BeerPageProps) {
  const shopsPromise = loadShops(params.beerId);
  const beer = await loadBeer(params.beerId);

  if (!beer) {
    return <h1>Beer not found</h1>;
  }

  return <BeerDetails shopsPromise={shopsPromise} beer={beer} />;
}
