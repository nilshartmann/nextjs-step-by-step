import { SingleBeer } from "@/app/lib/db-queries";
import styles from "./BeerDetails.module.css";
import { Rating, WhereToBuy } from "@/app/components/BeerPageComponents";
import RatingForm from "@/app/components/AddRatingForm";

type BeerDetailsProps = {
  beer: SingleBeer;
};

export function BeerDetails({ beer }: BeerDetailsProps) {
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
            {/*
						TODO
						---------------------------------
						   - was ist das Problem, wenn wir hier den Shop laden und "await"en?

						   - Komponente anpassen:
						     - Properties shopsResponse: Promise<ShopsReponse>
						     - WhereToBuy-Komponente verwenden, um Shops darzustellen
						     -
						     - Priorisieren: Suspense verwenden

						*/}
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
