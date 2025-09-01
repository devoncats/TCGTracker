"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useEffect, useState } from "react";

enum SortBy {
  DateLowToHigh = "dlth",
  DateHighToLow = "dhtl",
  PriceLowToHigh = "plth",
  PriceHighToLow = "phtl",
  TitleAToZ = "tatz",
  TitleZToA = "tzta",
}

export default function Home() {
  const [sortBy, setSortBy] = useState(SortBy.TitleAToZ);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    console.log("Max Price:", maxPrice);
    console.log("Sort By:", sortBy);
  }, [maxPrice, sortBy]);

  return (
    <main className="flex h-[calc(100vh-69px)] flex-1">
      <section className="bg-muted flex flex-1 flex-col gap-6 border-r p-6">
        <h1 className="font-display text-2xl font-bold">Your stats</h1>

        <div>
          <p>Total cards: 0</p>
          <p>Colection best price: $0</p>
          <p>Collection average price: $0</p>
        </div>
      </section>
      <section className="flex flex-4 flex-col gap-4 p-6">
        <div className="flex gap-4">
          <Input />
          <Button>Search collection</Button>
        </div>
        <div className="flex justify-end gap-4">
          <div className="flex gap-2">
            <Select
              defaultValue={sortBy}
              onValueChange={(value) => setSortBy(value as SortBy)}
            >
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={SortBy.DateLowToHigh}>
                  Date: Low to High
                </SelectItem>
                <SelectItem value={SortBy.DateHighToLow}>
                  Date: Low to High
                </SelectItem>
                <SelectItem value={SortBy.PriceLowToHigh}>
                  Price: Low to High
                </SelectItem>
                <SelectItem value={SortBy.PriceHighToLow}>
                  Price: Low to High
                </SelectItem>
                <SelectItem value={SortBy.TitleAToZ}>Title: A - Z</SelectItem>
                <SelectItem value={SortBy.TitleZToA}>Title: Z - A</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex w-fit items-center gap-2">
              <span>Max price: </span>
              <Slider
                value={[maxPrice]}
                onValueChange={([value]) => setMaxPrice(value)}
                max={1000}
                step={1}
                className="w-96"
              />
              <span className="w-16">$ {maxPrice}</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto">
          <div className="grid grid-cols-4 gap-4">
            <div className="h-96 min-h-64 w-full rounded border"></div>
            <div className="h-96 min-h-64 w-full rounded border"></div>
            <div className="h-96 min-h-64 w-full rounded border"></div>
            <div className="h-96 min-h-64 w-full rounded border"></div>
            <div className="h-96 min-h-64 w-full rounded border"></div>
            <div className="h-96 min-h-64 w-full rounded border"></div>
            <div className="h-96 min-h-64 w-full rounded border"></div>
            <div className="h-96 min-h-64 w-full rounded border"></div>
            <div className="h-96 min-h-64 w-full rounded border"></div>
            <div className="h-96 min-h-64 w-full rounded border"></div>
          </div>
        </div>
      </section>
    </main>
  );
}
