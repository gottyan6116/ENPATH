"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { floating } from "@/content/textbooks";

export function FloatingTexts() {
  const stage = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    if (
      !window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)")
        .matches
    )
      return;
    let raf = 0;
    const move = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        el.style.setProperty("--px", String(((e.clientX - r.left) / r.width - 0.5) * 2));
        el.style.setProperty("--py", String(((e.clientY - r.top) / r.height - 0.5) * 2));
      });
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div ref={stage} className="float-stage" aria-hidden="true">
      {floating.map((f, i) => (
        <div
          key={f.book.id}
          className={`float-item ${f.d < 0.3 ? "float-far" : ""}`}
          style={
            {
              "--x": `${f.x}%`,
              "--y": `${f.y}%`,
              "--s": f.s,
              "--d": f.d,
              "--r": `${f.r}deg`,
              "--t": `${f.t}s`,
              "--a": f.a,
              "--o": `${f.o}s`,
              "--i": i,
            } as CSSProperties
          }
        >
          <div className="float-book">
            <Image
              src={f.book.src}
              width={f.book.w}
              height={f.book.h}
              alt=""
              sizes="160px"
              priority={i < 6}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
