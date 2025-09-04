"use client";

import { usePokemonStore } from "@/app/stores/pokemon.store";
import { CardSortBy } from "@/components/card-filters";
import CardSlider from "@/components/card-slider";
import { Input } from "@/components/ui/input";

export function Filters() {
  const { searchTerm, setSearchTerm } = usePokemonStore();

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };
  return (
    <>
      <div className="flex gap-4">
        <Input value={searchTerm} onChange={handleSearchTermChange} />
      </div>
      <div className="flex gap-4">
        <div className="flex gap-2">
          <div className="flex w-fit items-center gap-4">
            <CardSortBy />

            <CardSlider />
          </div>
        </div>
      </div>
    </>
  );
}
