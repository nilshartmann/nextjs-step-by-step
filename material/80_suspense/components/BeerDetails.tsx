import styles from "./BeerDetails.module.css";
import React, { Suspense } from "react";
import LoadingIndicator from "@/app/components/LoadingIndicator";
import RatingForm from "@/app/components/AddRatingForm";
import { ShopsReponse, SingleBeer } from "@/app/lib/db-queries";
import AppLink from "@/app/components/AppLink";
import { Shop } from "@/app/types";
import Stars from "@/app/components/Stars";

type BeerDetailsProps = {
  shopsPromise: Promise<ShopsReponse>;
  beer: SingleBeer;
};

export default async function BeerDetails({
  shopsPromise,
  beer,
}: BeerDetailsProps) {
  if (!beer) {
    return null;
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
            <h1>Where to buy:</h1>

            <Suspense
              fallback={
                <div style={{ marginBottom: "1.5rem" }}>
                  <LoadingIndicator secondary />
                </div>
              }
            >
              <Shops shopsResponse={shopsPromise} />
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

type WhereToBuyProps = {
  shopsResponse: Promise<ShopsReponse>;
};

async function Shops({ shopsResponse }: WhereToBuyProps) {
  const shops = await shopsResponse;
  return (
    <div className={styles.Shops}>
      {shops.data.map((shop, ix) => (
        <React.Fragment key={shop.id}>
          <div className={styles.Shop}>
            <AppLink href={`/shop/${shop.id}`}>
              <span className={styles.Name}>{shop.name}</span>
            </AppLink>
          </div>
          {ix < shops.data.length - 1 ? " | " : null}
        </React.Fragment>
      ))}
    </div>
  );
}

type ShopProps = {
  shop: Shop;
};

type RatingProps = {
  rating: SingleBeer["ratings"][0];
};

const Rating = ({ rating: { username, comment, stars } }: RatingProps) => (
  <div className={styles.Rating}>
    <span className={styles.Author}>{username}</span>:{" "}
    <span className={styles.Comment}>
      „{comment}“ <Stars stars={stars} />
    </span>
  </div>
);
