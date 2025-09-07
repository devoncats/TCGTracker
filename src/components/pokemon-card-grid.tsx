import { usePokemonStore } from "@/app/stores/pokemon.store";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonCardData } from "@/types";
import { Loader, SearchX } from "lucide-react";

interface PokemonCardGridProps {
  cards: PokemonCardData[];
}

export function PokemonCardGrid({ cards }: PokemonCardGridProps) {
  const { isLoading, error, message, searchTerm, priceFilter } =
    usePokemonStore();

  if ((searchTerm !== "" || priceFilter === 0) && cards.length === 0) {
    return (
      <div className="grid h-full place-content-center place-items-center gap-4">
        <SearchX size={32} />
        <span className="grid place-items-center">
          <p className="font-semibold">No cards found</p>
          <p className="text-muted-foreground text-sm">
            Try adjusting your search or filters
          </p>
        </span>
      </div>
    );
  }

  if (isLoading) return <Loader />;

  if (error) return <div>{message}</div>;

  return (
    <div className="grid grid-cols-1 gap-4 pr-4 lg:grid-cols-2 2xl:grid-cols-3">
      {cards.map((card) => (
        <PokemonCard key={card.id} {...card} />
      ))}
    </div>
  );
}
