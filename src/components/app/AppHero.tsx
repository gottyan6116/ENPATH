"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { BookingLink } from "@/components/BookingLink";
import s from "./appHero.module.css";

/** Visible (alpha-trimmed) sizes of the processed images in /public/images/app. */
const media = {
  bg: { src: "/images/app/bg.webp", w: 1672, h: 941 },
  curves: { src: "/images/app/curves.webp", w: 1393, h: 875 },
  laptop: { src: "/images/app/laptop.webp", w: 1313, h: 969 },
  words: { src: "/images/app/card-words.webp", w: 995, h: 1324 },
  articles: { src: "/images/app/card-articles.webp", w: 1339, h: 969 },
  expressions: { src: "/images/app/card-expressions.webp", w: 1187, h: 1003 },
  record: { src: "/images/app/card-record.webp", w: 891, h: 1239 },
} as const;

type CardKey = "words" | "articles" | "expressions" | "record";
const cards: { key: CardKey; alt: string; depth: number; float: [number, number, number]; enter: { x: number; y: number } }[] = [
  { key: "words", alt: "Bridgeの単語学習画面：フラッシュカードで単語を確認する", depth: 1, float: [6, 4.2, 0], enter: { x: -70, y: -40 } },
  { key: "articles", alt: "Bridgeの記事画面：レベル付きの記事一覧", depth: 0.8, float: [5, 5.4, 0.6], enter: { x: 50, y: -60 } },
  { key: "expressions", alt: "Bridgeの表現学習画面：「賛成する」の英語表現", depth: 1.2, float: [7, 4.8, 1.1], enter: { x: 80, y: 20 } },
  { key: "record", alt: "Bridgeの学習記録画面：累計の学習時間と学習カレンダー", depth: 0.9, float: [5, 5.8, 0.3], enter: { x: -60, y: 60 } },
];

