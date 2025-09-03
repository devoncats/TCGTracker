import { PokemonCardData, SortBy } from "@/types";

export function getMaximumPrice(cards: PokemonCardData[]): number {
  const max = cards
    .map((card) => card.spotlight)
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
          return Number(a.createdAt) - Number(b.createdAt);
        case SortBy.DateHighToLow:
          return Number(b.createdAt) - Number(a.createdAt);
        case SortBy.PriceLowToHigh:
          return a.spotlight - b.spotlight;
        case SortBy.PriceHighToLow:
          return b.spotlight - a.spotlight;
        case SortBy.TitleAToZ:
          return a.name.localeCompare(b.name);
        case SortBy.TitleZToA:
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    })
    .filter((card) => card.spotlight <= maxPrice);

  return sortedAndFilteredCards;
}

export function sortCards(cards: PokemonCardData[], sortBy: SortBy) {
  const sortedCards = [...cards].sort((a, b) => {
    switch (sortBy) {
      case SortBy.DateLowToHigh:
        return Number(a.createdAt) - Number(b.createdAt);
      case SortBy.DateHighToLow:
        return Number(b.createdAt) - Number(a.createdAt);
      case SortBy.PriceLowToHigh:
        return a.spotlight - b.spotlight;
      case SortBy.PriceHighToLow:
        return b.spotlight - a.spotlight;
      case SortBy.TitleAToZ:
        return a.name.localeCompare(b.name);
      case SortBy.TitleZToA:
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });
}

export function calculateTotal(
  cards: PokemonCardData[],
  property: "spotlight" | "market"
): string {
  return cards
    .map((card) => card[property])
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
}
