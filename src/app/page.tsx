import { Filters } from "@/components/filters";
import { Sidebar } from "@/components/sidebar";
import { getAllCards } from "@/lib/actions/card.actions";
import { calculateTotal, getMaximumPrice } from "@/lib/card-adapter";
import { use } from "react";

export default function Home() {
  const petition = use(getAllCards());

  if (petition.error) {
    return <div>Error</div>;
  }

  const { data } = petition;

  if (!data) return <div>No bitches</div>;

  const maxPrice = getMaximumPrice(data);
  const totalCard = data.length;
  const spotlightTotal = calculateTotal(data, "spotlight");
  const marketTotal = calculateTotal(data, "market");

  return (
    <main className="flex h-[calc(100vh-69px)] flex-1">
      <Sidebar
        total={totalCard}
        spotlight={spotlightTotal}
        market={marketTotal}
      />

      <Filters data={data} maxPrice={maxPrice} />
    </main>
  );
}
