"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowDown, ArrowRight } from "lucide-react";

const stops = [
  ["about", "悩みを整理する"],
  ["approach", "学び方を知る"],
  ["roadmap", "学習計画を試す"],
  ["support", "サポートを見る"],
  ["consultation", "相談する"],
] as const;

export function ScrollExperience() {
  const [current, setCurrent] = useState(-1);
  const progress = useRef<HTMLDivElement>(null);
  // Phones: the floating pill is replaced by inline links at the end of the section before each stop,
  // so nothing is ever covered. Rendered only on phones (no duplicate DOM on desktop).
  const [phone, setPhone] = useState(false);
  const [inlineHosts, setInlineHosts] = useState<(HTMLElement | null)[]>([]);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 760px)");
    const sync = () => setPhone(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  useEffect(() => {
    if (!phone) return setInlineHosts([]);
    setInlineHosts(
      stops.map(([id], i) =>
        i === 0 ? null : (document.getElementById(id)?.previousElementSibling as HTMLElement | null) ?? null,
      ),
    );
  }, [phone]);
  useEffect(() => {
    let disposed = false;
    let cleanup = () => {};
    void Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ gsap }, { ScrollTrigger }]) => {
        if (disposed) return;
        gsap.registerPlugin(ScrollTrigger);
        const context = gsap.context(() => {
          ScrollTrigger.create({
            start: 0,
            end: "max",
            onUpdate: (self) => {
              if (progress.current)
                progress.current.style.transform = `scaleX(${self.progress})`;
              let next = -1;
              stops.forEach(([id], i) => {
                const section = document.getElementById(id);
                if (
                  section &&
                  section.getBoundingClientRect().top < innerHeight * 0.65
                )
                  next = i;
              });
              setCurrent(next);
            },
          });
        });
        const media = gsap.matchMedia();
        media.add("(prefers-reduced-motion: no-preference)", () => {
          gsap.from(".hero-content > *", {
            y: 24,
            opacity: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: "power3.out",
            clearProps: "all",
          });
          gsap.utils
            .toArray<HTMLElement>(
              ".section-heading, .concerns li, .goals-grid a, .support-list > *, .process-list > *",
            )
            .forEach((element) => {
              gsap.from(element, {
                y: 32,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: element,
                  start: "top 94%",
                  once: true,
                },
                clearProps: "all",
              });
            });
          gsap.to(".hero-visual", {
            y: 55,
            ease: "none",
            scrollTrigger: {
              trigger: ".hero-stage",
              start: "top top",
              end: "bottom top",
              scrub: 0.6,
            },
          });
        });
        cleanup = () => {
          media.revert();
          context.revert();
        };
        void document.fonts.ready.then(() => {
          if (!disposed) ScrollTrigger.refresh();
        });
      },
    );
    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  const next = stops[Math.min(current + 1, stops.length - 1)];
  return (
    <>
      <div className="reading-progress" aria-hidden="true">
        <div ref={progress} />
      </div>
      <nav
        className={`journey-nav ${current >= 0 ? "is-visible" : ""}`}
        aria-label="ページの見どころ"
      >
        <span className="journey-position">
          {String(Math.max(1, current + 1)).padStart(2, "0")} <span>/ 05</span>
        </span>
        <div className="journey-dots">
          {stops.map(([id, label], i) => (
            <a
              key={id}
              href={`#${id}`}
              aria-label={label}
              aria-current={current === i ? "location" : undefined}
            >
              <span />
            </a>
          ))}
        </div>
        <a className="journey-next" href={`#${next[0]}`}>
          <span>
            {current === stops.length - 1
              ? "無料カウンセリング"
              : `次へ：${next[1]}`}
          </span>
          {current === stops.length - 1 ? (
            <ArrowRight size={16} />
          ) : (
            <ArrowDown size={16} />
          )}
        </a>
      </nav>
      {phone &&
        inlineHosts.map((host, i) =>
          host
            ? createPortal(
                <nav
                  className="journey-inline"
                  aria-label={`ページの見どころ ${String(i).padStart(2, "0")} / 05`}
                >
                  <a href={`#${stops[i][0]}`}>
                    <span className="journey-inline-pos">
                      {String(i).padStart(2, "0")} <span>/ 05</span>
                    </span>
                    <span className="journey-inline-label">次へ：{stops[i][1]}</span>
                    <ArrowDown size={16} aria-hidden="true" />
                  </a>
                </nav>,
                host,
                `journey-inline-${i}`,
              )
            : null,
        )}
    </>
  );
}
