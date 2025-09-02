import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortBy } from "@/types";

interface CardSortByProps {
  sortBy: SortBy;
  action: (value: string) => void;
}

export function CardSortBy({ sortBy, action }: CardSortByProps) {
  return (
    <Select defaultValue={sortBy} onValueChange={action}>
      <SelectTrigger className="w-48">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={SortBy.DateLowToHigh}>Date: Low to High</SelectItem>
        <SelectItem value={SortBy.DateHighToLow}>Date: High to Low</SelectItem>
        <SelectItem value={SortBy.PriceLowToHigh}>
          Price: Low to High
        </SelectItem>
        <SelectItem value={SortBy.PriceHighToLow}>
          Price: High to Low
        </SelectItem>
        <SelectItem value={SortBy.TitleAToZ}>Title: A - Z</SelectItem>
        <SelectItem value={SortBy.TitleZToA}>Title: Z - A</SelectItem>
      </SelectContent>
    </Select>
  );
}
