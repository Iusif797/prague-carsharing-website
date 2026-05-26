import { useMemo, useState } from "react";

const MIN = 5;
const MAX = 60 * 24;
const RATE = 7; // Kč/min
const HOUR_CAP = 240;
const DAY_CAP = 1490;

function fmtDuration(m: number) {
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  if (h < 24) return `${h}h ${mm ? mm + "m" : ""}`.trim();
  const d = Math.floor(h / 24);
  const rh = h % 24;
  return `${d}d ${rh ? rh + "h" : ""}`.trim();
}

function calc(m: number) {
  // per-hour cap, then per-day cap
  const hours = Math.ceil(m / 60);
  const minuteCost = m * RATE;
  const hourlyCost = hours * HOUR_CAP;
  const perHour = Math.min(minuteCost, hourlyCost);
  const days = Math.ceil(m / (60 * 24));
  return Math.min(perHour, days * DAY_CAP);
}

export function Pricing() {
  const [m, setM] = useState(60);
  const price = useMemo(() => calc(m), [m]);

  return (
    <section id="pricing" className="relative py-32 px-6 bg-background">
      <div className="max-w-5xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4 text-center">Pricing</div>
        <h2 className="font-display text-5xl md:text-6xl text-center leading-[1] mb-4">
          Pay by the minute.<br /><em className="italic text-foreground/70">Cap by the day.</em>
        </h2>
        <p className="text-center text-foreground/60 max-w-xl mx-auto mb-16">
          Slide to see the price for any trip — from quick errands to weekend escapes.
        </p>

        <div className="rounded-3xl glass p-8 md:p-12 shadow-elegant">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="text-foreground/60 text-sm uppercase tracking-wider mb-2">Trip length</div>
              <div className="font-display text-5xl md:text-6xl">{fmtDuration(m)}</div>
            </div>
            <div className="text-right">
              <div className="text-foreground/60 text-sm uppercase tracking-wider mb-2">You pay</div>
              <div className="font-display text-5xl md:text-6xl text-primary tabular-nums">
                {price.toLocaleString("cs-CZ")} <span className="text-2xl text-foreground/70">Kč</span>
              </div>
            </div>
          </div>

          <input
            type="range"
            min={MIN}
            max={MAX}
            value={m}
            onChange={(e) => setM(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none bg-white/10 accent-primary cursor-pointer"
          />

          <div className="flex justify-between text-xs text-foreground/50 mt-3 uppercase tracking-wider">
            <span>5 min</span>
            <span>1 h</span>
            <span>1 day</span>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-10 text-center">
            <Cell label="Per minute" value={`${RATE} Kč`} />
            <Cell label="Hour cap" value={`${HOUR_CAP} Kč`} />
            <Cell label="Day cap" value={`${DAY_CAP} Kč`} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Cell({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-5 rounded-2xl border border-border">
      <div className="text-xs uppercase tracking-wider text-foreground/50 mb-1">{label}</div>
      <div className="font-display text-2xl">{value}</div>
    </div>
  );
}
