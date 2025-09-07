"use client";

import { usePokemonStore } from "@/stores/pokemon.store";
import { LoaderCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function CardPage() {
  const { cards, isLoading, fetchCards } = usePokemonStore();

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  const { id } = useParams<{ id: string }>();
  const card = cards.find((card) => card.id === id);

  if (isLoading) {
    return (
      <main className="h-[calc(100vh-69px)]">
        <div className="grid h-full place-content-center">
          <LoaderCircle className="animate-spin" />
        </div>
      </main>
    );
  }

  if (!card) {
    return (
      <main className="flex h-[calc(100vh-69px)]">
        <div className="grid h-full w-full place-content-center place-items-center gap-4">
          <span className="heding text-6xl">:/</span>
          <span className="grid place-items-center">
            <p className="font-semibold">No card found</p>
            <p className="text-muted-foreground text-sm">
              This card may have been moved or deleted
            </p>
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="flex h-[calc(100vh-69px)]">
      <section className="flex w-full flex-col gap-8 p-6">
        <h1 className="heading">{card.name}</h1>

        <div className="flex">
          <div>
            <Image src={card.image} alt={card.name} width={500} height={700} />
            <Link href={`https://www.tcgplayer.com/product/${id}`}>
              View in TCG Player
            </Link>
          </div>

          <div>text</div>
        </div>
      </section>
    </main>
  );
}
