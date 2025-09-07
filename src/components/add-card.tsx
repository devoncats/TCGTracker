import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePokemonStore } from "@/stores/pokemon.store";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function AddCard() {
  const { pageRoute, setPageRoute, setPriceFilter, getStats, addCard } =
    usePokemonStore();

  const { maxSpotlightPrice } = getStats();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!pageRoute.trim()) {
      toast.error("Error", {
        description: "Please enter a TCG Player URL",
      });

      return;
    }

    const result = await addCard();

    if (result.error) {
      toast.error("Error", {
        description: result.message,
      });

      return;
    }

    toast.success("Success", { description: "Card added successfully!" });

    setPageRoute("");
    setPriceFilter(maxSpotlightPrice);
  };

  const handleUrlValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageRoute(event.target.value);
  };

  return (
    <article className="bg-muted grid gap-4 rounded border p-4">
      <h2 className="heading">Add card</h2>

      <form onSubmit={handleSubmit} className="flex items-end gap-2">
        <div className="grid w-full gap-1">
          <Label>TCG Player URL</Label>
          <Input
            value={pageRoute}
            onChange={handleUrlValueChange}
            placeholder="Terapagos ex - 128/142 - SV07: Stellar Crown (SCR)"
          />
        </div>

        <Button type="submit">
          <Plus />
          <span>Add</span>
        </Button>
      </form>
    </article>
  );
}
