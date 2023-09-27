import { ShopsReponse, SingleBeer } from "@/app/lib/db-queries";
import AppLink from "@/app/components/AppLink";
import { Shop } from "@/app/types";
import Stars from "@/app/components/Stars";
import { Fragment } from "react";

import styles from "./BeerDetails.module.css";

type WhereToBuyProps = {
  shopsResponse: Promise<ShopsReponse>;
};

export async function WhereToBuy({ shopsResponse }: WhereToBuyProps) {
  const shops = await shopsResponse;
  return (
    <div className={styles.Shops}>
      {shops.data.map((shop, ix) => (
        <Fragment key={shop.id}>
          <div className={styles.Shop}>
            <AppLink href={`/shop/${shop.id}`}>
              <span className={styles.Name}>{shop.name}</span>
            </AppLink>
          </div>
          {ix < shops.data.length - 1 ? " | " : null}
        </Fragment>
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

export function Rating({ rating: { username, comment, stars } }: RatingProps) {
  return (
    <div className={styles.Rating}>
      <span className={styles.Author}>{username}</span>:{" "}
      <span className={styles.Comment}>
        „{comment}“ <Stars stars={stars} />
      </span>
    </div>
  );
}
