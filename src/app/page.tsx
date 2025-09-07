import { PokemonCardList } from "@/components/pokemon-card-list";
import { Sidebar } from "@/components/sidebar";

export default function HomePage() {
  return (
    <main className="flex h-[calc(100vh-69px)]">
      <Sidebar />
      <PokemonCardList />
    </main>
  );
}
