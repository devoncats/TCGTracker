import { getRarityImage } from "@/lib/card-adapter";
import { PokemonCardData } from "@/types";
import Image from "next/image";
import Link from "next/link";

export function PokemonCard({
  id,
  name,
  number,
  set,
  image,
  rarity,
  spotlight,
  market,
  createdAt,
}: PokemonCardData) {
  const date = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/cards/${id}`}>
      <article className="bg-accent flex h-64 w-full gap-2 rounded border p-4">
        <Image
          src={image}
          alt={name}
          height={220}
          width={160}
          className="h-full rounded"
        />

        <div className="flex w-full flex-col justify-between">
          <div>
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">{name}</h3>
              <Image
                src={getRarityImage(rarity)}
                alt={`${rarity} image`}
                height={16}
                width={16}
              />
            </div>

            <div className="text-muted-foreground text-xs">
              <p>{set}</p>
              <p>{number}</p>
            </div>
          </div>

          <div className="flex w-full items-end justify-between text-sm">
            <div>
              <h4>
                Retail price:{" "}
                <span className="font-semibold">$ {spotlight.toFixed(2)}</span>
              </h4>
              <h4>
                Market price:{" "}
                <span className="font-semibold">$ {market.toFixed(2)}</span>
              </h4>
            </div>

            <span className="text-muted-foreground text-right text-xs">
              {date}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
