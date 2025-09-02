import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="flex items-center space-x-4 p-4 sm:justify-between sm:space-x-0">
        <Logo />
      </div>
    </header>
  );
}

function Logo() {
  return (
    <Button asChild variant="ghost" className="p-2">
      <Link href="/">
        <Image
          src={"/logo/logo-full.svg"}
          alt={`${site.name} logo`}
          width={160}
          height={25}
        />
      </Link>
    </Button>
  );
}
