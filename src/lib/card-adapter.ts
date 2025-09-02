import { PokemonCardData, SortBy } from "@/types";

export function getMaximumPrice(cards: PokemonCardData[]): number {
  const max = cards
    .map((card) => card.retail)
    .reduce((a, b) => Math.max(a, b), 0);

  return max;
}

export function sortAndFilterCards(
  cards: PokemonCardData[],
  sortBy: string,
  maxPrice: number
): PokemonCardData[] {
  const sortedAndFilteredCards = [...cards]
    .sort((a, b) => {
      switch (sortBy) {
        case SortBy.DateLowToHigh:
          return Date.parse(a.added) - Date.parse(b.added);
        case SortBy.DateHighToLow:
          return Date.parse(b.added) - Date.parse(a.added);
        case SortBy.PriceLowToHigh:
          return a.market - b.market;
        case SortBy.PriceHighToLow:
          return b.market - a.market;
        case SortBy.TitleAToZ:
          return a.name.localeCompare(b.name);
        case SortBy.TitleZToA:
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    })
    .filter((card) => card.retail <= maxPrice);

  return sortedAndFilteredCards;
}

export function calculateTotal(
  cards: PokemonCardData[],
  property: "retail" | "market"
): string {
  return cards
    .map((card) => card[property])
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
}
