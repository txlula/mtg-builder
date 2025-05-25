"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CardImageData, CardImageDataSchema } from "../types";
import Loading from "./loading";
import { useDebouncedCallback } from "use-debounce";

export default function SearchCard() {
  const [loading, setLoading] = useState(false);
  const [cardImageData, setCardImageData] = useState<CardImageData>({
    name: "",
    imageUrl: "",
    cmc: 0,
    text: "",
  });

  const debounced = useDebouncedCallback((searchValue) => {
    if (searchValue.length <= 0) {
      return;
    }

    fetch(`https://api.magicthegathering.io/v1/cards?name=${searchValue}`, {
      cache: "force-cache",
    })
      .then((res) => res.json())
      .then((cardData) => {
        if (!cardData.cards) {
          return;
        }
        console.log(cardData);
        const parseResult = CardImageDataSchema.safeParse(cardData.cards[0]);
        if (!parseResult.success) {
          return;
        } else {
          setCardImageData(parseResult.data);
        }
      });
  }, 500);

  useEffect(() => {
    setLoading(true);
    try {
      debounced.flush();
    } catch {
      console.error("Could not fetch cards.");
    } finally {
      setLoading(false);
    }
  }, [debounced]);

  return (
    <>
      <div className="flex justify-center">
        <div className="flex col-auto">
          <input
            className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 px-4 sm:h-14 sm:px-5 sm:pr-100"
            type="text"
            onChange={(e) => debounced(e.target.value)}
            placeholder="Search for a card..."
          />
        </div>
      </div>

      <div className="flex col-auto">
        {loading && <Loading />}
        {cardImageData.name && cardImageData.imageUrl && (
          <>
            <Image
              src={cardImageData.imageUrl}
              alt={cardImageData.name}
              width={300}
              height={400}
            />
            <div>
              <h1>{cardImageData.name}</h1>
              <p>Mana Cost: {cardImageData.cmc}</p>
              <p>Description: {cardImageData.text}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}
