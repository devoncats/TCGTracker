"use client";

import { PokemonCardGrid } from "@/components/pokemon-card-grid";
import { usePokemonStore } from "@/stores/pokemon.store";
import { useEffect } from "react";

export function PokemonCardList() {
  const { getRefinedCards, fetchCards } = usePokemonStore();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const refinedCards = getRefinedCards();

  return (
    <section className="flex w-full flex-col gap-4 p-6">
      <div className="flex-1 overflow-auto">
        <PokemonCardGrid cards={refinedCards} />
      </div>
    </section>
  );
}
