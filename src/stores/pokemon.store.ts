import { THRESHOLD } from "@/constants";
import {
  createCard,
  deleteCard,
  getAllCards,
} from "@/lib/actions/card.actions";
import {
  filteredCardsByPrice,
  getMaxPrice,
  getTotalPrice,
  searchCards,
  sortCards,
} from "@/lib/card-adapter";
import { scrape } from "@/lib/scraper/scraper";
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

      // Add New Data
      pageRoute: "",

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

        // TODO: IMPLEMENT FETCHING USING UPDATE
        const cachedAtValues = response
          .data!.map((item) => item.cachedAt)
          .filter((cachedAt) => cachedAt !== undefined);

        cachedAtValues.forEach((cachedAt, index) => {
          if (cachedAt.getTime() < THRESHOLD) {
            console.log(`Item ${index} is old: ${new Date(cachedAt)}`);
          }
        });

        set({
          cards: response.data,
          isLoading: false,
        });
      },
      addCard: async () => {
        set({ isLoading: true, error: false, message: null });

        const { cards, pageRoute } = get();

        const scrapped = await scrape(pageRoute);

        if (scrapped.error) {
          set({
            error: true,
            message: scrapped.message || "Unknown error",
            isLoading: false,
          });

          return { error: true, message: scrapped.message || "Unknown error" };
        }

        const response = await createCard(scrapped.data!);

        if (response.error) {
          set({
            error: true,
            message: response.message || "Unknown error",
            isLoading: false,
          });

          return { error: true, message: scrapped.message || "Unknown error" };
        }

        set({ cards: [...cards, response.data!], isLoading: false });

        return { error: false };
      },
      updateCard: () => {
        throw new Error("Not implemented yet");
      },
      deleteCard: async (id: string) => {
        const { cards } = get();

        const response = await deleteCard(id);

        if (response.error) {
          set({
            error: true,
            message: response.message || "Unknown error",
            isLoading: false,
          });
        }

        set({
          cards: cards.filter((card) => card.id !== id),
          isLoading: false,
        });
      },

      // Search & Sort Actions
      setSearchTerm: (searchTerm) => set({ searchTerm }),
      setSortConfig: (sortConfig) => set({ sortConfig }),
      setPriceFilter: (priceFilter) => set({ priceFilter }),

      // Add New Data Action
      setPageRoute: (pageRoute) => set({ pageRoute }),

      // Computed selectors
      getRefinedCards: () => {
        const { cards, searchTerm, sortConfig, priceFilter } = get();

        const searchedCards = searchCards(cards, searchTerm);
        const sortedCards = sortCards(searchedCards, sortConfig);
        const filteredCards = filteredCardsByPrice(sortedCards, priceFilter);

        return filteredCards;
      },
      getStats: () => {
        const { cards } = get();

        const totalCards = cards.length;

        const uniqueSets = [...new Set(cards.map((card) => card.set))].sort();

        const maxSpotlightPrice = getMaxPrice(cards, "spotlight");
        const maxMarketPrice = getMaxPrice(cards, "market");

        const spotlightTotal = getTotalPrice(cards, "spotlight");
        const marketTotal = getTotalPrice(cards, "market");

        return {
          owned: totalCards,
          sets: uniqueSets,
          maxSpotlightPrice,
          maxMarketPrice,
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
        priceFilter: state.priceFilter,
      }),
    }
  )
);
