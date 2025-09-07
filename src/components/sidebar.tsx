"use client";

import AddCard from "@/components/add-card";
import { CollectionStats } from "@/components/collection-stats";
import { Filters } from "@/components/filters";

export function Sidebar() {
  return (
    <section className="flex min-w-md flex-col gap-6 p-6">
      <CollectionStats />
      <AddCard />
      <Filters />
    </section>
  );
}
