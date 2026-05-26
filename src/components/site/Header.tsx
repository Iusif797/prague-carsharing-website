import { useEffect, useState } from "react";
import { Menu, Smartphone, Zap } from "lucide-react";

const appButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary font-semibold leading-none text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_35%,transparent),0_10px_28px_-12px_color-mix(in_oklab,var(--color-primary)_70%,transparent)] transition-[transform,filter,box-shadow] duration-200 hover:brightness-105 active:scale-[0.98]";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-border bg-background/70 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#" className="flex min-w-0 items-center gap-2 text-foreground">
          <Zap className="h-5 w-5 shrink-0 text-primary" strokeWidth={2.5} />
          <span className="truncate font-display text-[1.35rem] italic tracking-tight sm:text-2xl">
            Praha&nbsp;Drive
          </span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
          <a href="#fleet" className="transition-colors hover:text-primary">
            Fleet
          </a>
          <a href="#how" className="transition-colors hover:text-primary">
            How it works
          </a>
          <a href="#zones" className="transition-colors hover:text-primary">
            Zones
          </a>
          <a href="#pricing" className="transition-colors hover:text-primary">
            Pricing
          </a>
          <a href="#faq" className="transition-colors hover:text-primary">
            FAQ
          </a>
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            type="button"
            className={`${appButtonClass} h-9 min-w-[2.75rem] px-3 text-xs sm:hidden`}
            aria-label="Get the app"
          >
            <Smartphone className="h-3.5 w-3.5" />
            App
          </button>
          <button type="button" className={`${appButtonClass} hidden h-10 min-w-[8.75rem] px-5 text-sm sm:inline-flex`}>
            <Smartphone className="h-4 w-4 opacity-90" />
            Get the app
          </button>
          <button type="button" className="inline-flex h-10 w-10 items-center justify-center text-foreground/80 md:hidden" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
