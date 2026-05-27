import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Smartphone, X, Zap } from "lucide-react";

type NavLink = {
  readonly href: string;
  readonly label: string;
};

const NAV_LINKS: readonly NavLink[] = [
  { href: "#fleet", label: "Fleet" },
  { href: "#how", label: "How it works" },
  { href: "#zones", label: "Zones" },
  { href: "#pricing", label: "Pricing" },
  { href: "#faq", label: "FAQ" },
];

const appButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary font-semibold leading-none text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_35%,transparent),0_10px_28px_-12px_color-mix(in_oklab,var(--color-primary)_70%,transparent)] transition-[transform,filter,box-shadow] duration-200 hover:brightness-105 active:scale-[0.98]";

function Logo() {
  return (
    <a href="#" className="group flex min-w-0 items-center gap-2.5 text-foreground">
      <span className="relative inline-flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-[12px] border border-white/15 bg-white/[0.04] backdrop-blur-md shadow-[0_8px_24px_-12px_color-mix(in_oklab,var(--color-primary)_45%,transparent)] transition-[transform,box-shadow] duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_14px_32px_-12px_color-mix(in_oklab,var(--color-primary)_65%,transparent)]">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,color-mix(in_oklab,var(--color-primary)_45%,transparent),transparent_70%)]"
        />
        <Zap
          className="relative h-4 w-4 text-primary drop-shadow-[0_0_8px_color-mix(in_oklab,var(--color-primary)_55%,transparent)]"
          strokeWidth={2.5}
          fill="currentColor"
        />
      </span>
      <span className="flex min-w-0 items-baseline gap-1.5">
        <span className="truncate font-display text-[1.35rem] italic leading-none tracking-tight sm:text-[1.55rem]">
          Praha
        </span>
        <span
          aria-hidden="true"
          className="inline-block h-1 w-1 shrink-0 rounded-full bg-primary opacity-85"
        />
        <span className="truncate font-display text-[1.35rem] leading-none tracking-tight text-foreground/85 sm:text-[1.55rem]">
          Drive
        </span>
      </span>
    </a>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-b border-border bg-background/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href} className="transition-colors hover:text-primary">
                {link.label}
              </a>
            ))}
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
            <button
              type="button"
              className={`${appButtonClass} hidden h-10 min-w-[8.75rem] px-5 text-sm sm:inline-flex`}
            >
              <Smartphone className="h-4 w-4 opacity-90" />
              Get the app
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/85 backdrop-blur-md transition hover:border-primary/50 hover:text-primary md:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                {menuOpen ? (
                  <motion.span
                    key="x"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <X className="h-5 w-5" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    className="inline-flex"
                  >
                    <Menu className="h-5 w-5" />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeMenu}
            aria-hidden="true"
            className="fixed inset-0 z-40 bg-background/55 backdrop-blur-sm md:hidden"
          />
        )}
        {menuOpen && (
          <motion.aside
            key="mobile-nav"
            id="mobile-nav"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            className="fixed inset-y-0 right-0 z-50 flex w-[min(86vw,22rem)] flex-col border-l border-white/10 bg-background/95 px-6 pt-[max(5rem,env(safe-area-inset-top))] pb-[max(2rem,env(safe-area-inset-bottom))] shadow-elegant backdrop-blur-2xl md:hidden"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent"
            />
            <div className="text-[10px] uppercase tracking-[0.4em] text-primary/85">Menu</div>

            <nav className="mt-6 flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={closeMenu}
                  initial={{ opacity: 0, x: 18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + index * 0.05, duration: 0.32 }}
                  className="group flex items-baseline justify-between border-b border-white/[0.06] py-4 text-foreground/90 transition-colors hover:text-primary"
                >
                  <span className="font-display text-[1.85rem] leading-none tracking-tight">
                    {link.label}
                  </span>
                  <span className="text-[10px] font-medium tracking-[0.25em] text-foreground/35 transition-colors group-hover:text-primary/80">
                    0{index + 1}
                  </span>
                </motion.a>
              ))}
            </nav>

            <div className="mt-auto flex flex-col gap-4 pt-6">
              <button
                type="button"
                onClick={closeMenu}
                className={`${appButtonClass} h-12 w-full text-sm`}
              >
                <Smartphone className="h-4 w-4 opacity-90" />
                Get the app
              </button>
              <p className="text-[10px] uppercase tracking-[0.32em] text-foreground/45">
                Free-floating · Praha
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
