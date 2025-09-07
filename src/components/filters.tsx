"use client";

import CardSlider from "@/components/card-slider";
import { CardSortBy } from "@/components/card-sort-by";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePokemonStore } from "@/stores/pokemon.store";

export function Filters() {
  const { searchTerm, setSearchTerm } = usePokemonStore();

  const handleSearchTermChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };
  return (
    <article className="bg-muted grid gap-4 rounded border p-4">
      <h2 className="heading">Filters</h2>

      <div className="grid gap-1">
        <Label>Search card</Label>
        <Input
          value={searchTerm}
          onChange={handleSearchTermChange}
          placeholder="Terapagos ex - 128/142 - SV07: Stellar Crown (SCR)"
        />
      </div>

      <div className="grid">
        <div className="flex flex-col gap-4">
          <CardSortBy />
          <CardSlider />
        </div>
      </div>
    </article>
  );
}
