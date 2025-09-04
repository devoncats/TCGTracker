import { PokemonCardDataDTO } from "@/types";

export function validateData({ data }: PokemonCardDataDTO) {
  if (!data) return { error: true, message: "Data is not definde" };

  const { id, name, number, set, image, rarity, spotlight, market } = data;

  if (!id) return { error: true, message: "ID is not defined" };
  if (!name) return { error: true, message: "Name is not defined" };
  if (!number) return { error: true, message: "Number is not defined" };
  if (!set) return { error: true, message: "Set is not defined" };
  if (!image) return { error: true, message: "Image is not defined" };
  if (!rarity) return { error: true, message: "Rarity is not defined" };

  if (!spotlight && !market) {
    return {
      error: false,
      data: {
        ...data,
        spotlight: 0,
        market: 0,
      },
    };
  }

  if (!spotlight)
    return {
      error: false,
      data: {
        ...data,
        spotlight: 0,
      },
    };

  if (!market)
    return {
      error: false,
      data: {
        ...data,
        market: 0,
      },
    };

  return {
    error: false,
    data: { ...data },
  };
}
