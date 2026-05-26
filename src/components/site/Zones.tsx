import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const PINS = [
  { id: "1", name: "Staré Město", cars: 42, x: 50, y: 48, desc: "Old Town — historic core, dense free-floating coverage." },
  { id: "2", name: "Vinohrady", cars: 28, x: 64, y: 58, desc: "Leafy district, great for evening returns." },
  { id: "3", name: "Karlín", cars: 35, x: 64, y: 36, desc: "River-side hub, charging stations every 200m." },
  { id: "4", name: "Smíchov", cars: 31, x: 36, y: 62, desc: "Riverbank, fast access to D5 toward Plzeň." },
  { id: "5", name: "Letná", cars: 22, x: 46, y: 28, desc: "Park & city view — perfect weekend pickups." },
  { id: "6", name: "Vyšehrad", cars: 18, x: 54, y: 74, desc: "Quiet residential, easy parking by day." },
];

export function Zones() {
  const [active, setActive] = useState(PINS[0]);

  return (
    <section id="zones" className="relative py-32 px-6 bg-background overflow-hidden">
      <div className="absolute inset-0 radial-glow opacity-40 pointer-events-none" />
      <div className="max-w-7xl mx-auto relative grid md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">Zones</div>
          <h2 className="font-display text-5xl md:text-6xl leading-[1] mb-8">
            All of Prague.<br /><em className="italic text-foreground/70">Free-floating.</em>
          </h2>

          <div className="relative aspect-square max-w-xl rounded-3xl glass overflow-hidden">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <defs>
                <radialGradient id="rg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.86 0.17 90)" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="oklch(0.86 0.17 90)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" fill="url(#rg)" />
              {/* Vltava river */}
              <path
                d="M 40 5 Q 45 25 35 40 Q 25 55 40 70 Q 50 80 45 100"
                stroke="oklch(0.86 0.17 90 / 0.35)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              {/* ring boundary */}
              <circle cx="50" cy="50" r="38" stroke="oklch(1 0 0 / 0.1)" strokeDasharray="1 2" fill="none" />
              {PINS.map((p) => (
                <g key={p.id} onClick={() => setActive(p)} className="cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={active.id === p.id ? 2.6 : 1.6}
                    fill="oklch(0.86 0.17 90)"
                    className="transition-all"
                  />
                  {active.id === p.id && (
                    <circle cx={p.x} cy={p.y} r="5" fill="none" stroke="oklch(0.86 0.17 90 / 0.5)">
                      <animate attributeName="r" from="2.6" to="6" dur="1.8s" repeatCount="indefinite" />
                      <animate attributeName="opacity" from="1" to="0" dur="1.8s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              ))}
            </svg>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-2">
            {PINS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className={`text-left p-4 rounded-2xl border transition ${
                  active.id === p.id
                    ? "bg-primary text-primary-foreground border-primary"
                    : "glass hover:bg-white/10 border-transparent"
                }`}
              >
                <div className="text-sm font-medium">{p.name}</div>
                <div className="text-xs opacity-70 mt-1">{p.cars} cars</div>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="p-6 rounded-2xl glass"
            >
              <div className="text-xs uppercase tracking-[0.25em] text-primary mb-2">Currently selected</div>
              <h3 className="font-display text-3xl mb-2">{active.name}</h3>
              <p className="text-foreground/70 text-sm leading-relaxed">{active.desc}</p>
              <div className="mt-4 flex items-center gap-4 text-sm">
                <span className="text-primary font-medium">{active.cars}</span>
                <span className="text-foreground/60">cars available now</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
