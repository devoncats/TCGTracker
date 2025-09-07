import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePokemonStore } from "@/stores/pokemon.store";

import { Ellipsis, Eye, Trash } from "lucide-react";
import Link from "next/link";

interface PokemonCardActionsProps {
  id: string;
}

export function PokemonCardActions({ id }: PokemonCardActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="h-fit cursor-pointer rounded p-1 transition-colors hover:bg-black/5">
        <Ellipsis size="16" />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <PokemonCardViewAction id={id} />
        <PokemonCardDeleteAction id={id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function PokemonCardViewAction({ id }: PokemonCardActionsProps) {
  return (
    <DropdownMenuItem asChild>
      <Link href={`/cards/${id}`}>
        <Eye />
        <span>View Details</span>
      </Link>
    </DropdownMenuItem>
  );
}

function PokemonCardDeleteAction({ id }: PokemonCardActionsProps) {
  const { deleteCard } = usePokemonStore();

  const handleDeleteClick = () => {
    deleteCard(id);
  };

  return (
    <DropdownMenuItem asChild>
      <Button
        onClick={handleDeleteClick}
        variant="ghost"
        className="h-8 w-full justify-start font-normal focus-visible:ring-0 focus-visible:ring-offset-0 has-[>svg]:px-2"
      >
        <Trash />
        <span>Delete</span>
      </Button>
    </DropdownMenuItem>
  );
}
