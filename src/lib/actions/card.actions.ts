"use server";

import { prisma } from "@/lib/prisma";
import { ActionResponse, PokemonCardData, PokemonCardDataDTO } from "@/types";

export async function getAllCards(): ActionResponse<PokemonCardData[]> {
  try {
    const cards = await prisma.card.findMany();

    return {
      error: false,
      data: cards,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
      data: [],
    };
  }
}

export async function getCardById(id: string): ActionResponse<PokemonCardData> {
  try {
    const card = await prisma.card.findUnique({
      where: { id },
    });

    if (!card) {
      return {
        error: true,
        message: "Card does not exist",
        data: undefined,
      };
    }

    return {
      error: false,
      data: card,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
      data: undefined,
    };
  }
}

export async function createCard(
  pokemonCardData: PokemonCardDataDTO
): ActionResponse<PokemonCardData> {
  try {
    const card = await prisma.card.create({
      data: {
        ...pokemonCardData,
      },
    });

    return {
      error: false,
      data: card,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
      data: undefined,
    };
  }
}

export async function updateCard(
  id: string,
  pokemonCardData: PokemonCardData
): ActionResponse<PokemonCardData> {
  try {
    const card = await prisma.card.update({
      where: { id },
      data: { ...pokemonCardData },
    });

    return {
      error: false,
      data: card,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
      data: undefined,
    };
  }
}

export async function deleteCard(id: string): ActionResponse<PokemonCardData> {
  try {
    const card = await prisma.card.delete({
      where: { id },
    });

    return {
      error: false,
      data: card,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
      data: undefined,
    };
  }
}
