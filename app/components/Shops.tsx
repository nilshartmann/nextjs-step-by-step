import { ShopsReponse } from "@/app/lib/db-queries";
import styles from "@/app/components/BeerDetails.module.css";
import React from "react";
import AppLink from "@/app/components/AppLink";

type ShopsProps = {
  shopsResponse: Promise<ShopsReponse>;
};

export default async function Shops({ shopsResponse }: ShopsProps) {
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
