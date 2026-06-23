import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { Logo } from "@/components/brand/Logo";
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  TikTokIcon,
  WhatsAppIcon,
} from "@/components/icons";
import { getNavLabel } from "@/lib/i18n/nav";
import { LOCALE_COOKIE, parseLocale } from "@/lib/locale";
import { footerQuickLinks } from "@/lib/nav-links";

const legalLinks = [
  { href: "/gdpr", label: "GDPR" },
  { href: "/cookie", label: "Cookie" },
  { href: "/termeni", label: "T&C" },
];

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com", icon: FacebookIcon },
  { label: "Instagram", href: "https://instagram.com", icon: InstagramIcon },
  { label: "TikTok", href: "https://tiktok.com", icon: TikTokIcon },
  { label: "WhatsApp", href: "https://wa.me/40747057615", icon: WhatsAppIcon },
];

function SocialLinks() {
  return (
    <div className="mt-6 flex gap-4">
      {socialLinks.map(({ label, href, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
          aria-label={label}
        >
          <Icon className="h-5 w-5" />
        </a>
      ))}
    </div>
  );
}

function ContactBlock() {
  return (
    <div>
      <h3 className="text-xl font-medium">Contact:</h3>
      <ul className="mt-5 space-y-5 text-sm">
        <li>
          <a
            href="tel:+40747057615"
            className="inline-flex items-center gap-3.5 underline hover:text-brand-gold"
          >
            <PhoneIcon className="h-[19px] w-[19px] shrink-0" />
            +40 747 057 615
          </a>
        </li>
        <li>
          <a
            href="mailto:contact@prestige-cakes.ro"
            className="inline-flex items-center gap-3.5 underline hover:text-brand-gold"
          >
            <MailIcon className="h-[19px] w-[19px] shrink-0" />
            contact@prestige-cakes.ro
          </a>
        </li>
        <li>
          <span className="inline-flex items-center gap-3.5 underline">
            <MapPinIcon className="h-[19px] w-[19px] shrink-0" />
            Baia Mare, Aleea Dobrogei nr. 1
          </span>
        </li>
      </ul>
    </div>
  );
}

function QuickLinksBlock({ locale }: { locale: ReturnType<typeof parseLocale> }) {
  return (
    <div>
      <h3 className="text-xl font-medium">Link-uri rapide:</h3>
      <ul className="mt-5 space-y-2 text-sm">
        {footerQuickLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="underline hover:text-brand-gold">
              {getNavLabel(locale, link.labelKey)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CopyrightBlock() {
  return (
    <div className="text-center">
      <p className="text-sm font-medium">
        © Prestige Cakes 2026. Toate drepturile rezervate.
      </p>
      <div className="mt-4 flex flex-wrap justify-center gap-6 text-sm text-neutral-muted underline">
        {legalLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

function ComplianceBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Image
        src="/images/footer/sol.png"
        alt="SOL - Soluționarea online a litigiilor"
        width={136}
        height={37}
      />
      <Image
        src="/images/footer/sal.png"
        alt="SAL - Soluționarea alternativă a litigiilor ANPC"
        width={136}
        height={37}
      />
    </div>
  );
}

export async function Footer() {
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(LOCALE_COOKIE)?.value);

  return (
    <footer className="relative overflow-hidden text-white">
      <Image
        src="/images/home/hero.jpg"
        alt=""
        fill
        className="object-cover blur-[6px] scale-105"
        sizes="100vw"
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/70" aria-hidden />

      <div className="relative mx-auto max-w-[1440px] px-6 py-12 lg:px-12">
        <div className="flex flex-col items-center">
          <Logo variant="light" size={98} />
          <SocialLinks />
        </div>

        <div className="mt-12 border-t border-white/20 pt-12">
          <div className="flex flex-col gap-10 lg:hidden">
            <ContactBlock />
            <QuickLinksBlock locale={locale} />
            <CopyrightBlock />
            <ComplianceBadges />
          </div>

          <div className="hidden gap-10 lg:grid lg:grid-cols-[1fr_auto_1fr]">
            <QuickLinksBlock locale={locale} />
            <div className="text-center">
              <CopyrightBlock />
              <div className="mt-8">
                <ComplianceBadges />
              </div>
            </div>
            <div className="lg:text-left">
              <ContactBlock />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
