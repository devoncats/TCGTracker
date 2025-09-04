import { PokemonCardDashboard } from "@/components/pokemon-card-dashboard";
import { Sidebar } from "@/components/sidebar";

export default async function HomePage() {
  return (
    <main className="flex h-[calc(100vh-69px)]">
      <Sidebar />

      <PokemonCardDashboard />
    </main>
  );
}
