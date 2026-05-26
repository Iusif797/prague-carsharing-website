import { useEffect, useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  useMotionValueEvent,
  AnimatePresence,
  type MotionValue,
} from "motion/react";
import { ArrowDown, Star, Plus, Apple, Smartphone } from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { FLEET_CARS } from "@/data/fleet";
import { FleetCard } from "@/components/site/FleetCard";
import { PhoneMock } from "@/components/site/PhoneMock";

const HOW = [
  {
    n: "01",
    title: "Open the map",
    body: "See every BMW around you in real time. Battery, fuel, walking distance — all upfront.",
  },
  {
    n: "02",
    title: "Reserve & walk up",
    body: "Lock a car for 15 minutes free. Your phone unlocks it the moment you're near.",
  },
  {
    n: "03",
    title: "Drive & drop",
    body: "Drive anywhere in Prague's free-floating zone. Park, tap end, walk away.",
  },
];

const PINS = [
  {
    id: "1",
    name: "Staré Město",
    cars: 42,
    x: 50,
    y: 48,
    desc: "Old Town — historic core, dense coverage.",
  },
  {
    id: "2",
    name: "Vinohrady",
    cars: 28,
    x: 64,
    y: 58,
    desc: "Leafy district, great for evening returns.",
  },
  { id: "3", name: "Karlín", cars: 35, x: 64, y: 36, desc: "River-side hub, charging every 200m." },
  { id: "4", name: "Smíchov", cars: 31, x: 36, y: 62, desc: "Riverbank, fast access to D5." },
  {
    id: "5",
    name: "Letná",
    cars: 22,
    x: 46,
    y: 28,
    desc: "Park & city view — perfect weekend pickups.",
  },
  { id: "6", name: "Vyšehrad", cars: 18, x: 54, y: 74, desc: "Quiet residential, easy parking." },
];

const TESTI = [
  {
    name: "Tereza H.",
    role: "Designer · Vinohrady",
    text: "Replaced my old Škoda. Cheaper, always within 3 minutes' walk.",
  },
  {
    name: "Marek D.",
    role: "Founder · Karlín",
    text: "Took an i4 to Český Krumlov. Cap kicked in — paid less than the train.",
  },
  {
    name: "Anežka K.",
    role: "Photographer · Letná",
    text: "Cars are spotless. The X1 has a real trunk.",
  },
];

const FAQ = [
  {
    q: "Where can I park?",
    a: "Anywhere inside Prague's inner ring on legal public parking. We cover residential zones.",
  },
  {
    q: "What if charge runs low?",
    a: "Use the fuel card in the glovebox. We credit 5 free minutes per refuel.",
  },
  {
    q: "Do I need a Czech license?",
    a: "Any EU/EEA license works. Non-EU requires an IDP. Minimum age 21.",
  },
  {
    q: "What about accidents?",
    a: "Comprehensive insurance, 5,000 Kč deductible. Call us 24/7 in-app.",
  },
];

/* ---------- main ---------- */

// 10 scenes — adjust container height accordingly
const SCENES = 10;

const clampScrollProgress = (value: number) => Math.min(1, Math.max(0, value));

const toScrollRange = (values: number[]) => values.map(clampScrollProgress);

const MOBILE_MEDIA_QUERY = "(max-width: 767px)";

const subscribeToMobileMedia = (notify: () => void) => {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia(MOBILE_MEDIA_QUERY);
  mq.addEventListener("change", notify);
  return () => mq.removeEventListener("change", notify);
};

const getIsMobileSnapshot = () => {
  if (typeof window === "undefined") return false;
  return window.matchMedia(MOBILE_MEDIA_QUERY).matches;
};

const useIsMobile = () =>
  useSyncExternalStore(subscribeToMobileMedia, getIsMobileSnapshot, () => false);

