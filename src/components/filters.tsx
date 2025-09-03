"use client";

import { CardSortBy } from "@/components/card-filters";
import CardSlider from "@/components/card-slider";
import { PokemonCard } from "@/components/pokemon-card";
import { Input } from "@/components/ui/input";
import { sortAndFilterCards } from "@/lib/card-adapter";
import { PokemonCardData, SortBy } from "@/types";
import { useState } from "react";

export function Filters({
  data,
  maxPrice,
}: {
  data: PokemonCardData[];
  maxPrice: number;
}) {
  const [sortBy, setSortBy] = useState(SortBy.TitleAToZ);
  const [filterPrice, setFilterPrice] = useState(maxPrice);
  const [searchTerm, setSearchTerm] = useState("");

  const matchingCards = searchTerm
    ? data.filter(
        (card) =>
          card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          card.set.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;

  const sortedCards = sortAndFilterCards(matchingCards, sortBy, filterPrice);

  const handleSortBy = (value: string) => {
    setSortBy(value as SortBy);
  };

  const handleFilterPrice = ([value]: number[]) => {
    setFilterPrice(value);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="flex flex-8 flex-col gap-4 p-6">
      <div className="flex gap-4">
        <Input value={searchTerm} onChange={handleSearch} />
      </div>

      <div className="flex gap-4">
        <div className="flex gap-2">
          <div className="flex w-fit items-center gap-4">
            <CardSortBy sortBy={sortBy} action={handleSortBy} />

            <CardSlider
              maxPrice={maxPrice}
              filterPrice={filterPrice}
              action={handleFilterPrice}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="grid grid-cols-1 gap-4 pr-4 lg:grid-cols-2 2xl:grid-cols-3">
          {sortedCards.map((card) => (
            <PokemonCard key={card.id} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}
