import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { footerQuickLinks } from "@/lib/nav-links";

function CartIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
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

export function SiteHeader() {
  return (
    <header className="border-b border-neutral-muted bg-white">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 lg:px-12">
        <Logo variant="dark" size={44} />

        <nav
          className="hidden items-center gap-6 text-sm font-medium text-brand-navy lg:flex"
          aria-label="Navigare principală"
        >
          {footerQuickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hover:text-brand-gold transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/cos"
          className="flex h-10 w-10 items-center justify-center rounded-full text-brand-navy hover:bg-brand-lilac transition-colors"
          aria-label="Coș cumpărături"
        >
          <CartIcon />
        </Link>
      </div>
    </header>
  );
}
