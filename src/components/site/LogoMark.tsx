import { useId } from "react";

type LogoMarkProps = {
  readonly className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  const uid = useId().replace(/:/g, "");
  const gold = `logo-gold-${uid}`;
  const goldDeep = `logo-gold-deep-${uid}`;
  const panel = `logo-panel-${uid}`;
  const shine = `logo-shine-${uid}`;

  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className={className} fill="none">
      <defs>
        <linearGradient id={panel} x1="6" y1="4" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.19 0.014 58)" />
          <stop offset="1" stopColor="oklch(0.11 0.01 52)" />
        </linearGradient>
        <linearGradient id={gold} x1="11" y1="17" x2="31" y2="28" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.95 0.12 98)" />
          <stop offset="0.42" stopColor="oklch(0.88 0.17 92)" />
          <stop offset="1" stopColor="oklch(0.73 0.15 78)" />
        </linearGradient>
        <linearGradient id={goldDeep} x1="14" y1="21" x2="28" y2="27" gradientUnits="userSpaceOnUse">
          <stop stopColor="oklch(0.78 0.14 82)" />
          <stop offset="1" stopColor="oklch(0.62 0.12 72)" />
        </linearGradient>
        <linearGradient id={shine} x1="20" y1="0" x2="20" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.16" />
          <stop offset="0.38" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="40" height="40" rx="11" fill={`url(#${panel})`} />
      <rect
        width="40"
        height="40"
        rx="11"
        stroke="oklch(0.86 0.17 90 / 0.22)"
        strokeWidth="0.75"
      />
      <path
        d="M8.75 26.25h22.5v1.1c0 .55-.45 1-1 1h-20.5c-.55 0-1-.45-1-1v-1.1Z"
        fill={`url(#${goldDeep})`}
      />
      <path
        d="M10.2 26.25V24.4c0-.75.61-1.36 1.36-1.36h1.05l1.55-2.95c.42-.78 1.24-1.24 2.12-1.24h8.44c.88 0 1.7.46 2.12 1.24l1.55 2.95h1.05c.75 0 1.36.61 1.36 1.36v1.85H10.2Z"
        fill={`url(#${gold})`}
      />
      <path
        d="M13.35 19.85h13.3l1.72 2.88H11.63l1.72-2.88Z"
        fill={`url(#${gold})`}
      />
      <path
        d="M15.1 21.35h9.8a.55.55 0 0 0 .52-.72l-.82-1.48H15.4l-.82 1.48a.55.55 0 0 0 .52.72Z"
        fill="oklch(0.14 0.012 58 / 0.55)"
      />
      <circle cx="13.15" cy="26.45" r="1.55" fill="oklch(0.14 0.012 58)" />
      <circle cx="13.15" cy="26.45" r="0.62" fill={`url(#${gold})`} />
      <circle cx="26.85" cy="26.45" r="1.55" fill="oklch(0.14 0.012 58)" />
      <circle cx="26.85" cy="26.45" r="0.62" fill={`url(#${gold})`} />
      <path
        d="M18.2 14.15 19.1 12.1h1.8l.9 2.05 1.05-.55-.35 1.45h-4.25l-.35-1.45 1.05.55Z"
        fill={`url(#${gold})`}
      />
      <rect width="40" height="40" rx="11" fill={`url(#${shine})`} />
    </svg>
  );
}