export function AppHero() {
  const root = useRef<HTMLElement>(null);

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
        const $ = (sel: string) => Array.from(el.querySelectorAll<HTMLElement>(sel));
        const one = (sel: string) => el.querySelector<HTMLElement>(sel);
        const mm = gsap.matchMedia();

        // ---- entrance (all viewports, motion allowed) + float ----
        mm.add("(prefers-reduced-motion: no-preference)", () => {
          const lines = $("[data-line]");
          const enters = $("[data-enter]");
          const laptop = one("[data-laptop-enter]");
          const copyFades = $("[data-cfade]");
          gsap.set(one("[data-bg]"), { opacity: 0, scale: 1.04 });
          gsap.set(copyFades, { opacity: 0, y: 14 });
          gsap.set(lines, { yPercent: 115 });
          gsap.set(laptop, { opacity: 0, y: 70, scale: 0.94 });
          gsap.set(one("[data-curves]"), { opacity: 0 });
          cards.forEach((c, i) => {
            const e = enters[i];
            const mobile = window.matchMedia("(max-width: 767px)").matches;
            gsap.set(e, { opacity: 0, x: mobile ? c.enter.x * 0.3 : c.enter.x, y: mobile ? c.enter.y * 0.4 : c.enter.y, scale: 0.94 });
          });
          gsap.set($("[data-cta]"), { opacity: 0, y: 24 });
          el.dataset.ready = "true";
          const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.to(one("[data-bg]"), { opacity: 1, scale: 1, duration: 1.1, ease: "power2.out" }, 0)
            .to(one("[data-label]"), { opacity: 1, y: 0, duration: 0.6 }, 0.15)
            .to(lines[0], { yPercent: 0, duration: 0.85 }, 0.25)
            .to(lines[1], { yPercent: 0, duration: 0.85 }, 0.4)
            .to(one("[data-sub]"), { opacity: 1, y: 0, duration: 0.7 }, 0.55)
            .to(laptop, { opacity: 1, y: 0, scale: 1, duration: 1.1 }, 0.65)
            .to(one("[data-curves]"), { opacity: 1, duration: 1.2, ease: "power2.out" }, 0.8);
          const at = [0.9, 1.05, 1.2, 1.35];
          cards.forEach((_, i) => {
            tl.to(enters[i], { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95 }, at[i]);
          });
          tl.to($("[data-cta]"), { opacity: 1, y: 0, duration: 0.7, stagger: 0.1 }, 1.4);

          // Float: starts after the entrance, every card on its own period (3-6s), 4-8px.
          const floats = $("[data-float]");
          tl.add(() => {
            cards.forEach((c, i) => {
              gsap.to(floats[i], {
                y: c.float[0] * (i % 2 ? -1 : 1),
                duration: c.float[1],
                delay: c.float[2],
                ease: "sine.inOut",
                yoyo: true,
                repeat: -1,
              });
            });
            gsap.to(one("[data-laptop-float]"), { y: -4, duration: 5.2, ease: "sine.inOut", yoyo: true, repeat: -1 });
          });
        });

        // ---- desktop-only: pointer parallax (laptop <=5px, cards 8-12px) ----
        mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1000px) and (hover: hover) and (pointer: fine)", () => {
          const targets = [
            { node: one("[data-laptop-par]"), amp: 5 },
            ...cards.map((c, i) => ({ node: $("[data-par]")[i], amp: 8 + (c.depth - 0.8) * 10 })),
          ].filter((t) => t.node);
          const setters = targets.map((t) => ({
            x: gsap.quickTo(t.node!, "x", { duration: 0.9, ease: "power3.out" }),
            y: gsap.quickTo(t.node!, "y", { duration: 0.9, ease: "power3.out" }),
            amp: t.amp,
          }));
          const move = (e: PointerEvent) => {
            const r = el.getBoundingClientRect();
            const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
            const ny = ((e.clientY - r.top) / r.height - 0.5) * 2;
            setters.forEach((q) => {
              q.x(-nx * q.amp);
              q.y(-ny * q.amp);
            });
          };
          const leave = () => setters.forEach((q) => { q.x(0); q.y(0); });
          el.addEventListener("pointermove", move, { passive: true });
          el.addEventListener("pointerleave", leave);
          return () => {
            el.removeEventListener("pointermove", move);
            el.removeEventListener("pointerleave", leave);
          };
        });

        // ---- scroll: text fades, cards spread outward, laptop drifts to centre, bg parallax ----
        mm.add("(prefers-reduced-motion: no-preference) and (min-width: 1000px)", () => {
          const tl = gsap.timeline({
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
          });
          const spread = [{ x: -48, y: -10 }, { x: 24, y: -36 }, { x: 56, y: 6 }, { x: -52, y: 30 }];
          tl.to(one("[data-copy]"), { opacity: 0, y: -50, ease: "none" }, 0)
            .to(one("[data-laptop-scroll]"), { x: -90, y: -10, ease: "none" }, 0)
            .to(one("[data-bg-wrap]"), { yPercent: 7, ease: "none" }, 0);
          $("[data-scroll]").forEach((node, i) => tl.to(node, { ...spread[i], ease: "none" }, 0));
        });
        mm.add("(prefers-reduced-motion: no-preference) and (max-width: 999px)", () => {
          gsap.to(one("[data-bg-wrap]"), {
            yPercent: 4,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: 0.6 },
          });
        });

        cleanup = () => mm.revert();
        el.dataset.ready = "true";
      },
    );
    return () => {
      disposed = true;
      window.clearTimeout(failsafe);
      cleanup();
    };
  }, []);

  return (
    <section ref={root} className={s.hero} data-ready="false" aria-labelledby="app-hero-title">
      <div className={s.bgWrap} data-bg-wrap>
        <div className={s.bg} data-bg>
          <Image src={media.bg.src} alt="" fill priority sizes="100vw" quality={80} className={s.bgImg} />
        </div>
      </div>
      <div className={s.veil} aria-hidden="true" />

      <div className={s.copy} data-copy>
        <p className={s.label} data-label data-cfade>
          <span>FOR ENPATH STUDENTS</span>
          <i aria-hidden="true">/</i>
          <span>追加料金なし</span>
        </p>
        <h1 id="app-hero-title" className={s.title}>
          <span className={s.mask}>
            <span data-line>学ぶ毎日を、</span>
          </span>
          <span className={s.mask}>
            <span data-line>もっと続けやすく。</span>
          </span>
        </h1>
        <p className={s.sub} data-sub data-cfade>
          ENPATH受講生専用アプリ「Bridge」。
          <br />
          単語、記事、表現、学習記録まで。
          <br />
          追加料金なしでご利用いただけます。
        </p>
        <div className={s.ctas}>
          <div className={s.primary} data-cta>
            <BookingLink placement="app_hero" />
          </div>
          <a className={s.secondary} href="#app-features" data-cta>
            アプリの機能を見る
            <ChevronDown size={18} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className={s.stage}>
        <div className={s.curves} data-curves aria-hidden="true">
          <Image src={media.curves.src} alt="" width={media.curves.w} height={media.curves.h} sizes="60vw" />
        </div>

        <div className={s.laptop}>
          <div data-laptop-scroll>
            <div data-laptop-par>
              <div data-laptop-enter>
                <div data-laptop-float>
                  <Image
                    src={media.laptop.src}
                    alt="Bridgeのホーム画面：今日の学習、学習の進捗、継続記録が表示されたノートパソコン"
                    width={media.laptop.w}
                    height={media.laptop.h}
                    priority
                    sizes="(max-width: 999px) 100vw, 56vw"
                    quality={85}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {cards.map((c) => (
          <div key={c.key} className={`${s.card} ${s[c.key]}`}>
            <div data-scroll>
              <div data-par>
                <div data-enter>
                  <div data-float>
                    <Image
                      src={media[c.key].src}
                      alt={c.alt}
                      width={media[c.key].w}
                      height={media[c.key].h}
                      sizes="(max-width: 767px) 40vw, 24vw"
                      quality={85}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
