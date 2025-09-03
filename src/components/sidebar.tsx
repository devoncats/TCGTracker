import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SidebarProps {
  total: number;
  market: string;
  spotlight: string;
}

export function Sidebar({ total, spotlight, market }: SidebarProps) {
  return (
    <section className="bg-muted hidden min-w-sm flex-1 flex-col gap-6 border-r p-6 lg:flex">
      <div className="flex gap-4">
        <Input className="bg-white" />
        <Button>Add card</Button>
      </div>

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
