"use client";

import { usePokemonStore } from "@/app/stores/pokemon.store";
import { Filters } from "@/components/filters";
import { PokemonCard } from "@/components/pokemon-card";
import { useEffect } from "react";

export function PokemonCardDashboard() {
  const { isLoading, error, message, getRefinedCards, fetchCards } =
    usePokemonStore();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const refinedCards = getRefinedCards();

  if (isLoading) return <div>Loading</div>;
  if (error) return <div>{message}</div>;

  return (
    <section className="flex flex-8 flex-col gap-4 p-6">
      <Filters />

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-4 pr-4 lg:grid-cols-2 2xl:grid-cols-3">
          {refinedCards.map((card) => (
            <PokemonCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
