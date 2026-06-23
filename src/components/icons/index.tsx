export function ChevronRightIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M9 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M3 8h10M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function WavyCheckIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 12.5l2.5 2.5L16 9.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function CartIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden>
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

export function ChevronDownIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <path
        d="M5 7.5l5 5 5-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CaretCircleIcon({ className = "h-[60px] w-[60px]" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 60 60" fill="none" aria-hidden>
      <circle cx="30" cy="30" r="29" stroke="#000851" strokeWidth="1.5" opacity="0.25" />
      <path
        d="M26 22l10 8-10 8"
        stroke="#000851"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

type IconProps = { className?: string };

export function WheatIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M16 28V14M16 14c-2-4-6-5-8-3s-1 6 2 8M16 14c2-4 6-5 8-3s1 6-2 8M16 20c-1.5-3-4.5-4-6-2s0 4.5 2 5.5M16 20c1.5-3 4.5-4 6-2s0 4.5-2 5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChefHatIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M8 18h16v4a2 2 0 01-2 2H10a2 2 0 01-2-2v-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M10 18c-3 0-5-2.5-5-5.5S7 7 10 7c1.5 0 3 .8 4 2 1-1.2 2.5-2 4-2 3 0 5 2.5 5 5.5S23 18 20 18"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function VanIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M4 14h16l4 5v5h-3M4 24h3M21 24h3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4 14V10a2 2 0 012-2h12v6M20 14h4l2 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="8" cy="24" r="2" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="23" cy="24" r="2" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

export function MedalIcon({ className = "h-[34px] w-[34px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" aria-hidden>
      <circle cx="17" cy="13" r="7" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 20l-3 9 8-4 8 4-3-9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M14 13l2 2 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ShieldIcon({ className = "h-[34px] w-[34px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" aria-hidden>
      <path
        d="M17 4l10 4v8c0 7-4.5 11.5-10 14-5.5-2.5-10-7-10-14V8l10-4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 17l3 3 7-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TeamIcon({ className = "h-[34px] w-[34px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" aria-hidden>
      <circle cx="12" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="23" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M5 26c0-4 3.5-7 7-7s7 3 7 7M18 26c0-3 2.5-5.5 5.5-5.5S29 23 29 26"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkleIcon({ className = "h-[34px] w-[34px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 34 34" fill="none" aria-hidden>
      <path
        d="M17 4l2 8 8 2-8 2-2 8-2-8-8-2 8-2 2-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M26 6l1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PhoneIcon({ className = "h-[19px] w-[19px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 19 19" fill="none" aria-hidden>
      <path
        d="M5.5 3h2l1 4-2.5 1.5a11 11 0 005.5 5.5L13 11.5l4 1v2a2 2 0 01-2 2A12 12 0 013 5.5a2 2 0 012-2.5z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className = "h-[19px] w-[19px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 19 19" fill="none" aria-hidden>
      <rect x="2.5" y="4.5" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M3 6l6.5 4.5L16 6" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
    </svg>
  );
}

export function MapPinIcon({ className = "h-[19px] w-[19px]" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 19 19" fill="none" aria-hidden>
      <path
        d="M9.5 16.5s5.5-4.5 5.5-8a5.5 5.5 0 10-11 0c0 3.5 5.5 8 5.5 8z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <circle cx="9.5" cy="8.5" r="2" stroke="currentColor" strokeWidth="1.25" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M11.5 10.5H13l-.5-2h-1.5V7.5c0-.6.2-1 1-1h.8V4.5h-1.3c-1.8 0-2.5 1-2.5 2.5V8.5H8v2h1.5v5h2v-5z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" aria-hidden>
      <rect x="3.5" y="3.5" width="13" height="13" rx="3.5" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.25" />
      <circle cx="14" cy="6" r="0.75" fill="currentColor" />
    </svg>
  );
}

export function TikTokIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M12.5 3.5c.5 1.8 1.8 3.2 3.5 3.7V9.5c-1.3 0-2.5-.4-3.5-1.1v5.1a4.5 4.5 0 11-2.7-4.1 4.6 4.6 0 002.2.6v-2.2a2.4 2.4 0 01-1.3-.4 2.3 2.3 0 01-1.2-2V3.5h2z" />
    </svg>
  );
}

export function WhatsAppIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 3a7 7 0 00-6 10.3L3 17l3.8-1A7 7 0 1010 3zm0 1.5a5.5 5.5 0 014.2 9.1l-.3.2-.1.3-.6 2.1 2.1-.6.3-.1.2-.3A5.5 5.5 0 0010 4.5zm-2.2 2.3c.1 0 .3 0 .4.3l.6 1.3c.1.2 0 .4-.1.5l-.4.4c-.1.1-.1.2 0 .4.6 1.1 1.5 2 2.6 2.6.2.1.3.1.4 0l.4-.4c.1-.1.3-.2.5-.1l1.3.6c.3.1.3.3.3.4 0 .8-.6 1.5-1.4 1.5-.3 0-.7-.1-1.8-.6-2.3-1-4-2.7-5-5-.5-1.1-.6-1.5-.6-1.8 0-.8.7-1.4 1.5-1.4z" />
    </svg>
  );
}
