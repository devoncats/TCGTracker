import { PokemonCardData, sortBy, SortBy } from "@/types";

export function getMaximumPrice(cards: PokemonCardData[]): number {
  const maximum = cards
    .map((card) => card.spotlight)
    .reduce((a, b) => Math.max(a, b), 0);

  return maximum;
}

export function getTotal(
  cards: PokemonCardData[],
  property: "spotlight" | "market"
): string {
  return cards
    .map((card) => card[property])
    .reduce((a, b) => a + b, 0)
    .toFixed(2);
}

export function sortCards(
  cards: PokemonCardData[],
  sortConfig: SortBy
): PokemonCardData[] {
  const sortedCards = [...cards].sort((a, b) => {
    switch (sortConfig) {
      case sortBy.ASC_NAME:
        return a.name.localeCompare(b.name);

      case sortBy.DESC_NAME:
        return b.name.localeCompare(a.name);

      case sortBy.ASC_SET:
        return a.set.localeCompare(b.set);

      case sortBy.DESC_SET:
        return b.set.localeCompare(a.set);

      case sortBy.ASC_SPOTLIGHT:
        return a.spotlight - b.spotlight;

      case sortBy.DESC_SPOTLIGHT:
        return b.spotlight - a.spotlight;

      case sortBy.ASC_MARKET:
        return a.market - b.market;

      case sortBy.DESC_MARKET:
        return b.market - a.market;

      case sortBy.ASC_DATE:
        return a.createdAt.getTime() - b.createdAt.getTime();

      case sortBy.DESC_DATE:
        return b.createdAt.getTime() - a.createdAt.getTime();

      default:
        return 0;
    }
  });

  return sortedCards;
}
export function searchCards(
  cards: PokemonCardData[],
  searchTerm: string
): PokemonCardData[] {
  if (!searchTerm.trim()) return cards;

  const loweredSearchTerm = searchTerm.toLowerCase();

  const searchedCards = cards.filter((card) => {
    card.name.toLowerCase().includes(loweredSearchTerm) ||
      card.set.toLowerCase().includes(loweredSearchTerm) ||
      card.number.includes(loweredSearchTerm) ||
      card.rarity.includes(loweredSearchTerm);
  });

  return searchedCards;
}
