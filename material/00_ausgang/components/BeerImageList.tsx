import styles from "./BeerImageList.module.css";
import AppLink from "@/app/components/AppLink";
import Stars from "@/app/components/Stars";
import { BeerSummary } from "@/app/types";

type BeerImageListProps = {
  beers: BeerSummary[];
};
export default function BeerImageList({ beers }: BeerImageListProps) {
  return (
    <div className={styles.BeerOverview}>
      {beers.map((beer) => (
        <BeerImage
          key={beer.id}
          name={beer.name}
          stars={calcAverageStars(beer.ratings)}
          imgUrl={`/assets/beer/${beer.id}-256x256-thumb.jpg`}
          href={`/beers/${beer.id}`}
        />
      ))}
    </div>
  );
}

type BeerImageProps = {
  imgUrl: string;
  name: string;
  stars: number;
  active?: boolean;
  href: string;
};

function BeerImage({ imgUrl, name, stars, href }: BeerImageProps) {
  return (
    <div className={styles.BeerImage}>
      <AppLink href={href}>
        <img alt={name} src={imgUrl} />
        <span className={styles.Label}>
          <h1>{name}</h1>
          <Stars stars={stars} />
        </span>
      </AppLink>
    </div>
  );
}

function calcAverageStars(stars: { stars: number }[]) {
  const sum = stars.map((s) => s.stars).reduce((a, b) => a + b, 0);
  const avg = sum / stars.length || 0;
  return avg;
}
