import Image from "next/image";
import { ImageOff } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductImage({
  src,
  alt,
  className,
}: {
  src: string | null;
  alt: string;
  className?: string;
}) {
  if (!src) {
    return (
      <div
        className={cn(
          "relative flex flex-col items-center justify-center gap-2 overflow-hidden bg-green-50",
          className,
        )}
      >
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <ImageOff className="h-8 w-8 text-green-300" strokeWidth={1.5} />
        <span className="text-xs font-medium text-green-500">Foto segera hadir</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1024px) 320px, 50vw"
      className={cn("object-cover", className)}
    />
  );
}
