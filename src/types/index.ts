export interface PokemonCardData {
  id: string;
  name: string;
  number: string;
  set: string;
  image: string;
  rarity: string;
  retail: number;
  market: number;
  added: string;
}

export enum SortBy {
  DateLowToHigh = "dlth",
  DateHighToLow = "dhtl",
  PriceLowToHigh = "plth",
  PriceHighToLow = "phtl",
  TitleAToZ = "tatz",
  TitleZToA = "tzta",
}
