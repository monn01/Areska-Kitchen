import Image from "next/image";
import Link from "next/link";

export function MinimalHeader() {
  return (
    <header className="border-b border-green-100 bg-cream-50">
      <div className="mx-auto flex h-16 max-w-container items-center px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <span className="relative block h-9 w-9 shrink-0 overflow-hidden rounded-full">
            <Image
              src="/logo/logo-icon.png"
              alt="Areska Kitchen"
              fill
              sizes="36px"
              className="object-cover"
            />
          </span>
          <span className="font-heading text-lg font-semibold text-green-600">
            Areska Kitchen
          </span>
        </Link>
      </div>
    </header>
  );
}
