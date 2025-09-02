import { scrape } from "@/lib/scraper/scraper";
import { z } from "zod";

const scrapeRequestSchema = z.object({
  url: z.url(),
});

type ScrapeRequest = z.infer<typeof scrapeRequestSchema>;

export async function GET() {
  // const body = await request.json();
  // const validated = scrapeRequestSchema.safeParse(body);

  // if (!validated.success) {
  //   return new Response("Invalid request", { status: 400 });
  // }

  // const { url }: ScrapeRequest = validated.data;

  const url =
    "https://www.tcgplayer.com/product/642546/pokemon-sv-black-bolt-victini---171-086";

  const data = await scrape(url);

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