export function ScrollExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTime = useRef(0);
  const rafId = useRef<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const video = videoRef.current;
    if (!video || !video.duration || isNaN(video.duration)) return;
    targetTime.current = Math.max(0, Math.min(v * video.duration, video.duration - 0.01));
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const primeForScrubbing = () => {
      const playPromise = video.play();
      if (playPromise && typeof playPromise.then === "function") {
        playPromise
          .then(() => {
            video.pause();
            video.currentTime = 0;
          })
          .catch(() => {
            video.currentTime = 0;
          });
      }
    };

    if (video.readyState >= 1) {
      primeForScrubbing();
    } else {
      video.addEventListener("loadedmetadata", primeForScrubbing, { once: true });
    }

    const resumeOnTouch = () => primeForScrubbing();
    document.addEventListener("touchstart", resumeOnTouch, { once: true, passive: true });

    const tick = () => {
      if (video.duration) {
        const diff = targetTime.current - video.currentTime;
        if (reduced) {
          video.currentTime = targetTime.current;
        } else if (Math.abs(diff) > 0.005) {
          try {
            video.currentTime += diff * 0.18;
          } catch {
            /* ignore */
          }
        }
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      document.removeEventListener("touchstart", resumeOnTouch);
      video.removeEventListener("loadedmetadata", primeForScrubbing);
    };
  }, []);

  // progressive vignette darkens as we go deeper (content needs more contrast)
  const vignette = useTransform(scrollYProgress, [0, 0.2, 1], [0.55, 0.78, 0.88]);
  const scrollHintOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0]);

  // Mobile-only: pan the visible crop from the rear of the car to the front as the user scrolls,
  // turning unavoidable portrait cropping into a cinematic dolly across the car body.
  const isMobile = useIsMobile();
  const mobilePanX = useTransform(scrollYProgress, [0, 0.35], [88, 18]);
  const mobileObjectPosition = useMotionTemplate`${mobilePanX}% center`;

  return (
    <section ref={containerRef} className="relative" style={{ height: `${SCENES * 100}vh` }}>
      <div className="sticky top-0 h-svh w-full overflow-hidden bg-background">
        <motion.video
          ref={videoRef}
          src="/videos/hero.mp4"
          poster="/frames/f_0.3.jpg"
          muted
          autoPlay
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          {...({ "webkit-playsinline": "true", "x5-playsinline": "true" } as any)}
          style={isMobile ? { objectPosition: mobileObjectPosition } : undefined}
          className="absolute inset-0 h-full w-full object-cover md:object-center"
        />

        {/* progressive dark vignette */}
        <motion.div
          style={{ opacity: vignette }}
          className="absolute inset-0 pointer-events-none bg-gradient-to-b from-background/60 via-background/40 to-background"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/60 via-transparent to-background/30 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-25 pointer-events-none" />
        <div className="absolute inset-0 noise pointer-events-none" />

        {/* Scenes */}
        <Scene index={0} progress={scrollYProgress}>
          <HeroScene />
        </Scene>
        <Scene index={1} progress={scrollYProgress}>
          <PillarScene
            eyebrow="Instant access"
            title={
              <>
                Tap. Walk in.
                <br />
                <em className="italic text-primary">Just drive.</em>
              </>
            }
            sub="Your phone is the key. Engine starts in under three seconds — no counters, no paperwork."
          />
        </Scene>
        <Scene index={2} progress={scrollYProgress}>
          <FleetScene />
        </Scene>
        <Scene index={3} progress={scrollYProgress}>
          <HowScene />
        </Scene>
        <Scene index={4} progress={scrollYProgress}>
          <ZonesScene />
        </Scene>
        <Scene index={5} progress={scrollYProgress}>
          <PricingScene />
        </Scene>
        <Scene index={6} progress={scrollYProgress}>
          <TestiScene />
        </Scene>
        <Scene index={7} progress={scrollYProgress}>
          <FaqScene />
        </Scene>
        <Scene index={8} progress={scrollYProgress}>
          <CtaScene />
        </Scene>
        <Scene index={9} progress={scrollYProgress} hold>
          <ClosingScene />
        </Scene>

        {/* scroll hint */}
        <motion.div
          style={{ opacity: scrollHintOpacity }}
          className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2 text-foreground/60 text-[9px] sm:text-[10px] tracking-[0.4em] uppercase pointer-events-none"
        >
          Scroll
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </motion.div>

        {/* progress dots */}
        <SceneProgress progress={scrollYProgress} />
      </div>
    </section>
  );
}

/* ---------- scene wrapper ---------- */

