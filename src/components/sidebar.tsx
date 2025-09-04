"use client";

import { usePokemonStore } from "@/app/stores/pokemon.store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Sidebar() {
  // FIX: THIS IS THE WRONG VARIABLE, ONLY USING FOR TESTING PORPUSES
  const { searchTerm, setSearchTerm, getStats } = usePokemonStore();

  const { owned, spotlightTotal, marketTotal } = getStats();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(searchTerm);

    // TODO: Disable the button, Validate url, Send the value to the backend, get response in a toast
  };

  const handleUrlValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <section className="bg-muted hidden min-w-sm flex-1 flex-col gap-6 border-r p-6 lg:flex">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          value={searchTerm}
          onChange={handleUrlValueChange}
          className="bg-white"
        />
        <Button type="submit">Add card</Button>
      </form>

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-bold">Your stats</h1>

        <div>
          <p>Total cards: {owned}</p>
          <p>Collection best spotlight: ${spotlightTotal}</p>
          <p>Colection best market: ${marketTotal}</p>
        </div>
      </div>
    </section>
  );
}
