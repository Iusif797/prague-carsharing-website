import { Apple, Smartphone } from "lucide-react";

export function CtaPhone() {
  return (
    <section className="relative py-32 px-6 bg-background overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-50 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative grid md:grid-cols-2 gap-16 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Get the app</div>
          <h2 className="font-display text-5xl md:text-6xl leading-[1] mb-6">
            Your first ride is <em className="italic text-primary">free.</em>
          </h2>
          <p className="text-foreground/70 text-lg max-w-md mb-8">
            Download the app, verify your license in 90 seconds, and we'll drop 200 Kč onto your account.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="h-14 px-6 rounded-2xl bg-foreground text-background flex items-center gap-3 hover:opacity-90 transition shadow-elegant">
              <Apple className="w-6 h-6" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider opacity-70">Download on the</div>
                <div className="font-medium">App Store</div>
              </div>
            </button>
            <button className="h-14 px-6 rounded-2xl glass flex items-center gap-3 hover:bg-white/10 transition">
              <Smartphone className="w-6 h-6 text-primary" />
              <div className="text-left leading-tight">
                <div className="text-[10px] uppercase tracking-wider opacity-70">Get it on</div>
                <div className="font-medium">Google Play</div>
              </div>
            </button>
          </div>
        </div>

        {/* phone mockup */}
        <div className="relative mx-auto">
          <div className="relative w-[280px] h-[560px] rounded-[3rem] glass shadow-elegant p-2.5">
            <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-32 h-6 bg-background rounded-b-2xl z-10" />
            <div className="w-full h-full rounded-[2.4rem] overflow-hidden relative bg-black">
              <img src="/frames/f_1.2.jpg" alt="App" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              <div className="absolute bottom-6 inset-x-4 p-4 rounded-2xl glass">
                <div className="text-[10px] uppercase tracking-wider text-primary mb-1">Available</div>
                <div className="font-display text-xl">BMW i4 · 87%</div>
                <div className="text-xs text-foreground/70 mt-1">2 min walk · Wenceslas Sq.</div>
                <button className="mt-3 w-full h-9 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                  Reserve
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
