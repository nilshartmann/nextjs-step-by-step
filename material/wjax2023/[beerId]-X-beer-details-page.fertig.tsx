import styles from "../../components/BeerDetails.module.css";
import { Rating, WhereToBuy } from "@/app/components/BeerPageComponents";
import RatingForm from "@/app/components/AddRatingForm";
import { loadBeer, loadShops } from "@/app/lib/db-queries";
import { Suspense } from "react";
import LoadingIndicator from "@/app/components/LoadingIndicator";

type BeerPageProps = {
	params: { beerId: string };
};

export default async function BeerPage({ params }: BeerPageProps) {
	const shops = loadShops(params.beerId);
	const beer = await loadBeer(params.beerId);

	if (!beer) {
		return <h2>Could not find beer 😢</h2>;
	}

	return (
		<div>
			<div className={styles.Beer}>
				<div className={styles.DescriptionTitle}>
					<h1>{beer.name}</h1>
					<h3>{beer.price}</h3>
				</div>
				<div className={styles.Description}>
					<div className={styles.Img}>
						<img alt={beer.name} src={`/assets/beer/${beer.id}.jpg`} />
					</div>
					<div>
						<Suspense fallback={<LoadingIndicator placeholder={"🍺"} />}>
							<WhereToBuy shopsResponse={shops} />
						</Suspense>
						<div className={styles.Ratings}>
							<h1>What customers say:</h1>
							{beer.ratings.map((rating) => (
								<Rating key={rating.id} rating={rating} />
							))}
						</div>

						<h1>
							...and what do <em>you</em> think?
						</h1>
						<RatingForm beerId={beer.id} beerName={beer.name} />
					</div>
				</div>
			</div>
		</div>
	);
}
