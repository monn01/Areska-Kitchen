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
          "relative flex flex-col items-center justify-center gap-1 overflow-hidden bg-green-50 p-1",
          className,
        )}
      >
        <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/50 to-transparent" />
        <ImageOff className="h-5 w-5 shrink-0 text-green-300" strokeWidth={1.5} />
        <span className="text-center text-[10px] leading-tight font-medium text-green-500">
          Foto segera hadir
        </span>
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
