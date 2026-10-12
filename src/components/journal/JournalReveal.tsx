"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Reveals child cards step by step as they enter the viewport. Content stays visible without JS. */
export function JournalReveal({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const items = Array.from(el.children) as HTMLElement[];
          gsap.set(items, { opacity: 0, y: 22 });
          ScrollTrigger.batch(items, {
            start: "top 90%",
            once: true,
            onEnter: (batch) =>
              gsap.to(batch, {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
                stagger: 0.1,
                overwrite: true,
              }),
          });
        });
        cleanup = () => mm.revert();
      },
    );
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);
  return (
    <div ref={root} className={className}>
      {children}
    </div>
  );
}
