type LogoProps = {
  readonly compact?: boolean;
};

export function Logo({ compact = false }: LogoProps) {
  return (
    <a
      href="#"
      aria-label="Praha Drive"
      className="group inline-flex shrink-0 items-center gap-2.5 text-foreground"
    >
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[11px] bg-[oklch(0.14_0.012_60)] shadow-[0_0_0_1px_color-mix(in_oklab,white_12%,transparent),0_12px_32px_-14px_color-mix(in_oklab,var(--color-primary)_65%,transparent)] ring-1 ring-primary/20 transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_35%,transparent),0_16px_40px_-12px_color-mix(in_oklab,var(--color-primary)_75%,transparent)]">
        <img
          src="/brand/logo-mark.png?v=4"
          alt=""
          aria-hidden="true"
          width={36}
          height={36}
          className="h-full w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[11px] bg-[linear-gradient(180deg,color-mix(in_oklab,white_16%,transparent)_0%,transparent_40%)]"
        />
      </span>
      {!compact && (
        <span className="whitespace-nowrap font-display text-[1.05rem] leading-none tracking-tight sm:text-[1.2rem]">
          <span className="italic text-foreground">Praha</span>
          <span className="text-primary">.</span>
          <span className="text-foreground">Drive</span>
        </span>
      )}
    </a>
  );
}
