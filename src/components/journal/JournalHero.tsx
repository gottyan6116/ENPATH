"use client";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { track } from "@/lib/analytics";
import s from "./journalHero.module.css";

export type HeroSlide = {
  slug: string;
  href: string;
  title: string;
  category: string;
  categoryLabel: string;
  description: string;
  coverImage: string;
};

type Props = {
  slides: HeroSlide[];
  fallbackImage: string;
  compact?: boolean;
  preview?: boolean;
  /** Category pages replace the main headline. */
  heading?: { label: string; title: string; description: string };
};

const pad = (n: number) => String(n).padStart(2, "0");

export function JournalHero({
  slides,
  fallbackImage,
  compact = false,
  preview = false,
  heading,
}: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const gsapRef = useRef<typeof import("gsap").gsap | null>(null);
  const swipe = useRef<number | null>(null);
  const images = slides.length ? slides.map((x) => x.coverImage) : [fallbackImage];
  const many = slides.length > 1 && !compact;

  const go = useCallback(
    (to: number) => {
      const el = root.current;
      const count = slides.length;
      if (!el || count < 2) return;
      const next = (to + count) % count;
      const prev = activeRef.current;
      if (next === prev) return;
      activeRef.current = next;
      setActive(next);
      const gsap = gsapRef.current;
      const q = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel));
      const imgs = q("[data-slide]");
      const stories = q("[data-story]");
      if (!gsap) {
        imgs.forEach((n, i) => (n.style.opacity = i === next ? "1" : "0"));
        stories.forEach((n, i) => (n.style.visibility = i === next ? "visible" : "hidden"));
        return;
      }
      const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      imgs.forEach((n, i) => {
        if (i === next) {
          gsap.fromTo(
            n,
            { opacity: n.style.opacity ? Number(n.style.opacity) : 0, scale: 1.07 },
            { opacity: 1, scale: 1, duration: still ? 0 : 1.2, ease: "power2.out", overwrite: true },
          );
        } else {
          gsap.to(n, { opacity: 0, duration: still ? 0 : 0.9, ease: "power1.inOut", overwrite: true });
        }
      });
      stories.forEach((n, i) => {
        if (i === next) {
          gsap.set(n, { visibility: "visible" });
          gsap.fromTo(
            n.querySelectorAll("[data-in]"),
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: still ? 0 : 0.7, ease: "power3.out", stagger: still ? 0 : 0.08, delay: still ? 0 : 0.15, overwrite: true },
          );
        } else {
          gsap.to(n, { opacity: 0, duration: still ? 0 : 0.2, overwrite: true, onComplete: () => { gsap.set(n, { visibility: "hidden", opacity: 1 }); } });
        }
      });
    },
    [slides.length],
  );

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let disposed = false;
    let cleanup = () => {};
    const failsafe = window.setTimeout(() => {
      el.dataset.ready = "true";
    }, 2500);
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        gsapRef.current = gsap;
        const mm = gsap.matchMedia();
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const photo = el.querySelector<HTMLElement>("[data-photo]");
          const zoom = el.querySelector<HTMLElement>("[data-zoom]");
          const copy = el.querySelector<HTMLElement>("[data-copy]");
          const lines = el.querySelectorAll("[data-line]");
          const fades = el.querySelectorAll("[data-fade]");
          gsap.set(photo, { clipPath: "inset(6% 0% 6% 100%)" });
          gsap.set(zoom, { scale: 1.08 });
          gsap.set(lines, { yPercent: 110 });
          gsap.set(fades, { opacity: 0, y: 14 });
          el.dataset.ready = "true";
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(photo, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.15, ease: "power4.inOut" }, 0)
            .to(zoom, { scale: 1, duration: 1.6 }, 0)
            .to(el.querySelector("[data-label]"), { opacity: 1, y: 0, duration: 0.6 }, 0.25)
            .to(lines, { yPercent: 0, duration: 0.9, stagger: 0.12 }, 0.35)
            .to(Array.from(fades).filter((n) => !(n as HTMLElement).hasAttribute("data-label")), { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 }, 0.8);

          const trigger = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
          });
          trigger
            .to(photo, { scale: 0.9, borderRadius: 28, transformOrigin: "100% 50%", ease: "none" }, 0)
            .to(copy, { y: -48, opacity: 0.15, ease: "none" }, 0);

          let move: ((e: PointerEvent) => void) | null = null;
          if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && zoom) {
            const qx = gsap.quickTo(zoom, "x", { duration: 0.9, ease: "power3.out" });
            const qy = gsap.quickTo(zoom, "y", { duration: 0.9, ease: "power3.out" });
            move = (e: PointerEvent) => {
              const r = el.getBoundingClientRect();
              qx(((e.clientX - r.left) / r.width - 0.5) * -14);
              qy(((e.clientY - r.top) / r.height - 0.5) * -10);
            };
            el.addEventListener("pointermove", move, { passive: true });
          }
          return () => {
            if (move) el.removeEventListener("pointermove", move);
          };
        });
        cleanup = () => mm.revert();
        if (el.dataset.ready !== "true") el.dataset.ready = "true";
      },
    );
    return () => {
      disposed = true;
      window.clearTimeout(failsafe);
      cleanup();
      gsapRef.current = null;
    };
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!many) return;
    if (e.key === "ArrowRight") go(activeRef.current + 1);
    if (e.key === "ArrowLeft") go(activeRef.current - 1);
  };

  const current = slides[active];
  const lineTop = heading ? heading.title : "英語と、";
  const lineBottom = heading ? null : "学びの話。";

  return (
    <section
      ref={root}
      className={`${s.hero} ${compact ? s.compact : ""}`}
      data-ready="false"
      aria-roledescription={many ? "carousel" : undefined}
      aria-label="ENPATH JOURNAL 特集"
      onKeyDown={onKeyDown}
    >
      <div className={s.photo} data-photo>
        <div className={s.zoom} data-zoom>
          {images.map((src, i) => (
            <div
              key={src + i}
              className={s.slide}
              data-slide
              style={i === 0 ? undefined : { opacity: 0 }}
              onPointerDown={(e) => {
                if (many && e.pointerType !== "mouse") swipe.current = e.clientX;
              }}
              onPointerUp={(e) => {
                if (swipe.current == null) return;
                const dx = e.clientX - swipe.current;
                swipe.current = null;
                if (Math.abs(dx) > 48) go(activeRef.current + (dx < 0 ? 1 : -1));
              }}
            >
              <Image
                src={src}
                alt=""
                fill
                priority={i === 0}
                sizes="(max-width: 900px) 100vw, 72vw"
                className={s.img}
              />
            </div>
          ))}
        </div>
        <div className={s.shade} aria-hidden="true" />
      </div>

      <div className={s.inner}>
        <div className={s.copy} data-copy>
          <p className={s.label} data-label data-fade>
            {heading ? heading.label : "READ. THINK. FIND YOUR PATH."}
          </p>
          <h1 className={s.title}>
            <span className={s.mask}>
              <span data-line>{lineTop}</span>
            </span>
            {lineBottom && (
              <span className={s.mask}>
                <span data-line>{lineBottom}</span>
              </span>
            )}
          </h1>
          <p className={s.sub} data-fade>
            {heading ? (
              heading.description
            ) : (
              <>
                知ることで、学びの世界はもっと広がる。
                <br />
                英語を学ぶ理由から、毎日の学習のヒントまで。
              </>
            )}
          </p>
        </div>

        {!compact && (
          <div className={s.featured} data-fade>
            {many && (
              <div className={s.arrows}>
                <button type="button" onClick={() => go(activeRef.current - 1)} aria-label="前の特集記事">
                  <ArrowLeft size={18} aria-hidden="true" />
                </button>
                <button type="button" onClick={() => go(activeRef.current + 1)} aria-label="次の特集記事">
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            )}
            <div className={s.stories} aria-live="polite">
              {slides.length ? (
                slides.map((x, i) => (
                  <div
                    key={x.slug}
                    className={s.story}
                    data-story
                    style={i === 0 ? undefined : { visibility: "hidden" }}
                    aria-hidden={i !== active}
                  >
                    <p className={s.storyLabel} data-in>
                      FEATURED STORY / {pad(i + 1)}
                      <span>{x.categoryLabel}</span>
                    </p>
                    <h2 data-in>{x.title}</h2>
                    <p className={s.storyText} data-in>{x.description}</p>
                    <Link
                      href={x.href}
                      className={s.read}
                      tabIndex={i === active ? 0 : -1}
                      data-in
                      onClick={() => {
                        if (!preview)
                          track("journal_category_select", {
                            slug: x.slug,
                            category: x.category,
                            title: x.title,
                          });
                      }}
                    >
                      この記事を読む <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  </div>
                ))
              ) : (
                <div className={s.story}>
                  <p className={s.storyLabel}>FEATURED STORY</p>
                  <h2>最初の読みものを、準備しています。</h2>
                  <p className={s.storyText}>
                    英語との向き合い方や、日々の学びのヒントを、この場所からお届けしていきます。
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        {many && (
          <ol className={s.dots} aria-label="特集記事の選択">
            {slides.map((x, i) => (
              <li key={x.slug}>
                <button
                  type="button"
                  aria-label={`${pad(i + 1)}：${x.title}`}
                  aria-current={i === active ? "true" : undefined}
                  onClick={() => go(i)}
                >
                  {pad(i + 1)}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
      {current && <span className="sr-only">{`${active + 1} / ${slides.length}`}</span>}
    </section>
  );
}
