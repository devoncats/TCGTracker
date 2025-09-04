import { getAllCards } from "@/lib/actions/card.actions";
import { getTotal, searchCards, sortCards } from "@/lib/card-adapter";
import { PokemonCardStore } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const usePokemonStore = create<PokemonCardStore>()(
  persist(
    (set, get) => ({
      // Initial Data
      cards: [],

      // Initial Search & Sort
      searchTerm: "",
      sortConfig: "ASC_DATE",
      priceFilter: 0,

      // Initial UI States
      isLoading: false,
      error: false,
      message: null,

      // Actions
      fetchCards: async () => {
        set({ isLoading: true, error: false, message: null });

        const response = await getAllCards();

        if (response.error) {
          set({
            error: true,
            message: response.message || "Unknown error",
            isLoading: false,
          });

          return;
        }

        set({ cards: response.data, isLoading: false });
      },
      addCard: () => {
        throw new Error("Not implemented yet");
      },
      updateCard: () => {
        throw new Error("Not implemented yet");
      },
      deleteCard: () => {
        throw new Error("Not implemented yet");
      },

      // Search & Sort Actions
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setSortConfig: (sortConfig) => set({ sortConfig }),
      setPriceFilter: (priceFilter) => set({ priceFilter }),

      // Computed selectors
      getRefinedCards: () => {
        const { cards, searchTerm, sortConfig } = get();

        const searchedCards = searchCards(cards, searchTerm);
        const sortedCard = sortCards(searchedCards, sortConfig);

        return sortedCard;
      },
      getStats: () => {
        const { cards } = get();

        const totalCards = cards.length;

        const uniqueSets = [...new Set(cards.map((card) => card.set))].sort();
        const spotlightTotal = getTotal(cards, "spotlight");
        const marketTotal = getTotal(cards, "market");

        return {
          owned: totalCards,
          sets: uniqueSets,
          spotlightTotal,
          marketTotal,
        };
      },
    }),
    {
      name: "pokemon-card-storage",
      partialize: (state) => ({
        searchTerm: state.searchTerm,
        sortConfig: state.sortConfig,
      }),
    }
  )
);
