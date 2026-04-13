import { cn } from "@/lib/utils";

function brandMarkSrc(): string {
  const base = import.meta.env.BASE_URL;
  return `${base}brand-mark.png`;
}

type BrandMarkProps = {
  className?: string;
  /** Pixel width and height (square). */
  size?: number;
  alt?: string;
};

/** PM Grove brand mark — lives in `public/brand-mark.png` (respects Vite `base` / GitHub Pages). */
export function BrandMark({ className, size = 28, alt = "PM Grove" }: BrandMarkProps) {
  return (
    <img
      src={brandMarkSrc()}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0 object-contain rounded-full ring-1 ring-border/50 bg-background", className)}
      decoding="async"
    />
  );
}
