import { data } from "@/mock/cards";
import Image from "next/image";

export default async function CardPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const card = data.find((card) => card.id === id);

  if (!card) {
    return <div>Card not found</div>;
  }

  if (!card.image || !card.name) {
    return <div>Image or name not available</div>;
  }

  return (
    <div>
      <span>{card.name}</span>
      <Image src={card.image} alt={card.name} width={1000} height={1000} />
    </div>
  );
}
