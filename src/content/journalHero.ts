// Design fallback for the JOURNAL hero when no published article exists.
// These are NOT articles: they never link anywhere and are labelled as coming soon.
export const heroImages = {
  main: "/images/journal/hero/window-study.webp",
  possibility: "/images/journal/hero/window-study.webp",
  smallSteps: "/images/journal/articles/habit-notebook.webp",
  connections: "/images/journal/articles/terrace-city.webp",
  handwriting: "/images/journal/decorations/handwriting.webp",
  curve: "/images/journal/decorations/curve.webp",
} as const;

export const fallbackSlides = [
  {
    key: "possibility",
    label: "SLIDE 01 — POSSIBILITY",
    lines: ["英語を学ぶことは、", "未来を広げること。"],
    image: heroImages.possibility,
  },
  {
    key: "small-steps",
    label: "SLIDE 02 — SMALL STEPS",
    lines: ["小さな一歩が、", "大きな変化につながる。"],
    image: heroImages.smallSteps,
  },
  {
    key: "connections",
    label: "SLIDE 03 — CONNECTIONS",
    lines: ["英語でつながる、", "新しい出会いと視点。"],
    image: heroImages.connections,
  },
] as const;
