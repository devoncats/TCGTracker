"use server";

import { PokemonCardData } from "@/types";
import { chromium } from "playwright";

export async function scrape(url: string): Promise<PokemonCardData> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
    locale: "en-US",
  });

  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: 60000 });
    await page.waitForSelector(".product-details__product", { timeout: 10000 });

    const data = await page.$eval(".product-details__product", (root) => {
      function getText(selector: string) {
        const element = root.querySelector(selector);
        return element ? element.textContent.trim() : null;
      }

      function getImage(selector: string) {
        const element = root.querySelector(selector) as HTMLImageElement;
        return element ? element.src : null;
      }

      return {
        fullName: getText(".product-details__name"),
        set: getText(".product-details__name__sub-header__links span"),
        numberRarity: getText(".product__item-details__attributes span"),
        spotlightPrice: getText(".spotlight__listing .spotlight__price"),
        marketPrice: getText(".price-points__upper__price"),
        image: getImage(".lazy-image__wrapper img"),
      };
    });

    const id = url.split("/")[4];

    const name = data.fullName?.split(" - ")[0] || null;
    const [number, rarity] = data.numberRarity?.split(" / ") || [null, null];

    const { set, spotlightPrice, marketPrice, image } = data;

    image?.replace("200x200", "1000x1000");

    return {
      id,
      name,
      number,
      set,
      image,
      rarity,
      spotlight: Number(spotlightPrice),
      market: Number(marketPrice),
      added: new Date().toISOString(),
    };
  } catch (error) {
    return {
      id: null,
      name: null,
      number: null,
      set: null,
      image: null,
      rarity: null,
      spotlight: null,
      market: null,
      added: null,
      error: (error as Error).message,
    };
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}
