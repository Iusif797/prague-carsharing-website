import type { ReactNode } from "react";

type PhoneMockProps = {
  src: string;
  alt: string;
  objectPosition?: string;
  card: ReactNode;
};

export function PhoneMock({ src, alt, objectPosition = "center 38%", card }: PhoneMockProps) {
  return (
    <div className="relative mx-auto shrink-0 w-[clamp(112px,29vw,132px)] aspect-[9/19.5] md:w-[clamp(220px,22vw,252px)]">
      <div className="absolute inset-0 rounded-[1.85rem] bg-gradient-to-b from-white/12 to-white/4 p-px shadow-elegant md:rounded-[2.65rem]">
        <div className="h-full w-full rounded-[1.75rem] bg-[oklch(0.08_0.01_60)] p-[5px] md:rounded-[2.55rem] md:p-[7px]">
          <div className="absolute top-[7px] left-1/2 z-20 h-4 w-[34%] -translate-x-1/2 rounded-full bg-black md:top-[11px] md:h-6 md:w-[32%]" />
          <div className="relative h-full w-full overflow-hidden rounded-[1.45rem] bg-black md:rounded-[2.15rem]">
            <img
              src={src}
              alt={alt}
              className="absolute inset-0 h-full w-full scale-[1.02] object-cover"
              style={{ objectPosition }}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-[18%] bg-gradient-to-b from-black/50 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[42%] bg-gradient-to-t from-black/95 via-black/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-1.5 md:p-3">{card}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
