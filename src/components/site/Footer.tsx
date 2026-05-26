import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background px-5 py-10 sm:px-6 sm:py-16">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8 md:gap-10">
        <div className="col-span-2 md:col-span-2">
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <Zap className="w-5 h-5 text-primary" strokeWidth={2.5} />
            <span className="font-display text-xl sm:text-2xl italic">Praha Drive</span>
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
      <div className="max-w-7xl mx-auto mt-8 sm:mt-12 pt-5 sm:pt-6 border-t border-border text-[11px] sm:text-xs text-foreground/50 flex flex-col gap-1.5 sm:flex-row sm:justify-between sm:flex-wrap">
        <span>© 2026 Praha Drive s.r.o. · Praha, Česko</span>
        <span>Made with care on Vltava's banks.</span>
      </div>
    </footer>
  );
}
