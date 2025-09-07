import { usePokemonStore } from "@/app/stores/pokemon.store";
import { Slider } from "@/components/ui/slider";

export default function CardSlider() {
  const { getStats, priceFilter, setPriceFilter } = usePokemonStore();
  const { maxSpotlightPrice } = getStats();

  const handlePriceFilterChange = ([value]: number[]) => {
    setPriceFilter(value);
  };

  return (
    <div className="flex w-full gap-2 text-sm text-nowrap">
      <span>Max price:</span>
      <Slider
        value={[priceFilter]}
        onValueChange={handlePriceFilterChange}
        max={maxSpotlightPrice}
        step={1}
      />

      <span className="min-w-14 text-right">$ {priceFilter}</span>
    </div>
  );
}
