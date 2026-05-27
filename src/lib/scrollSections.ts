export const SCROLL_SCENE_COUNT = 10;

export const SECTION_SCENE_INDEX: Readonly<Record<string, number>> = {
  fleet: 2,
  how: 3,
  zones: 4,
  pricing: 5,
  faq: 7,
};

export function scrollToSection(
  sectionId: string,
  behavior: ScrollBehavior = "smooth",
): boolean {
  const sceneIndex = SECTION_SCENE_INDEX[sectionId];
  if (sceneIndex === undefined) return false;

  const container = document.querySelector("[data-scroll-experience]");
  if (!(container instanceof HTMLElement)) return false;

  const slot = 1 / SCROLL_SCENE_COUNT;
  const progress = sceneIndex * slot + slot * 0.35;
  const containerTop = container.getBoundingClientRect().top + window.scrollY;
  const scrollDistance = Math.max(0, container.offsetHeight - window.innerHeight);
  const target = containerTop + progress * scrollDistance;

  window.scrollTo({ top: target, behavior });
  return true;
}

export function parseSectionHash(hash: string): string | null {
  const sectionId = hash.replace(/^#/, "");
  return sectionId in SECTION_SCENE_INDEX ? sectionId : null;
}
