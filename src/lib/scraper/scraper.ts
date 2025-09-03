"use server";

import { LOCALE, USER_AGENT, VALID_HOSTNAMES } from "@/constants";
import { PokemonCardDataDTO } from "@/types";
import { chromium } from "playwright";

export async function scrape(url: string): Promise<PokemonCardDataDTO> {
  const isValidUrl = validateUrl(url);

  if (!isValidUrl) {
    return {
      error: true,
      message: "Invalid URL format",
    };
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    userAgent: USER_AGENT,
    locale: LOCALE,
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
        return element ? element.getAttribute("src") : null;
      }

      return {
        fetchedTitle: getText(".product-details__name"),
        fetchedSet: getText(".product-details__name__sub-header__links span"),
        fetchedNumberRarity: getText(".product__item-details__attributes span"),
        fetchedSpotlightPrice: getText(".spotlight__listing .spotlight__price"),
        fetchedMarketPrice: getText(".price-points__upper__price"),
        fetchedImage: getImage(".lazy-image__wrapper img"),
      };
    });

    const { pathname } = new URL(url);
    const [_, id] = pathname.split("/").filter(Boolean);

    const [name] = data.fetchedTitle ? data.fetchedTitle.split(" - ") : [null];

    const [number, rarity] = data.fetchedNumberRarity
      ? data.fetchedNumberRarity.split(" / ")
      : [null, null];

    const {
      fetchedSet,
      fetchedSpotlightPrice,
      fetchedMarketPrice,
      fetchedImage,
    } = data;

    const spotlight = fetchedSpotlightPrice
      ? Number(fetchedSpotlightPrice.replace("$", ""))
      : null;

    const market = fetchedMarketPrice
      ? Number(fetchedMarketPrice.replace("$", ""))
      : null;

    const image = fetchedImage
      ? fetchedImage.replace("200x200", "1000x1000")
      : null;

    return {
      id,
      name,
      number,
      set: fetchedSet,
      image,
      rarity,
      spotlight,
      market,
      error: false,
    };
  } catch (error) {
    return {
      error: true,
      message: (error as Error).message,
    };
  } finally {
    await page.close();
    await context.close();
    await browser.close();
  }
}

function validateUrl(url: string): boolean {
  const parsedUrl = new URL(url);

  if (VALID_HOSTNAMES.includes(parsedUrl.hostname)) {
    const segments = parsedUrl.pathname.split("/").filter(Boolean);

    if (segments.length > 1 && segments[0] === "product") {
      return true;
    }
  }

  return false;
}
