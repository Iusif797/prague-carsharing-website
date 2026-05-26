import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const STEPS = [
  {
    n: "01",
    title: "Open the map",
    body: "See every available BMW around you in real time. Battery, fuel, and walking distance — all upfront.",
    img: "/frames/f_1.2.jpg",
  },
  {
    n: "02",
    title: "Reserve & walk up",
    body: "Lock a car for 15 minutes free. Walk over, your phone unlocks it the moment you're near.",
    img: "/frames/f_2.4.jpg",
  },
  {
    n: "03",
    title: "Drive & drop",
    body: "Drive anywhere in Prague's free-floating zone. Park, tap end, walk away. We bill by the minute.",
    img: "/frames/f_3.6.jpg",
  },
];

export function HowItWorks() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  return (
    <section id="how" ref={ref} className="relative bg-background" style={{ height: "300vh" }}>
      <div className="sticky top-0 h-svh flex items-center overflow-hidden">
        <div className="max-w-7xl mx-auto w-full px-6 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">How it works</div>
            <h2 className="font-display text-5xl md:text-6xl leading-[1] mb-12">
              Three taps.<br /><em className="italic text-foreground/70">You're driving.</em>
            </h2>
            <div className="flex flex-col gap-8">
              {STEPS.map((s, i) => {
                const start = i / STEPS.length;
                const end = (i + 1) / STEPS.length;
                const o = useTransform(scrollYProgress, [start - 0.05, start, end, end + 0.05], [0.25, 1, 1, 0.25]);
                const x = useTransform(scrollYProgress, [start - 0.05, start], [-20, 0]);
                return (
                  <motion.div key={s.n} style={{ opacity: o, x }} className="flex gap-5">
                    <div className="font-display text-3xl text-primary w-12 shrink-0">{s.n}</div>
                    <div>
                      <h3 className="text-2xl font-display mb-2">{s.title}</h3>
                      <p className="text-foreground/70 leading-relaxed max-w-md">{s.body}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="relative aspect-[4/5] rounded-3xl glass overflow-hidden shadow-elegant">
            {STEPS.map((s, i) => {
              const start = i / STEPS.length;
              const end = (i + 1) / STEPS.length;
              const o = useTransform(
                scrollYProgress,
                [start - 0.05, start + 0.05, end - 0.05, end + 0.05],
                [0, 1, 1, 0],
              );
              return (
                <motion.img
                  key={s.n}
                  src={s.img}
                  alt={s.title}
                  loading="lazy"
                  style={{ opacity: o }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              );
            })}
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
