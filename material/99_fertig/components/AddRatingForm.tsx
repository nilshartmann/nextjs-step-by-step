"use client";
import { useState, MouseEvent } from "react";
import styles from "./AddRatingForm.module.css";
import type { AddRatingRequestBody } from "@/app/types";
import { useRouter } from "next/navigation";

type RatingFormProps = {
  beerName: string;
  beerId: string;
};

export default function RatingForm({ beerName, beerId }: RatingFormProps) {
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [stars, setStars] = useState("");

  const router = useRouter();

  const buttonEnabled = !!username && !!stars && !!comment;

  const error = "";

  const onSave = async () => {
    const body: AddRatingRequestBody = {
      beerId,
      username,
      comment,
      stars: parseInt(stars),
    };

    const response = await fetch(`/api/beers/${beerId}/rating`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    setUsername("");
    setComment("");
    setStars("");

    router.refresh();
  };

  return (
    <div className={styles.Form}>
      <form>
        <fieldset>
          <div>
            <label>Your name:</label>{" "}
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Your rating (1-5):</label>{" "}
            <input
              type="number"
              min="1"
              max="5"
              value={stars}
              onChange={(e) => setStars(e.target.value)}
            />
          </div>
          <div>
            <label>Your comment:</label>{" "}
            <input
              type="text"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </div>
          <div>
            <button disabled={!buttonEnabled} onClick={onSave}>
              Leave rating for {beerName}
            </button>
          </div>
          {error && (
            <div>
              <b>Could not add rating:</b> {error}
            </div>
          )}
        </fieldset>
      </form>
    </div>
  );
}
