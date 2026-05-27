import { Github, Linkedin } from "lucide-react";
import { Logo } from "./Logo";

const AUTHOR_NAME = "Iusif Mamedov";
const AUTHOR_ROLE = "Full Stack Developer";
const AUTHOR_GITHUB = "https://github.com/Iusif797";
const AUTHOR_LINKEDIN = "https://www.linkedin.com/in/iusifmamedov/";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background px-5 py-10 sm:px-6 sm:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-10">
        <div className="col-span-2 md:col-span-2">
          <div className="mb-3 sm:mb-4">
            <Logo />
          </div>
          <p className="text-foreground/60 max-w-sm text-[13px] sm:text-sm leading-relaxed">
            The premium car-sharing service for Prague. By the minute, anywhere in the inner ring.
          </p>
        </div>
        <div>
          <div className="text-[11px] sm:text-xs uppercase tracking-wider text-foreground/50 mb-3 sm:mb-4">
            Company
          </div>
          <ul className="space-y-2 text-foreground/80 text-[13px] sm:text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                About
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Careers
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Press
              </a>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-[11px] sm:text-xs uppercase tracking-wider text-foreground/50 mb-3 sm:mb-4">
            Support
          </div>
          <ul className="space-y-2 text-foreground/80 text-[13px] sm:text-sm">
            <li>
              <a href="#" className="hover:text-primary">
                Help center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Contact
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-primary">
                Terms · Privacy
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-border flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1.5 sm:gap-1">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.32em] text-foreground/40">
            Designed &amp; developed by
          </span>
          <a
            href={AUTHOR_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            className="font-display text-base sm:text-lg leading-tight text-foreground transition-colors hover:text-primary"
          >
            {AUTHOR_NAME}
            <span className="ml-2 align-middle text-[11px] sm:text-xs uppercase tracking-[0.18em] text-foreground/55">
              {AUTHOR_ROLE}
            </span>
          </a>
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5">
          <a
            href={AUTHOR_GITHUB}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub — Iusif Mamedov"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/[0.03] text-foreground/75 transition hover:border-primary/50 hover:bg-white/[0.07] hover:text-primary"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={AUTHOR_LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn — Iusif Mamedov"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white/[0.03] text-foreground/75 transition hover:border-primary/50 hover:bg-white/[0.07] hover:text-primary"
          >
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
