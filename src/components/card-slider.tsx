import { usePokemonStore } from "@/app/stores/pokemon.store";
import { Slider } from "@/components/ui/slider";

export default function CardSlider() {
  const { getStats, priceFilter, setPriceFilter, getRefinedCards } =
    usePokemonStore();
  const maxPrice = getStats().spotlightTotal;

  const handlePriceFilterChange = ([value]: number[]) => {
    setPriceFilter(value);
  };

  return (
    <div className="flex gap-2">
      <span>Max price: </span>
      <Slider
        value={[priceFilter]}
        onValueChange={handlePriceFilterChange}
        max={Number(maxPrice)}
        step={1}
        className="w-64"
      />

      <span className="w-16">$ {priceFilter}</span>
    </div>
  );
}
