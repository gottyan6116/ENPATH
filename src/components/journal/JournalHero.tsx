"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { fallbackSlides, heroImages } from "@/content/journalHero";
import { FeaturedStory, type HeroSlide } from "./FeaturedStory";
import s from "./journalHero.module.css";

export type { HeroSlide };

type Props = {
  slides: HeroSlide[];
  compact?: boolean;
  preview?: boolean;
  /** Category pages replace the main headline. */
  heading?: { label: string; title: string; description: string };
};

const AUTOPLAY_MS = 10000;
const pad = (n: number) => String(n).padStart(2, "0");
const quiet = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function JournalHero({ slides, compact = false, preview = false, heading }: Props) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  const gsapRef = useRef<typeof import("gsap").gsap | null>(null);
  const swipe = useRef<number | null>(null);

  // Real articles come first; remaining slots (up to 3) use the unlinked design placeholders,
  // so the carousel keeps working while only a few articles are published.
  // Slide 1 always keeps the brand cover photo; later slides use their own cover.
  const count = Math.max(slides.length, fallbackSlides.length);
  const images = Array.from({ length: count }, (_, i) =>
    i === 0
      ? heroImages.main
      : slides[i]
        ? slides[i].coverImage
        : fallbackSlides[i % fallbackSlides.length].image,
  );
  const many = count > 1 && !compact;

  // Auto-advance every 10s. Pauses on hover/focus, when off-screen, with reduced motion, or when the user pauses it.
  const [hover, setHover] = useState(false);
  const [focusIn, setFocusIn] = useState(false);
  const [onScreen, setOnScreen] = useState(true);
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setCalm(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    const el = root.current;
    const io = el
      ? new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.35 })
      : null;
    if (el && io) io.observe(el);
    return () => {
      mq.removeEventListener("change", sync);
      io?.disconnect();
    };
  }, []);
  const playing = many && !calm && !hover && !focusIn && onScreen;

  const go = useCallback(
    (to: number) => {
      const el = root.current;
      if (!el || count < 2) return;
      const next = (to + count) % count;
      if (next === activeRef.current) return;
      activeRef.current = next;
      setActive(next);
      const q = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel));
      const imgs = q("[data-slide]");
      const stories = q("[data-story]");
      const decos = q("[data-deco]");
      const gsap = gsapRef.current;
      if (!gsap) {
        imgs.forEach((n, i) => (n.style.opacity = i === next ? "1" : "0"));
        stories.forEach((n, i) => (n.style.visibility = i === next ? "visible" : "hidden"));
        decos.forEach((n) => (n.style.opacity = next === 0 ? "1" : "0"));
        return;
      }
      const t = quiet() ? 0 : 1;
      imgs.forEach((n, i) => {
        if (i === next)
          gsap.fromTo(n, { opacity: Number(gsap.getProperty(n, "opacity")) || 0, scale: 1.05 }, { opacity: 1, scale: 1, duration: 0.9 * t, ease: "power2.out", overwrite: true });
        else gsap.to(n, { opacity: 0, duration: 0.7 * t, ease: "power2.out", overwrite: true });
      });
      gsap.to(decos, { opacity: next === 0 ? 1 : 0, duration: 0.6 * t, overwrite: true });
      stories.forEach((n, i) => {
        // Kill any in-flight exit tween first, otherwise its onComplete can hide the story we are showing.
        gsap.killTweensOf(n);
        if (i === next) {
          gsap.set(n, { visibility: "visible", opacity: 1 });
          gsap.fromTo(
            n.querySelectorAll("[data-in]"),
            { y: 24, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.7 * t, ease: "power2.out", stagger: 0.08 * t, delay: 0.1 * t, overwrite: true },
          );
        } else {
          gsap.to(n, {
            opacity: 0,
            duration: 0.25 * t,
            onComplete: () => {
              if (activeRef.current !== i) gsap.set(n, { visibility: "hidden" });
            },
          });
        }
      });
    },
    [count],
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
        const one = (sel: string) => el.querySelector<HTMLElement>(sel);
        const mm = gsap.matchMedia();

        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const photo = one("[data-photo]");
          const zoom = one("[data-zoom]");
          const lines = el.querySelectorAll("[data-line]");
          const rest = el.querySelectorAll("[data-fade]");
          const ui = el.querySelectorAll("[data-ui]");
          gsap.set(photo, { opacity: 0 });
          gsap.set(zoom, { scale: 1.06 });
          gsap.set(lines, { yPercent: 110 });
          gsap.set([one("[data-label]"), ...Array.from(rest), ...Array.from(ui)], { opacity: 0, y: 14 });
          el.dataset.ready = "true";
          gsap
            .timeline({ defaults: { ease: "power2.out" } })
            .to(photo, { opacity: 1, duration: 0.8 }, 0)
            .to(zoom, { scale: 1, duration: 1.3 }, 0)
            .to(one("[data-label]"), { opacity: 1, y: 0, duration: 0.5 }, 0.25)
            .to(lines, { yPercent: 0, duration: 0.75, stagger: 0.12 }, 0.4)
            .to(rest, { opacity: 1, y: 0, duration: 0.55 }, 0.8)
            .to(ui, { opacity: 1, y: 0, duration: 0.5, stagger: 0.06 }, 1.0);
        });

        // Scroll: the hero shrinks into a rounded frame, its photo drifts slightly.
        mm.add("(prefers-reduced-motion: no-preference) and (min-width: 901px)", () => {
          const frame = one("[data-frame]");
          const par = one("[data-par]");
          const copy = one("[data-copy]");
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
          });
          tl.to(frame, { scale: 0.9, borderRadius: 28, transformOrigin: "50% 0%", ease: "none" }, 0)
            .to(par, { yPercent: 6, ease: "none" }, 0)
            .to(copy, { opacity: 0.1, y: -30, ease: "none" }, 0);
        });
        mm.add("(prefers-reduced-motion: no-preference) and (max-width: 900px)", () => {
          gsap.to(one("[data-par]"), {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
          });
        });

        // Subtle pointer parallax (fine pointers only).
        mm.add("(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)", () => {
          const zoom = one("[data-zoom]");
          if (!zoom) return;
          const qx = gsap.quickTo(zoom, "x", { duration: 0.9, ease: "power3.out" });
          const qy = gsap.quickTo(zoom, "y", { duration: 0.9, ease: "power3.out" });
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            qx(((e.clientX - r.left) / r.width - 0.5) * -14);
            qy(((e.clientY - r.top) / r.height - 0.5) * -10);
          };
          el.addEventListener("pointermove", move, { passive: true });
          return () => el.removeEventListener("pointermove", move);
        });
        cleanup = () => mm.revert();
        el.dataset.ready = "true";
      },
    );
    return () => {
      disposed = true;
      window.clearTimeout(failsafe);
      cleanup();
      gsapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!playing) return;
    const id = window.setTimeout(() => {
      if (!document.hidden) go(activeRef.current + 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [playing, active, go]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!many) return;
    if (e.key === "ArrowRight") go(activeRef.current + 1);
    if (e.key === "ArrowLeft") go(activeRef.current - 1);
  };

  return (
    <section
      ref={root}
      className={`${s.hero} ${compact ? s.compact : ""}`}
      data-ready="false"
      data-playing={playing ? "true" : "false"}
      aria-roledescription={many ? "carousel" : undefined}
      aria-label="ENPATH JOURNAL 特集"
      onKeyDown={onKeyDown}
      onPointerEnter={(e) => e.pointerType === "mouse" && setHover(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setHover(false)}
      onFocusCapture={() => setFocusIn(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocusIn(false);
      }}
    >
      <div
        className={s.frame}
        data-frame
        onPointerDown={(e) => {
          const onControl = (e.target as Element).closest("a, button");
          if (many && e.pointerType !== "mouse" && !onControl) swipe.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (swipe.current == null) return;
          const dx = e.clientX - swipe.current;
          swipe.current = null;
          if (Math.abs(dx) > 48) go(activeRef.current + (dx < 0 ? 1 : -1));
        }}
        onPointerCancel={() => (swipe.current = null)}
      >
        <div className={s.photo} data-photo>
          <div className={s.par} data-par>
            <div className={s.zoom} data-zoom>
              {images.map((src, i) => (
                <div
                  key={src + i}
                  className={s.slide}
                  data-slide
                  style={i === 0 ? undefined : { opacity: 0 }}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    priority={i === 0}
                    sizes="100vw"
                    quality={78}
                    className={s.img}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className={s.shade} aria-hidden="true" />
          {!compact && (
            <div className={s.decos} aria-hidden="true">
              <Image
                data-deco
                className={s.curve}
                src={heroImages.curve}
                alt=""
                width={1600}
                height={478}
                sizes="40vw"
              />
              <Image
                data-deco
                className={s.hand}
                src={heroImages.handwriting}
                alt=""
                width={1400}
                height={816}
                sizes="30vw"
              />
            </div>
          )}
        </div>

        <div className={s.inner}>
          <div className={s.copy} data-copy>
            <p className={s.label} data-label>
              {heading ? heading.label : "READ. THINK. FIND YOUR PATH."}
            </p>
            <h1 className={s.title}>
              <span className={s.mask}>
                <span data-line>{heading ? heading.title : "英語と、"}</span>
              </span>
              {!heading && (
                <span className={s.mask}>
                  <span data-line>学びの話。</span>
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
            <div className={s.bottom}>
              <div className={s.featured} data-fade>
                <FeaturedStory slides={slides} active={active} preview={preview} />
              </div>
            </div>
          )}
        </div>
      </div>
      <span className="sr-only">{many ? `${active + 1} / ${count}` : ""}</span>
    </section>
  );
}
