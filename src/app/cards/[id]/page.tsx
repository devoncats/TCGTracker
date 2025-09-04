"use client";

import { usePokemonStore } from "@/app/stores/pokemon.store";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function CardPage() {
  const { cards } = usePokemonStore();
  const { id } = useParams<{ id: string }>();
  const card = cards.find((card) => card.id === id);

  if (!card) {
    return <div>Card not found</div>;
  }

  if (!card.image || !card.name) {
    return <div>Image or name not available</div>;
  }

  return (
    <div>
      <span>{card.name}</span>
      <Image src={card.image} alt={card.name} width={1000} height={1000} />
    </div>
  );
}
