import { PokemonCardActions } from "@/components/pokemon-card-actions";
import { getRarityImage } from "@/lib/card-adapter";
import { PokemonCardData } from "@/types";
import Image from "next/image";
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
          <div className="flex justify-between">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold">{name}</h3>
              <Image
                src={getRarityImage(rarity)}
                alt={`${rarity} image`}
                height={12}
                width={12}
              />
            </div>

            <PokemonCardActions id={id} />
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
  );
}
