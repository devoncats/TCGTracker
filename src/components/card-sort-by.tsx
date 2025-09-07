import { usePokemonStore } from "@/app/stores/pokemon.store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { sortBy } from "@/types";

export function CardSortBy() {
  const { sortConfig, setSortConfig } = usePokemonStore();

  const handleSortConfigChange = (value: string) => {
    setSortConfig(value);
  };

  return (
    <Select value={sortConfig} onValueChange={handleSortConfigChange}>
      <SelectTrigger>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(sortBy).map(([index, name]) => (
          <SelectItem key={index} value={index}>
            {name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
