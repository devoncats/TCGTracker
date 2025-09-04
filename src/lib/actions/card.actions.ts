"use server";

import { prisma } from "@/lib/prisma";
import { PokemonCardData } from "@/types";

// TODO: add loading

export async function getAllCards() {
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
    };
  }
}

export async function getCardById(id: string) {
  try {
    const card = await prisma.card.findUnique({
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
    };
  }
}

export async function createCard(pokemonCardData: PokemonCardData) {
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
    };
  }
}

export async function updateCard(id: string, pokemonCardData: PokemonCardData) {
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
      messsage: (error as Error).message,
    };
  }
}

export async function deleteCard(id: string) {
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
    };
  }
}