function Scene({
  index,
  progress,
  children,
  hold,
}: {
  index: number;
  progress: MotionValue<number>;
  children: ReactNode;
  hold?: boolean;
}) {
  const slot = 1 / SCENES;
  const s = index * slot;
  const e = hold ? 1 : (index + 1) * slot;
  const fade = slot * 0.25;
  const opacity = useTransform(
    progress,
    toScrollRange([s - fade, s + fade * 0.6, e - fade * 0.6, e + fade]),
    [0, 1, 1, hold ? 1 : 0],
  );
  const y = useTransform(progress, toScrollRange([s - fade, s + fade, e - fade, e + fade]), [
    30,
    0,
    0,
    hold ? 0 : -30,
  ]);

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

function SceneProgress({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="absolute right-2.5 sm:right-5 md:right-8 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-2.5 z-20">
      {Array.from({ length: SCENES }).map((_, i) => (
        <Dot key={i} index={i} progress={progress} />
      ))}
    </div>
  );
}

function Dot({ index, progress }: { index: number; progress: MotionValue<number> }) {
  const slot = 1 / SCENES;
  const active = useTransform(
    progress,
    toScrollRange([index * slot - 0.02, index * slot + slot * 0.5, (index + 1) * slot + 0.02]),
    [0, 1, 0],
  );
  const scale = useTransform(active, [0, 1], [1, 1.4]);
  const bg = useTransform(active, [0, 1], ["rgba(255,255,255,0.25)", "rgb(250,204,21)"]);
  return <motion.div style={{ scale, backgroundColor: bg }} className="w-1.5 h-1.5 rounded-full" />;
}

/* ---------- scenes ---------- */

function SceneShell({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto flex h-full w-full max-w-7xl items-center pl-5 pr-8 pt-[max(4.5rem,env(safe-area-inset-top))] pb-[max(3rem,env(safe-area-inset-bottom))] sm:px-6 sm:pr-10 md:px-10 md:py-0">
      {children}
    </div>
  );
}

function HeroScene() {
  return (
    <SceneShell>
      <div className="max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] uppercase tracking-[0.3em] text-foreground/85 mb-4 sm:mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          Car-sharing · Praha
        </div>
        <h1 className="font-display text-[clamp(2.4rem,7vw,6.5rem)] leading-[0.95] font-medium">
          Drive Prague,
          <br />
          <em className="italic text-primary">effortlessly.</em>
        </h1>
        <p className="mt-4 sm:mt-6 text-[15px] sm:text-base md:text-xl text-foreground/80 max-w-xl leading-relaxed">
          Unlock any BMW from your phone. Park anywhere inside the ring. Pay by the minute.
        </p>
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2.5 sm:gap-3">
          <button className="h-11 sm:h-12 px-6 sm:px-7 rounded-full bg-primary text-primary-foreground text-sm sm:text-base font-medium shadow-elegant hover:opacity-90 transition">
            Start driving
          </button>
          <button className="h-11 sm:h-12 px-6 sm:px-7 rounded-full glass text-sm sm:text-base text-foreground/90 hover:bg-white/10 transition">
            See pricing
          </button>
        </div>
      </div>
    </SceneShell>
  );
}

function PillarScene({ eyebrow, title, sub }: { eyebrow: string; title: ReactNode; sub: string }) {
  return (
    <SceneShell>
      <div className="max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass text-[10px] uppercase tracking-[0.3em] text-foreground/85 mb-4 sm:mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          {eyebrow}
        </div>
        <h2 className="font-display text-[clamp(2.2rem,6vw,5.5rem)] leading-[0.95] font-medium">
          {title}
        </h2>
        <p className="mt-4 sm:mt-6 text-[15px] sm:text-base md:text-xl text-foreground/80 max-w-xl leading-relaxed">
          {sub}
        </p>
      </div>
    </SceneShell>
  );
}

function FleetScene() {
  return (
    <SceneShell>
      <div id="fleet" className="w-full scroll-mt-24">
        <Eyebrow text="Fleet" />
        <h2 className="font-display text-[clamp(1.75rem,4.5vw,3.75rem)] leading-[1.02] mb-5 sm:mb-6 md:mb-10 max-w-2xl">
          Three machines. <em className="italic text-foreground/70">One promise.</em>
        </h2>
        <div className="-mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          <div className="flex gap-3.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] md:grid md:grid-cols-3 md:gap-5 md:overflow-visible md:pb-0 [&::-webkit-scrollbar]:hidden snap-x snap-mandatory md:snap-none">
            {FLEET_CARS.map((car, index) => (
              <FleetCard key={car.name} car={car} priority={index === 0} compact />
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function HowScene() {
  return (
    <SceneShell>
      <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center w-full">
        <div>
          <Eyebrow text="How it works" />
          <h2 className="font-display text-[clamp(1.85rem,4.5vw,4rem)] leading-[1] mb-5 sm:mb-8">
            Three taps.
            <br />
            <em className="italic text-foreground/70">You're driving.</em>
          </h2>
          <div className="flex flex-col gap-3.5 sm:gap-5">
            {HOW.map((s) => (
              <div key={s.n} className="flex gap-3 sm:gap-4">
                <div className="font-display text-xl sm:text-2xl text-primary w-8 sm:w-10 shrink-0">
                  {s.n}
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-display mb-0.5 sm:mb-1">{s.title}</h3>
                  <p className="text-foreground/70 leading-relaxed text-[13px] sm:text-sm max-w-md">
                    {s.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="hidden md:flex justify-center">
          <PhoneMock
            src="/app/how-screen.jpg?v=6"
            alt="Nearby cars on the Praha Drive map"
            objectPosition="center 36%"
            card={
              <div className="rounded-2xl border border-white/15 bg-white/10 p-2.5 backdrop-blur-xl">
                <div className="mb-1 text-[9px] uppercase tracking-[0.18em] text-primary">
                  Nearby
                </div>
                <div className="font-display text-[15px] leading-tight text-white">
                  BMW i4 · 87%
                </div>
                <div className="mt-0.5 text-[10px] text-white/70">2 min walk · Wenceslas Sq.</div>
              </div>
            }
          />
        </div>
      </div>
    </SceneShell>
  );
}

function ZonesScene() {
  const [active, setActive] = useState(PINS[0]);
  return (
    <SceneShell>
      <div className="grid md:grid-cols-[1fr_0.9fr] gap-5 md:gap-8 items-center w-full">
        <div>
          <Eyebrow text="Zones" />
          <h2 className="font-display text-[clamp(1.85rem,4.5vw,4rem)] leading-[1] mb-4 md:mb-6">
            All of Prague.
            <br />
            <em className="italic text-foreground/70">Free-floating.</em>
          </h2>
          <div className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-2xl glass md:aspect-square md:mx-0">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid slice"
              className="absolute inset-0 h-full w-full"
            >
              <defs>
                <radialGradient id="rg" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="oklch(0.86 0.17 90)" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="oklch(0.86 0.17 90)" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100" height="100" fill="url(#rg)" />
              <path
                d="M 40 5 Q 45 25 35 40 Q 25 55 40 70 Q 50 80 45 100"
                stroke="oklch(0.86 0.17 90 / 0.35)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
              />
              <circle
                cx="50"
                cy="50"
                r="38"
                stroke="oklch(1 0 0 / 0.1)"
                strokeDasharray="1 2"
                fill="none"
              />
              {PINS.map((p) => (
                <g key={p.id} onClick={() => setActive(p)} className="cursor-pointer">
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={active.id === p.id ? 2.6 : 1.6}
                    fill="oklch(0.86 0.17 90)"
                  />
                  {active.id === p.id && (
                    <circle cx={p.x} cy={p.y} r="5" fill="none" stroke="oklch(0.86 0.17 90 / 0.5)">
                      <animate
                        attributeName="r"
                        from="2.6"
                        to="6"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        from="1"
                        to="0"
                        dur="1.8s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  )}
                </g>
              ))}
            </svg>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 md:hidden">
              <div className="min-w-0">
                <div className="text-[9px] uppercase tracking-[0.22em] text-primary/90">
                  Selected
                </div>
                <div className="truncate font-display text-lg leading-tight text-white">
                  {active.name}
                </div>
              </div>
              <div className="shrink-0 rounded-full bg-primary/95 px-2.5 py-1 text-[11px] font-semibold text-primary-foreground tabular-nums">
                {active.cars} cars
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory sm:mx-0 sm:px-0 md:grid md:grid-cols-2 md:gap-2 md:overflow-visible md:snap-none">
            {PINS.map((p) => (
              <button
                key={p.id}
                onClick={() => setActive(p)}
                className={`shrink-0 snap-start basis-[42%] sm:basis-[30%] text-left p-2.5 md:p-3 rounded-xl border transition md:basis-auto md:shrink ${
                  active.id === p.id
                    ? "bg-primary text-primary-foreground border-primary shadow-[0_8px_24px_-12px_var(--color-primary)]"
                    : "glass hover:bg-white/10 border-transparent"
                }`}
              >
                <div className="text-[11px] sm:text-xs font-medium truncate">{p.name}</div>
                <div className="text-[10px] opacity-70 mt-0.5">{p.cars} cars</div>
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="hidden md:block p-5 rounded-2xl glass"
            >
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary mb-1">
                Selected
              </div>
              <h3 className="font-display text-2xl mb-1">{active.name}</h3>
              <p className="text-foreground/70 text-xs leading-relaxed">{active.desc}</p>
              <div className="mt-3 text-xs">
                <span className="text-primary font-medium">{active.cars}</span>
                <span className="text-foreground/60"> cars available now</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </SceneShell>
  );
}

function PricingScene() {
  const MIN = 5,
    MAX = 24 * 60,
    RATE = 7,
    HOUR_CAP = 240,
    DAY_CAP = 1490;
  const [m, setM] = useState(60);
  const price = useMemo(() => {
    const hours = Math.ceil(m / 60);
    const perHour = Math.min(m * RATE, hours * HOUR_CAP);
    const days = Math.ceil(m / (60 * 24));
    return Math.min(perHour, days * DAY_CAP);
  }, [m]);
  const fmt = (mm: number) => {
    if (mm < 60) return `${mm} min`;
    const h = Math.floor(mm / 60),
      r = mm % 60;
    if (h < 24) return `${h}h ${r ? r + "m" : ""}`.trim();
    const d = Math.floor(h / 24),
      rh = h % 24;
    return `${d}d ${rh ? rh + "h" : ""}`.trim();
  };
  return (
    <SceneShell>
      <div className="max-w-3xl mx-auto w-full text-center">
        <Eyebrow text="Pricing" center />
        <h2 className="font-display text-[clamp(1.85rem,4.5vw,4rem)] leading-[1] mb-5 sm:mb-10">
          Pay by the minute.
          <br />
          <em className="italic text-foreground/70">Cap by the day.</em>
        </h2>
        <div className="rounded-2xl sm:rounded-3xl glass p-4 sm:p-6 md:p-10 shadow-elegant text-left">
          <div className="flex flex-row items-end justify-between gap-4 mb-5 sm:mb-8 md:flex-row">
            <div className="min-w-0">
              <div className="text-foreground/60 text-[10px] uppercase tracking-wider mb-1">
                Trip length
              </div>
              <div className="font-display text-[clamp(1.6rem,7vw,3rem)] md:text-5xl leading-none">
                {fmt(m)}
              </div>
            </div>
            <div className="text-right min-w-0">
              <div className="text-foreground/60 text-[10px] uppercase tracking-wider mb-1">
                You pay
              </div>
              <div className="font-display text-[clamp(1.6rem,7vw,3rem)] md:text-5xl text-primary tabular-nums leading-none">
                {price.toLocaleString("cs-CZ")}{" "}
                <span className="text-base sm:text-xl text-foreground/70">Kč</span>
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
          <div className="flex justify-between text-[10px] text-foreground/50 mt-2 uppercase tracking-wider">
            <span>5 min</span>
            <span>1 h</span>
            <span>1 day</span>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6 text-center">
            <PriceCell label="Per minute" value={`${RATE} Kč`} />
            <PriceCell label="Hour cap" value={`${HOUR_CAP} Kč`} />
            <PriceCell label="Day cap" value={`${DAY_CAP} Kč`} />
          </div>
        </div>
      </div>
    </SceneShell>
  );
}
function PriceCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2.5 sm:py-3 rounded-xl border border-border">
      <div className="text-[9px] sm:text-[10px] uppercase tracking-wider text-foreground/50 mb-0.5">
        {label}
      </div>
      <div className="font-display text-base sm:text-lg">{value}</div>
    </div>
  );
}

function TestiScene() {
  return (
    <SceneShell>
      <div className="w-full">
        <Eyebrow text="Loved by Praguers" />
        <h2 className="font-display text-[clamp(1.85rem,4.5vw,4rem)] leading-[1] mb-5 sm:mb-10 max-w-2xl">
          <em className="italic">4.9</em> on the App Store.
          <br />
          Across 12,000 reviews.
        </h2>
        <div className="-mx-5 px-5 sm:-mx-6 sm:px-6 md:mx-0 md:px-0">
          <div className="flex gap-3.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:pb-0 md:snap-none">
            {TESTI.map((t) => (
              <div
                key={t.name}
                className="flex flex-col snap-center shrink-0 w-[min(82vw,22rem)] md:w-auto md:shrink p-5 sm:p-6 rounded-2xl glass shadow-elegant"
              >
                <div className="flex gap-1 mb-2.5 sm:mb-3 text-primary">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-primary" />
                  ))}
                </div>
                <p className="text-foreground/85 leading-relaxed mb-3.5 sm:mb-4 font-display text-base sm:text-lg italic">
                  "{t.text}"
                </p>
                <div className="mt-auto text-xs">
                  <div className="font-medium">{t.name}</div>
                  <div className="text-foreground/55">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SceneShell>
  );
}

function FaqScene() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <SceneShell>
      <div className="max-w-3xl mx-auto w-full">
        <Eyebrow text="Questions" center />
        <h2 className="font-display text-[clamp(1.85rem,4.5vw,4rem)] text-center leading-[1] mb-5 sm:mb-10">
          Good to <em className="italic">know.</em>
        </h2>
        <div className="flex flex-col gap-2">
          {FAQ.map((item, i) => (
            <div key={i} className="rounded-xl glass overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-3.5 sm:p-5 text-left"
              >
                <span className="font-display text-base sm:text-lg pr-3 sm:pr-4">{item.q}</span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0"
                >
                  <Plus className="w-4 h-4 text-primary" />
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                  >
                    <p className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 text-foreground/70 leading-relaxed text-[13px] sm:text-sm">
                      {item.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </SceneShell>
  );
}

function CtaScene() {
  return (
    <SceneShell>
      <div className="grid w-full items-center gap-6 rounded-2xl sm:rounded-3xl border border-white/10 bg-background/92 p-5 sm:p-6 shadow-elegant backdrop-blur-xl md:grid-cols-2 md:gap-10 md:p-10">
        <div>
          <Eyebrow text="Get the app" />
          <h2 className="font-display text-[clamp(1.85rem,4.5vw,4rem)] leading-[1] mb-3 sm:mb-5">
            Your first ride is <em className="italic text-primary">free.</em>
          </h2>
          <p className="text-foreground/75 text-[15px] sm:text-base max-w-md mb-5 sm:mb-6 leading-relaxed">
            Download, verify your license in 90 seconds, and we'll drop 200 Kč onto your account.
          </p>
          <div className="flex flex-wrap gap-2.5 sm:gap-3">
            <button className="h-11 sm:h-12 px-4 sm:px-5 rounded-2xl bg-foreground text-background flex items-center gap-2 sm:gap-2.5 hover:opacity-90 transition shadow-elegant">
              <Apple className="w-4 h-4 sm:w-5 sm:h-5" />
              <div className="text-left leading-tight">
                <div className="text-[9px] uppercase tracking-wider opacity-70">Download on</div>
                <div className="font-medium text-[13px] sm:text-sm">App Store</div>
              </div>
            </button>
            <button className="flex h-11 sm:h-12 items-center gap-2 sm:gap-2.5 rounded-2xl border border-white/10 bg-white/5 px-4 sm:px-5 transition hover:bg-white/10 outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
              <Smartphone className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              <div className="text-left leading-tight">
                <div className="text-[9px] uppercase tracking-wider opacity-70">Get it on</div>
                <div className="font-medium text-[13px] sm:text-sm">Google Play</div>
              </div>
            </button>
          </div>
        </div>
        <div className="hidden md:flex justify-end">
          <PhoneMock
            src="/app/cta-screen.jpg?v=6"
            alt="Reserved BMW i4 in the Praha Drive app"
            objectPosition="center 40%"
            card={
              <div className="rounded-2xl border border-white/15 bg-white/10 p-2.5 backdrop-blur-xl">
                <div className="mb-0.5 text-[9px] uppercase tracking-[0.18em] text-primary">
                  Reserved
                </div>
                <div className="font-display text-[15px] leading-tight text-white">
                  BMW i4 · 87%
                </div>
                <button className="mt-2 h-8 w-full rounded-full bg-primary text-xs font-medium text-primary-foreground transition hover:opacity-90">
                  Unlock
                </button>
              </div>
            }
          />
        </div>
      </div>
    </SceneShell>
  );
}

function ClosingScene() {
  return (
    <SceneShell>
      <div className="w-full text-center">
        <Eyebrow text="Praha Drive" center />
        <h2 className="font-display text-[clamp(2.5rem,8vw,8rem)] leading-[0.9] mb-4 sm:mb-6">
          See you on the
          <br />
          <em className="italic text-primary">street.</em>
        </h2>
        <p className="text-foreground/70 text-[15px] sm:text-base max-w-md mx-auto px-2">
          Free-floating. Premium fleet. By the minute. Only in Praha.
        </p>
      </div>
    </SceneShell>
  );
}

function Eyebrow({ text, center }: { text: string; center?: boolean }) {
  return (
    <div
      className={`text-[10px] uppercase tracking-[0.3em] text-primary mb-3 ${center ? "text-center" : ""}`}
    >
      {text}
    </div>
  );
}
