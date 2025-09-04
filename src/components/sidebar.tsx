"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";

interface SidebarProps {
  total: number;
  market: string;
  spotlight: string;
}

export function Sidebar({ total, spotlight, market }: SidebarProps) {
  const [urlValue, setUrlValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(urlValue);

    // TODO: Disable the button, Validate url, Send the value to the backend, get response in a toast
  };

  const handleUrlValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUrlValue(event.target.value);
  };

  return (
    <section className="bg-muted hidden min-w-sm flex-1 flex-col gap-6 border-r p-6 lg:flex">
      <form onSubmit={handleSubmit} className="flex gap-4">
        <Input
          value={urlValue}
          onChange={handleUrlValueChange}
          className="bg-white"
        />
        <Button type="submit">Add card</Button>
      </form>

      <div className="flex flex-col gap-2">
        <h1 className="font-display text-2xl font-bold">Your stats</h1>

        <div>
          <p>Total cards: {total}</p>
          <p>Collection best spotlight: ${spotlight}</p>
          <p>Colection best market: ${market}</p>
        </div>
      </div>
    </section>
  );
}
