import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Smartphone, X } from "lucide-react";
import { Logo } from "./Logo";
import { parseSectionHash, scrollToSection } from "@/lib/scrollSections";

type NavLink = {
  readonly id: string;
  readonly label: string;
};

const NAV_LINKS: readonly NavLink[] = [
  { id: "fleet", label: "Fleet" },
  { id: "how", label: "How it works" },
  { id: "zones", label: "Zones" },
  { id: "pricing", label: "Pricing" },
  { id: "faq", label: "FAQ" },
];

const appButtonClass =
  "inline-flex items-center justify-center gap-2 rounded-full bg-primary font-semibold leading-none text-primary-foreground shadow-[0_0_0_1px_color-mix(in_oklab,var(--color-primary)_35%,transparent),0_10px_28px_-12px_color-mix(in_oklab,var(--color-primary)_70%,transparent)] transition-[transform,filter,box-shadow] duration-200 hover:brightness-105 active:scale-[0.98]";

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

  useEffect(() => {
    const sectionId = parseSectionHash(window.location.hash);
    if (!sectionId) return;
    const timer = window.setTimeout(() => scrollToSection(sectionId, "auto"), 120);
    return () => window.clearTimeout(timer);
  }, []);

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId);
    history.replaceState(null, "", `#${sectionId}`);
    closeMenu();
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled || menuOpen
            ? "border-b border-border bg-background/70 backdrop-blur-xl"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-8 text-sm text-foreground/70 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  handleNavClick(link.id);
                }}
                className="transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
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
            <div className="flex items-center justify-between gap-4">
              <div className="text-[10px] uppercase tracking-[0.4em] text-primary/85">Menu</div>
              <button
                type="button"
                onClick={closeMenu}
                aria-label="Close menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-foreground/85 backdrop-blur-md transition hover:border-primary/50 hover:text-primary"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-6 flex flex-col">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    handleNavClick(link.id);
                  }}
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
