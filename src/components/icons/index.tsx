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
