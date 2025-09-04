import { PokemonCardData, SortBy } from "@/types";

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
      case "ASC_NAME":
        return a.name.localeCompare(b.name);

      case "DESC_NAME":
        return b.name.localeCompare(a.name);

      case "ASC_SET":
        return a.set.localeCompare(b.set);

      case "DESC_SET":
        return b.set.localeCompare(a.set);

      case "ASC_SPOTLIGHT":
        return a.spotlight - b.spotlight;

      case "DESC_SPOTLIGHT":
        return b.spotlight - a.spotlight;

      case "ASC_MARKET":
        return a.market - b.market;

      case "DESC_MARKET":
        return b.market - a.market;

      case "ASC_DATE":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

      case "DESC_DATE":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

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
    return (
      // Added missing return statement
      card.name.toLowerCase().includes(loweredSearchTerm) ||
      card.set.toLowerCase().includes(loweredSearchTerm) ||
      card.number.toLowerCase().includes(loweredSearchTerm) ||
      card.rarity.toLowerCase().includes(loweredSearchTerm)
    );
  });

  return searchedCards;
}

export function filterCardsByPrice(
  cards: PokemonCardData[],
  maxPrice: number
): PokemonCardData[] {
  if (maxPrice === 0) return cards;

  return cards.filter((card) => card.spotlight <= maxPrice);
}
