import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  /** Light = white logo for dark/hero backgrounds; dark = navy logo for light backgrounds */
  variant?: "light" | "dark";
  size?: number;
  className?: string;
};

/** Figma logo frame aspect ratio (95.43 × 83) */
const LOGO_ASPECT = 83 / 95.43;

export function Logo({
  variant = "dark",
  size = 48,
  className = "",
}: LogoProps) {
  const src =
    variant === "light" ? "/brand/logo-light.svg" : "/brand/logo.svg";
  const width = size;
  const height = Math.round(size * LOGO_ASPECT);

  return (
    <Link
      href="/"
      className={`inline-flex shrink-0 ${className}`}
      aria-label="Prestige Cakes — Acasă"
    >
      <Image
        src={src}
        alt="Prestige Cakes"
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
        style={{ width, height }}
      />
    </Link>
  );
}
