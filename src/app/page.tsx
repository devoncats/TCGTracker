"use server";

import { Filters } from "@/components/filters";
import { Sidebar } from "@/components/sidebar";
import { calculateTotal, getMaximumPrice } from "@/lib/card-adapter";
import { scrape } from "@/lib/scraper/scraper";
import { data } from "@/mock/cards";

export default async function Home() {
  const maxPrice = getMaximumPrice(data);
  const totalCard = data.length;
  const spotlightTotal = calculateTotal(data, "spotlight");
  const marketTotal = calculateTotal(data, "market");

  const fetchedData = await scrape("https://www.tcgplayer.com/product/610534");

  console.log(fetchedData);

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
