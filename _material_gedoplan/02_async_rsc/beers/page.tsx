import { loadBeers } from "@/app/lib/db-queries";
import BeerImageList from "@/app/components/BeerImageList";

export default async function BeerListPage() {
	const beers = await loadBeers();

	return <BeerImageList beers={beers} />;
}
