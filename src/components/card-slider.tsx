import { Slider } from "@/components/ui/slider";

interface CardSliderProps {
  maxPrice: number;
  filterPrice: number;
  action: ([value]: number[]) => void;
}

export default function CardSlider({
  maxPrice,
  filterPrice,
  action,
}: CardSliderProps) {
  return (
    <div className="flex gap-2">
      <span>Max price: </span>
      <Slider
        value={[filterPrice]}
        onValueChange={action}
        max={maxPrice}
        step={1}
        className="w-64"
      />
      <span className="w-16">$ {filterPrice}</span>
    </div>
  );
}
