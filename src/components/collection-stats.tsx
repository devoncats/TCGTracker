import { usePokemonStore } from "@/stores/pokemon.store";

export function CollectionStats() {
  const { getStats } = usePokemonStore();
  const { owned, spotlightTotal, marketTotal } = getStats();

  return (
    <article className="bg-muted grid gap-4 rounded border p-4">
      <h2 className="heading">Colection Stats</h2>

      <div className="text-sm">
        <h3 className="flex items-center justify-between">
          <span className="text-muted-foreground">Total cards</span>
          <span className="font-semibold">{owned}</span>
        </h3>
        <h3 className="flex items-center justify-between">
          <span className="text-muted-foreground">Spotlight total value</span>
          <span className="font-semibold">$ {spotlightTotal}</span>
        </h3>
        <h3 className="flex items-center justify-between">
          <span className="text-muted-foreground">Market total value</span>
          <span className="font-semibold">$ {marketTotal}</span>
        </h3>
      </div>
    </article>
  );
}
