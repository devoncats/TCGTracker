export interface PokemonCardData {
  id: string;
  name: string;
  number: string;
  set: string;
  image: string;
  rarity: string;
  spotlight: number;
  market: number;
  added: string;
}

export interface PokemonCardDataDTO {
  id?: string | null;
  name?: string | null;
  number?: string | null;
  set?: string | null;
  image?: string | null;
  rarity?: string | null;
  spotlight?: number | null;
  market?: number | null;
  added?: string | null;
  error: boolean;
  message?: string;
}

export enum SortBy {
  DateLowToHigh = "dlth",
  DateHighToLow = "dhtl",
  PriceLowToHigh = "plth",
  PriceHighToLow = "phtl",
  TitleAToZ = "tatz",
  TitleZToA = "tzta",
}
