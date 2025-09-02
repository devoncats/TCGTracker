import { PokemonCardData } from "@/types";
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
  added,
}: PokemonCardData) {
  const date = new Date(added).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Link href={`/cards/${id}`}>
      <article className="bg-accent flex h-64 w-full gap-4 rounded border p-4">
        <img src={image} alt={name} className="h-full rounded" />

        <div className="flex w-full flex-col justify-between">
          <div className="flex flex-col gap-2">
            <h3 className="text-lg font-semibold">{name} ⭐⭐</h3>
            <div className="text-muted-foreground text-sm">
              <p>{set}</p>
              <p>{number}</p>
            </div>
          </div>

          <div className="flex w-full items-end justify-between">
            <div>
              <p>
                Retail price:{" "}
                <span className="font-semibold">${spotlight}</span>
              </p>
              <p>
                Market price: <span className="font-semibold">${market}</span>
              </p>
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
