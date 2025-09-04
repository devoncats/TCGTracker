import { Card } from "@prisma/client";

export interface PokemonCardData extends Card {}

export interface PokemonCardDataDTO {
  data?: {
    id?: string | null;
    name?: string | null;
    number?: string | null;
    set?: string | null;
    image?: string | null;
    rarity?: string | null;
    spotlight?: number | null;
    market?: number | null;
  };
  error: boolean;
  message?: string;
}

export const sortBy = {
  ASC_NAME: "Name: Low to High",
  DESC_NAME: "Name: High to Low",
  ASC_SET: "Set: Low to High",
  DESC_SET: "Set: High to Low",
  ASC_SPOTLIGHT: "Spotlight Price: Low to High",
  DESC_SPOTLIGHT: "Spotlight Price: High to Low",
  ASC_MARKET: "Market Price: Low to High",
  DESC_MARKET: "Market Price: High to Low",
  ASC_DATE: "Added Date: Low to High",
  DESC_DATE: "Added Date: High to Low",
};

export type SortBy = (typeof sortBy)[keyof typeof sortBy];

export interface PokemonCardStore {
  // Data
  cards: PokemonCardData[];

  // Search & Sort
  searchTerm: string;
  sortConfig: SortBy;
  priceFilter: number;

  // UI States
  isLoading: boolean;
  error: boolean;
  message: string | null;

  // Actions
  fetchCards: () => Promise<void>;
  addCard: (
    card: Omit<PokemonCardData, "createdAt" | "updatedAt" | "cachedAt">
  ) => void;
  updateCard: (
    id: string,
    card: Omit<PokemonCardData, "id" | "updatedAt">
  ) => void;
  deleteCard: (id: string) => void;

  // Search & Sort Actions
  setSearchTerm: (searchTerm: string) => void;
  setSortConfig: (sortConfig: SortBy) => void;
  setPriceFilter: (priceFilter: number) => void;

  // Computed selectors
  getRefinedCards: () => PokemonCardData[];
  getStats: () => {
    owned: number;
    sets: string[];
    spotlightTotal: string;
    marketTotal: string;
  };
}
