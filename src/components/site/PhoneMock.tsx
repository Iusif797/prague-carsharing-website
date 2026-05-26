import type { ReactNode } from "react";

type PhoneMockProps = {
  src: string;
  alt: string;
  objectPosition?: string;
  card: ReactNode;
};

export function PhoneMock({ src, alt, objectPosition = "center 38%", card }: PhoneMockProps) {
  return (
    <div className="relative mx-auto shrink-0 w-[clamp(220px,22vw,252px)] aspect-[9/19.5] rotate-0 transform-none">
      <div className="absolute inset-0 rounded-[2.65rem] bg-gradient-to-b from-white/12 to-white/4 p-px shadow-elegant">
        <div className="h-full w-full rounded-[2.55rem] bg-[oklch(0.08_0.01_60)] p-[7px]">
          <div className="absolute top-[11px] left-1/2 z-20 h-6 w-[32%] -translate-x-1/2 rounded-full bg-black" />
          <div className="relative h-full w-full overflow-hidden rounded-[2.15rem] bg-black">
            <img
              src={src}
              alt={alt}
              className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
              style={{ objectPosition }}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-black/50 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/95 via-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-3">{card}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
