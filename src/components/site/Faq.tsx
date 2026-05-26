import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";

const Q = [
  { q: "Where can I park?", a: "Anywhere inside Prague's inner ring on legal public parking. We cover residential zones — no extra fees." },
  { q: "What if the car runs low on fuel or charge?", a: "Use the fuel card in the glovebox at any partner station. We credit 5 minutes free per refuel." },
  { q: "Do I need a Czech driver's license?", a: "Any EU/EEA license works. Non-EU licenses require an International Driving Permit. Minimum age 21." },
  { q: "What if I get into an accident?", a: "All cars have comprehensive insurance with 5,000 Kč deductible. Call us 24/7 in-app and we handle the rest." },
  { q: "Can I take the car outside Prague?", a: "Yes. Czech Republic and EU countries are allowed. Just end the trip back inside the Prague zone." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="relative py-32 px-6 bg-background">
      <div className="max-w-3xl mx-auto">
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4 text-center">Questions</div>
        <h2 className="font-display text-5xl md:text-6xl text-center leading-[1] mb-16">
          Good to <em className="italic">know.</em>
        </h2>
        <div className="flex flex-col gap-3">
          {Q.map((item, i) => (
            <div key={i} className="rounded-2xl glass overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-display text-xl pr-6">{item.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} transition={{ duration: 0.25 }}>
                  <Plus className="w-5 h-5 text-primary" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <p className="px-6 pb-6 text-foreground/70 leading-relaxed">{item.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
