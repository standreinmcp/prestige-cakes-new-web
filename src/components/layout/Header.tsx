import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

function CartIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <path
        d="M6 6h15l-1.5 9h-12L6 6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 6L5 3H2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" />
      <circle cx="18" cy="20" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2 4l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Header() {
  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-5 lg:px-12">
        <Logo variant="light" size={52} />

        <nav
          className="hidden items-center gap-8 text-sm font-medium text-white lg:flex"
          aria-label="Navigare principală"
        >
          <Link href="/" className="hover:text-brand-gold transition-colors">
            Acasă
          </Link>
          <Link
            href="/vitrina-live"
            className="flex items-center gap-2 hover:text-brand-gold transition-colors"
          >
            Vitrină Live
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
          </Link>
          <Link
            href="/produse-la-comanda"
            className="hover:text-brand-gold transition-colors"
          >
            Produse la comandă
          </Link>
          <Link
            href="/galerie-foto"
            className="hover:text-brand-gold transition-colors"
          >
            Galerie foto
          </Link>
          <Link
            href="/despre-noi"
            className="hover:text-brand-gold transition-colors"
          >
            Despre noi
          </Link>
        </nav>

        <div className="flex items-center gap-4 text-white">
          <Link
            href="/cos"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            aria-label="Coș cumpărături"
          >
            <CartIcon />
          </Link>
          <button
            type="button"
            className="hidden items-center gap-2 rounded-full border border-white/30 px-3 py-2 text-sm font-medium hover:bg-white/10 transition-colors sm:flex"
            aria-label="Selector limbă"
          >
            <span className="text-base" aria-hidden>
              🇷🇴
            </span>
            Română
            <ChevronDownIcon />
          </button>
        </div>
      </div>
    </header>
  );
}
